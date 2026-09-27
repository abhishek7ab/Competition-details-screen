const http = require('http');

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('       FEEDANTS BACKEND FULL API TEST SUITE        ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
    }
  }

  // TEST 1: Reset demo state to clean baseline
  console.log('Test 1: Reset Demo DB to baseline (/api/dev/reset)');
  const resetRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/dev/reset',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {});
  assert(resetRes.status === 200, 'Reset returns 200 OK');
  assert(resetRes.data?.success === true, 'Reset returned success: true');

  // TEST 2: Fetch demo users
  console.log('\nTest 2: Fetch Demo Users list (/api/users)');
  const usersRes = await request({
    host: 'localhost',
    port: 5000,
    path: '/api/users',
    method: 'GET'
  });
  assert(usersRes.status === 200, 'Demo users returns 200 OK');
  const users = usersRes.data?.data || [];
  assert(users.length >= 2, `Found ${users.length} demo users (expected >= 2)`);
  const pooja = users.find(u => u.name === 'Pooja Sharma');
  const rahul = users.find(u => u.name !== 'Pooja Sharma');
  assert(pooja !== undefined, 'Found registered performer: Pooja Sharma');
  assert(rahul !== undefined, 'Found unregistered persona: ' + rahul?.name);

  // TEST 3: Fetch Default Competition for Pooja Sharma
  console.log('\nTest 3: Fetch Competition Details for Pooja (Registered)');
  const compPoojaRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/default?userId=${pooja._id}`,
    method: 'GET'
  });
  assert(compPoojaRes.status === 200, 'Default competition returns 200 OK');
  const compData = compPoojaRes.data?.data?.competition;
  const compComputed = compPoojaRes.data?.data?.computed;
  assert(compData.title === 'Feedants Classical Dance', 'Competition title is correct');
  assert(compData.judge.name === 'Manju Dubey', 'Jury lead is Manju Dubey');
  assert(compData.entryFee === 99, 'Entry fee is ₹99');
  assert(compData.prizePool === 1500, 'Prize pool is ₹1,500');
  assert(compComputed.userState.isRegistered === true, 'Pooja isRegistered === true');
  assert(compComputed.spotsRemaining === 19, 'Spots remaining is 19 (1/20 booked)');

  // TEST 4: Fetch Default Competition for Rahul (Unregistered)
  console.log('\nTest 4: Fetch Competition Details for Rahul (New User)');
  const compRahulRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/default?userId=${rahul._id}`,
    method: 'GET'
  });
  const rahulComputed = compRahulRes.data?.data?.computed;
  assert(rahulComputed.userState.isRegistered === false, 'Rahul isRegistered === false');

  // TEST 5: Register Rahul
  console.log('\nTest 5: Register Rahul for Competition');
  const regRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/${compData._id}/register`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { userId: rahul._id });
  assert(regRes.status === 201, 'Registration succeeded with 201 Created');
  assert(regRes.data?.data?.bookedSpots === 2, 'Booked spots incremented to 2');

  // TEST 6: Verify Rahul now registered
  console.log('\nTest 6: Verify Rahul userState updated to registered');
  const rahulAfterReg = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/default?userId=${rahul._id}`,
    method: 'GET'
  });
  assert(rahulAfterReg.data?.data?.computed?.userState?.isRegistered === true, 'Rahul isRegistered is now true');
  assert(rahulAfterReg.data?.data?.computed?.spotsRemaining === 18, 'Spots remaining is now 18');

  // TEST 7: Submit Entry for Pooja
  console.log('\nTest 7: Submit Video Entry for Pooja');
  const subRes = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/${compData._id}/submit`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    userId: pooja._id,
    title: 'Kathak Tarana in Teentaal',
    videoUrl: 'https://youtube.com/watch?v=kathak_sample_live',
    danceStyle: 'Kathak'
  });
  assert(subRes.status === 200, 'Submission succeeded with 200 OK');

  // TEST 8: State Machine Overrides
  console.log('\nTest 8: State Machine Overrides (/override-status)');
  const overrideClosed = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/${compData._id}/override-status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { statusOverride: 'REGISTRATION_CLOSED' });
  assert(overrideClosed.status === 200, 'Override endpoint returns 200');

  const checkClosed = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/default?userId=${pooja._id}`,
    method: 'GET'
  });
  assert(checkClosed.data?.data?.computed?.currentState === 'REGISTRATION_CLOSED', 'Forced state to REGISTRATION_CLOSED verified');

  const overrideAuto = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/${compData._id}/override-status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { statusOverride: 'AUTO' });
  assert(overrideAuto.status === 200, 'Reset override back to AUTO returns 200');

  // TEST 9: Final Clean Reset
  console.log('\nTest 9: Reset DB back to clean default demo state');
  await request({
    host: 'localhost',
    port: 5000,
    path: '/api/dev/reset',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {});
  const finalCheck = await request({
    host: 'localhost',
    port: 5000,
    path: `/api/competitions/default?userId=${pooja._id}`,
    method: 'GET'
  });
  assert(finalCheck.data?.data?.competition?.bookedSpots === 1, 'Clean state restored: 1/20 booked, 19 spots left');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('====================================================\n');
}

runTests().catch(console.error);
