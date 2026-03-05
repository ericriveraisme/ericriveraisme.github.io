# Forensic Version Control & Release Visibility

This project now uses a lightweight forensic workflow so every rollout has a clear audit trail.

## Goals

- Make each change easy to trace from request → code → verification → deploy.
- Reduce ambiguity during incident review and rollback decisions.
- Keep visibility high without adding heavy process overhead.

## Standard Change Record

Every meaningful change should include:

1. **Intent**
   - What changed and why.
2. **Scope**
   - Which files/systems were touched.
3. **Risk**
   - What could regress.
4. **Validation**
   - Exact checks run (e.g., `npm run validate:content`, `npm run build`).
5. **Rollout Result**
   - Commit SHA and deployment status.

## Commit Hygiene

- Use conventional-style messages when possible (`feat:`, `fix:`, `chore:`, `docs:`).
- Keep commits focused on one rollout concern.
- Avoid mixing unrelated refactors with production behavior changes.
- Prefer explicit commit body bullets for high-impact changes.

## Pull Request Visibility

A PR template is provided at `.github/PULL_REQUEST_TEMPLATE.md`.

Complete all sections:
- Summary
- Risk & rollback
- Verification evidence
- Security/secrets check

## Automated Forensic Report

Workflow: `.github/workflows/forensic-visibility.yml`

On every push/PR it generates a report with:
- Actor, branch, commit SHA
- Changed files (`git diff --name-status`)
- Recent commit chain
- Event metadata and compare links

The report appears in:
- **Job Summary** (high visibility in Actions UI)
- **Artifact** (`forensic-report`) for later retrieval

## Release Checklist (Fast)

Before push:

```bash
npm run validate:content
npm run build
git status
```

After push:

1. Confirm CI + deploy green.
2. Open `forensic-visibility` workflow run.
3. Verify report includes expected changed files and SHA.
4. Confirm live URL behavior.

## Incident/Regression Triage

If a regression appears:

1. Identify affected deploy SHA.
2. Open corresponding forensic workflow run.
3. Inspect changed files + recent commit chain.
4. Reproduce locally from that SHA.
5. Roll forward with targeted fix (preferred) or rollback if needed.
