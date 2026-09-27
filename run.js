const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');
console.log('\x1b[36m%s\x1b[0m', '  🚀 Feedants Competition System - Unified Launcher');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

const rootDir = __dirname;
const backendDir = path.join(rootDir, 'backend');
const frontendDir = path.join(rootDir, 'frontend');

// Helper to spawn processes and stream logs with colored prefixes
function runService(name, command, args, cwd, colorCode) {
  console.log(`\x1b[${colorCode}m[${name}]\x1b[0m Starting ${command} ${args.join(' ')}...`);

  const proc = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe',
    env: { ...process.env, BROWSER: 'none' }, // We control browser opening
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(`\x1b[${colorCode}m[${name}]\x1b[0m ${line}`);
      }
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        console.error(`\x1b[${colorCode}m[${name}]\x1b[0m ${line}`);
      }
    });
  });

  proc.on('close', (code) => {
    console.log(`\x1b[${colorCode}m[${name}]\x1b[0m Process exited with code ${code}`);
  });

  return proc;
}

// 1. Launch Backend (Node + Express + Mongo Memory Server on port 5000)
const backend = runService('BACKEND', npmCmd, ['run', 'dev'], backendDir, '33'); // Yellow

// 2. Launch Frontend (Expo Web on port 8081)
let frontend = null;
setTimeout(() => {
  frontend = runService('FRONTEND', npmCmd, ['run', 'web'], frontendDir, '36'); // Cyan

  // 3. Auto-open browser after a short delay
  setTimeout(() => {
    const openCmd = isWindows ? 'start http://localhost:8081' : 'open http://localhost:8081';
    console.log('\x1b[32m%s\x1b[0m', '✨ Opening browser at http://localhost:8081 ...');
    spawn(openCmd, { shell: true });
  }, 4000);
}, 2000);

// Graceful shutdown on Ctrl+C
const cleanup = () => {
  console.log('\n\x1b[31m%s\x1b[0m', 'Shutting down servers...');
  if (backend) backend.kill();
  if (frontend) frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
