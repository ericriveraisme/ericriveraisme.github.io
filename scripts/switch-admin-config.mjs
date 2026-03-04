import fs from 'node:fs';
import path from 'node:path';

const mode = process.argv[2];
const root = process.cwd();
const adminDir = path.join(root, 'admin');

const map = {
  local: 'config.local.template.yml',
  prod: 'config.production.template.yml'
};

if (!mode || !map[mode]) {
  console.error('Usage: node scripts/switch-admin-config.mjs <local|prod>');
  process.exit(1);
}

const src = path.join(adminDir, map[mode]);
const dest = path.join(adminDir, 'config.yml');

if (!fs.existsSync(src)) {
  console.error(`Template not found: ${src}`);
  process.exit(1);
}

fs.copyFileSync(src, dest);
console.log(`✅ admin/config.yml switched to ${mode} mode from ${map[mode]}`);
