# CMS Admin Access (Decap)

This project now includes a browser editor at `/admin`.

## Completed So Far

- ~~Created admin route and CMS scaffold (`/admin`)~~
- ~~Configured CMS content folder (`src/content/lab-articles-json/`)~~
- ~~Wired site data loader to CMS JSON content source~~
- ~~Updated deploy workflow to publish `/admin`~~
- ~~Added local pre-commit secret scanning hook~~
- ~~Deployed Decap OAuth auth service/proxy~~
- ~~Created GitHub OAuth App and configured callback~~
- ~~Configured production backend auth values in `admin/config.yml`~~
- ~~Validated live login + publish flow at `/admin`~~
- ~~Validated live delete flow~~

## Local Access (No OAuth needed)

0. Ensure local mode config: `npm run admin:config:local`
1. Start both services with one command: `npm run cms:local`
2. Open: `http://localhost:3003/admin/`
3. CMS proxy runs on port `8082` behind the scenes.
4. Editor uses `local_backend: true`, so saves write files directly in your local repo.

## Config Mode Switching

- Switch to local editing mode: `npm run admin:config:local`
- Switch to production OAuth template mode: `npm run admin:config:prod`

These commands overwrite `admin/config.yml` using template files:
- `admin/config.local.template.yml`
- `admin/config.production.template.yml`

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

## Where To Test (Now vs OAuth)

### Test now (no OAuth)

- Run: `npm run cms:local`
- Open: `http://localhost:3003/admin/`
- Use this to validate editor UX, JSON writes, image uploads, and site rendering flow.

### First point you can test GitHub OAuth

You can only test real GitHub login **after** all of these are true:

1. OAuth auth service/proxy is deployed.
2. GitHub OAuth App is created with correct callback URL.
3. `admin/config.yml` has real values for:
	- `backend.base_url`
	- `backend.auth_endpoint`
4. `npm run check:admin-prod` passes.
5. Changes are pushed and deployed to the live site.

Then test at: `https://ericriveraisme.github.io/admin/`

This is the best test point because OAuth callback URLs must match the live domain setup.

## Auth Session Behavior

GitHub OAuth sessions in admin can require re-authentication over time.

Common reasons:
- OAuth token/session expires (depends on auth service settings)
- Browser storage/cookies cleared
- New browser or new device
- OAuth app authorization revoked in GitHub
- Auth service token/session invalidation or rotation

Expected recovery flow:
1. Open `/admin`
2. Click login again
3. Re-approve GitHub app if prompted
4. Resume editing

Local note:
- Local backend editing (`local_backend: true`) does not require GitHub OAuth login.

## What’s Left To Do (Production)

1. ~~Deploy a Decap auth service/proxy (or use an equivalent hosted option).~~
2. ~~Create a GitHub OAuth App for your repo access flow.~~
3. ~~In `admin/config.yml`, set:~~
	- ~~`backend.base_url`~~
	- ~~`backend.auth_endpoint`~~
4. ~~In the OAuth App settings, configure callback URL to match your auth service callback route.~~
5. ~~Push these config changes to `main`.~~
6. ~~Open `https://ericriveraisme.github.io/admin/` and verify login + save flow.~~
7. ~~Create a test article in admin and confirm:~~
	- ~~new JSON appears in `src/content/lab-articles-json/`~~
	- ~~article appears in Lab Logs~~
	- ~~newest five behavior updates in Active Quests~~

## Production Readiness Check

Before enabling live `/admin`, run:

`npm run check:admin-prod`

- If it fails, fill missing OAuth fields in `admin/config.yml`.
- Use `admin/config.production.template.yml` as the source template for required values.

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

## Final Remaining Production Tasks

1. ~~Deploy OAuth auth service/proxy for Decap.~~
2. ~~Create/configure GitHub OAuth App callback URL for that service.~~
3. ~~Update `admin/config.yml` with real OAuth values:~~
	- ~~`backend.base_url`~~
	- ~~`backend.auth_endpoint`~~
	- ~~recommended: `site_url`, `display_url`~~
4. ~~Run `npm run check:admin-prod` until it passes.~~
5. ~~Push and deploy to main.~~
6. ~~Validate live admin at `https://ericriveraisme.github.io/admin/`:~~
	- ~~login works~~
	- ~~create test post works~~
	- ~~post appears in Lab Logs~~
	- ~~top-5 Active Quests updates correctly~~

## Production Status

✅ CMS production upgrade is complete and validated:
- OAuth login works on live `/admin`
- Create/edit/delete flows are confirmed
- Publish pipeline updates live Lab Logs + Active Quests automatically

## GitHub OAuth Setup Walkthrough

Use this sequence to finish production auth cutover.

### 1) Deploy an auth service for Decap

You need a Decap-compatible OAuth proxy service endpoint that handles GitHub auth exchange.

When deployed, collect:
- `AUTH_BASE_URL` (example: `https://your-auth-service.example.com`)
- `AUTH_ENDPOINT` (often `auth`)
- callback URL path required by that service

### 2) Create GitHub OAuth App

In GitHub:
- Go to **Settings → Developer settings → OAuth Apps → New OAuth App**
- Set **Application name** to something like: `Portfolio CMS Admin`
- Set **Homepage URL** to: `https://ericriveraisme.github.io`
- Set **Authorization callback URL** to your auth service callback URL

Save the app and collect:
- Client ID
- Client Secret

Configure those values in your auth service (not in this repo).

### 3) Switch repo config to production mode

Run:

`npm run admin:config:prod`

Then edit [admin/config.yml](admin/config.yml) and set:
- `backend.base_url: AUTH_BASE_URL`
- `backend.auth_endpoint: AUTH_ENDPOINT`
- `site_url: https://ericriveraisme.github.io`
- `display_url: https://ericriveraisme.github.io`

### 4) Validate config before deploy

Run:

`npm run check:admin-prod`

It must pass before deploying.

### 5) Deploy and test live admin

1. Commit and push the config updates.
2. Wait for CI/deploy to complete.
3. Open `https://ericriveraisme.github.io/admin/`.
4. Click login and complete GitHub OAuth flow.
5. Create a test article and confirm downstream updates.

### 6) Verify publishing flow

Confirm the new article appears in:
- Lab Logs page
- Active Quests (top-5 newest)
- Full article route
