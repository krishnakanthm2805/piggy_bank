#!/usr/bin/env node
import { spawn } from 'child_process';
import http from 'http';

function waitForRpc(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(url, (res) => {
        // if we get any response, RPC is up
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) reject(new Error('Timeout waiting for RPC'));
        else setTimeout(check, 500);
      });
    };
    check();
  });
}

// If RPC is already running, skip starting a new node. Otherwise start node and then deploy.
const RPC_URL = 'http://127.0.0.1:8545';

const cleanupFuncs = [];
const cleanup = () => {
  for (const fn of cleanupFuncs) {
    try { fn(); } catch (e) {}
  }
};
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

(async () => {
  try {
    // Check if RPC already up
    let rpcUp = false;
    try {
      await waitForRpc(RPC_URL, 2000);
      rpcUp = true;
    } catch (e) {
      rpcUp = false;
    }

    let nodeProc = null;
    if (!rpcUp) {
      console.log('Starting Hardhat node...');
      nodeProc = spawn('npx', ['hardhat', 'node'], { stdio: 'inherit', shell: true });
      nodeProc.on('error', (err) => {
        console.error('Failed to start Hardhat node:', err);
        process.exit(1);
      });
      cleanupFuncs.push(() => { try { nodeProc.kill(); } catch (e) {} });

      // wait for the node to be ready
      await waitForRpc(RPC_URL, 20000);
      console.log('Hardhat RPC is up — running deploy script');
    } else {
      console.log('Hardhat RPC already running — running deploy script');
    }

    const deploy = spawn('npx', ['hardhat', 'run', 'scripts/deploy.js', '--network', 'localhost'], { stdio: 'inherit', shell: true });
    deploy.on('close', (code) => {
      console.log('Deploy process exited with code', code);
      cleanup();
      process.exit(code ?? 0);
    });
    deploy.on('error', (err) => {
      console.error('Deploy process failed:', err);
      cleanup();
      process.exit(1);
    });
  } catch (err) {
    console.error('Error in start-and-deploy:', err);
    cleanup();
    process.exit(1);
  }
})();
