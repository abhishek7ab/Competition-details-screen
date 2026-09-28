const http = require('http');

function postJSON(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = http.request({
      host: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function getJSON(path) {
  return new Promise((resolve, reject) => {
    http.get({ host: 'localhost', port: 5000, path }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', reject);
  });
}

async function runConcurrencyTest() {
  console.log('====================================================');
  console.log('   CONCURRENCY STRESS TEST - RACE CONDITION CHECK   ');
  console.log('====================================================\n');

  // Step 1: Reset DB
  await postJSON('/api/dev/reset', {});
  const initRes = await getJSON('/api/competitions/default');
  const competition = initRes.data.data.competition;
  const compId = competition._id;

  console.log(`Initial State: ${competition.bookedSpots}/${competition.maxSpots} spots booked.`);
  console.log('Simulating 25 concurrent registration attempts simultaneously...\n');

  // Launch 25 concurrent registration requests with mock user IDs
  const concurrentRequests = [];
  for (let i = 1; i <= 25; i++) {
    const mockUserId = `6ab8fead5760dec7b61e2c${(10 + i).toString(16).padStart(2, '0')}`;
    concurrentRequests.push(
      postJSON(`/api/competitions/${compId}/register`, { userId: mockUserId })
    );
  }

  const results = await Promise.all(concurrentRequests);

  const successes = results.filter(r => r.status === 201);
  const conflicts = results.filter(r => r.status === 409);
  const others = results.filter(r => r.status !== 201 && r.status !== 409);

  console.log(`Results from 25 concurrent attempts:`);
  console.log(`  ✓ Successful Bookings (201 Created) : ${successes.length}`);
  console.log(`  ⚠ Capacity Blocked   (409 Conflict): ${conflicts.length}`);
  if (others.length > 0) {
    console.log(`  ✗ Unexpected responses               : ${others.length}`);
  }

  // Verify DB state
  const finalRes = await getJSON('/api/competitions/default');
  const finalComp = finalRes.data.data.competition;
  const finalBooked = finalComp.bookedSpots;
  const maxSpots = finalComp.maxSpots;

  console.log(`\nFinal DB Booked Spots: ${finalBooked}/${maxSpots}`);
  console.log(`Remaining Spots: ${finalRes.data.data.computed.spotsRemaining}`);

  // Clean reset back to 1
  await postJSON('/api/dev/reset', {});
  console.log('Restored DB to default state (1/20 booked).\n');

  if (finalBooked <= maxSpots && successes.length === (maxSpots - 1)) {
    console.log('🎉 TEST PASSED: Zero overselling! Atomic reservation prevents race conditions under load.');
  } else {
    console.error('❌ TEST FAILED: Overbooking occurred!');
  }
}

runConcurrencyTest().catch(console.error);
