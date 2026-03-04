import fs from 'node:fs';
import path from 'node:path';

const configPath = path.join(process.cwd(), 'admin', 'config.yml');

if (!fs.existsSync(configPath)) {
  console.error('❌ admin/config.yml not found');
  process.exit(1);
}

const raw = fs.readFileSync(configPath, 'utf8');

const checks = [
  {
    label: 'backend.base_url is set',
    pass: /\n\s*base_url\s*:\s*https?:\/\//.test(raw) && !raw.includes('YOUR-CMS-AUTH-SERVICE')
  },
  {
    label: 'backend.auth_endpoint is set',
    pass: /\n\s*auth_endpoint\s*:\s*\S+/.test(raw)
  },
  {
    label: 'site_url is set',
    pass: /\n\s*site_url\s*:\s*https?:\/\//.test(raw)
  },
  {
    label: 'display_url is set',
    pass: /\n\s*display_url\s*:\s*https?:\/\//.test(raw)
  }
];

const failed = checks.filter((item) => !item.pass);

if (failed.length > 0) {
  console.error('❌ Admin production readiness check failed:');
  failed.forEach((item) => console.error(`- ${item.label}`));
  console.error('\nFill the OAuth-related fields in admin/config.yml before live admin usage.');
  process.exit(1);
}

console.log('✅ Admin production readiness check passed');
