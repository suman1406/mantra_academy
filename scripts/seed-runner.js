#!/usr/bin/env node
// Simple runner that registers ts-node so we can `node scripts/seed-runner.js`
// and avoid ESM resolution issues on some platforms.
require("ts-node").register({
  transpileOnly: false,
});

require("./seed.ts");
