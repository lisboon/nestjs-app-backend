## Description
<!-- Summarize what has been done. GitHub Copilot/Claude uses this to understand the overall context. -->
<!-- What was done and why. Link the related issue: Closes #123 -->

## Changes
<!-- This section will be used to generate release notes. Keep it concise. -->
<!-- Suggested format:
  [FEAT] Added `submit-project` use case to register donation/sponsorship requests
  [FIX] Corrected approval stage transition when a project is returned to the previous sector
  [REFACTOR] Extracted slug normalization helper from the content module
-->

## How to Test / Points to Consider
<!-- This helps the reviewer and Copilot/Claude know where to focus. -->
1. Simple step-by-step instructions for testing (e.g., Call `POST /donations` with a valid payload and check the project appears in `GET /donations` with status `SUBMITTED`).
2. Indicate whether there were any changes to the database (e.g., "Requires running `pnpm prisma:migrate`") or environment variables (keep `.env.example` in sync).

## Checklist
- [ ] The code compiles/runs without any new errors.
- [ ] I performed a self-review of my own code.
- [ ] No leftover debug code (`console.log`, commented blocks) remains.
- [ ] Dependencies (if any) have been updated.
- [ ] I ensured no framework/infra imports leaked into the pure domain layer (`src/modules/**` must not import NestJS or Prisma).
- [ ] I updated the living documentation affected by this change (`docs/`, `.claude/skills/`).