
#!/usr/bin/env node

/**
 * A simple script to run Vitest without modifying package.json
 * 
 * Usage:
 *   node run-tests.js [--coverage]
 */

const { spawn } = require('child_process');
const path = require('path');

// Get arguments
const args = process.argv.slice(2);
const withCoverage = args.includes('--coverage');

// Find the vitest binary from node_modules
const vitestBin = path.resolve(__dirname, 'node_modules', '.bin', 'vitest');

// Build the command arguments
const cmdArgs = [];
if (withCoverage) {
  cmdArgs.push('run', '--coverage');
} else {
  cmdArgs.push('run');
}

// Spawn vitest process
const testProcess = spawn(vitestBin, cmdArgs, {
  stdio: 'inherit',
  shell: true
});

testProcess.on('close', (code) => {
  process.exit(code);
});
