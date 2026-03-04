# CMS Admin Access (Decap)

This project now includes a browser editor at `/admin`.

## Completed So Far

- ~~Created admin route and CMS scaffold (`/admin`)~~
- ~~Configured CMS content folder (`src/content/lab-articles-json/`)~~
- ~~Wired site data loader to CMS JSON content source~~
- ~~Updated deploy workflow to publish `/admin`~~
- ~~Added local pre-commit secret scanning hook~~

## Local Access (No OAuth needed)

1. Start CMS proxy: `npm run cms:proxy`
2. In a second terminal, start dev server: `npm start`
3. Open: `http://localhost:3000/admin/`
4. Editor uses `local_backend: true`, so saves write files directly in your local repo.

## Content Path

- Articles are stored in: `src/content/lab-articles-json/`
- Images are stored in: `assets/lab-article-images/`

## Production Access (GitHub Pages)

To edit directly on the live site, Decap's GitHub backend needs OAuth.

### Required setup

1. Create a GitHub OAuth App.
2. Configure an OAuth auth service/proxy for Decap.
3. Add the auth service values into `admin/config.yml` under `backend`.
4. Verify login at `https://ericriveraisme.github.io/admin/`.

Without OAuth service setup, live `/admin` can load but cannot authenticate for GitHub write actions.

## What’s Left To Do (Production)

1. Deploy a Decap auth service/proxy (or use an equivalent hosted option).
2. Create a GitHub OAuth App for your repo access flow.
3. In `admin/config.yml`, set:
	- `backend.base_url`
	- `backend.auth_endpoint`
4. In the OAuth App settings, configure callback URL to match your auth service callback route.
5. Push these config changes to `main`.
6. Open `https://ericriveraisme.github.io/admin/` and verify login + save flow.
7. Create a test article in admin and confirm:
	- new JSON appears in `src/content/lab-articles-json/`
	- article appears in Lab Logs
	- newest five behavior updates in Active Quests

## Validation and Publish Flow

1. Create/edit article in `/admin`.
2. Save (writes JSON article file + optional image path).
3. Run local validation: `npm run validate:content`.
4. Commit/PR to `main`.
5. CI runs content validation + audit/build.
6. Deploy workflow publishes updated site.

## Local Secret Guardrail (Recommended)

This repo includes a local pre-commit secret scan hook.

1. ~~Run once: `npm run hooks:install`~~
2. Commit as usual.
3. If potential secrets are detected in staged files, commit is blocked.

Hook files:
- `.githooks/pre-commit`
- `scripts/scan-secrets.sh`

## Data Contract

Each article record should include:
- `slug` (unique)
- `questTitle`
- `publishedAt` (`YYYY-MM-DD`)
- `content` (list of paragraph strings)
- optional `images` list (`src`, `alt`, `insertAfter`)
