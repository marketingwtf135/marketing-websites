# `docs/` — index

Self-contained kit for porting any HTML landing into the AXEVIL marketing stack (form → Google Sheet → online ads + offline qualified-lead postback).

## The four files

Three instruction documents define the system. The fourth is your prompt library.

1. **`INTEGRATION-PLAYBOOK.md`** — orchestrator. Read first. Defines the workflow, what to ask the user, migration strategies, step-by-step integration plan.
2. **`FORM-SPEC.md`** — behavioural specification of the form and its success / error modals. Site-agnostic.
3. **`MARKETING-STACK-SETUP.md`** — data flow: payload contract, AXEVIL `spreadsheet-form-writer` API, Sheet `enrichment` schema, offline postback Apps Script, GTM container, Meta Pixel / Google Ads / GA4 wiring, offline `QualifiedLead` postback. Concrete project values live in its Appendix A. Full source of the reusable lib modules and the production postback script are inlined in §2 and §4.3 (copy-paste ready).
4. **`PROMPT-TEMPLATES.md`** — ready-to-paste prompts for every typical situation: kickoff, resume after interruption, switch strategy, GTM-only setup, `spreadsheet-form-writer` endpoint provisioning, offline postback Apps Script setup, post-deploy triage, doc maintenance, etc. Always check here before composing a prompt from scratch.

## How to use (manual attach workflow)

1. Open the target project (typically a fresh folder with the source `index.html`) in Cursor.
2. Attach the three instruction files (`INTEGRATION-PLAYBOOK.md`, `FORM-SPEC.md`, `MARKETING-STACK-SETUP.md`) and the landing source to a new chat. `PROMPT-TEMPLATES.md` does **not** need to be attached — it's for you, not the agent.
3. From `PROMPT-TEMPLATES.md` §1.1, copy the kickoff prompt into the chat.
4. Answer the intake questions the agent will ask before any code is written.
5. Phase the work per `INTEGRATION-PLAYBOOK.md` §8. Use other `PROMPT-TEMPLATES.md` sections as the work progresses (resume, switch strategy, GTM-only, etc.).

The three instruction files are self-contained — no external repo access is needed.

## Conflict resolution

If two files seem to contradict each other:

- `FORM-SPEC.md` wins on form behaviour.
- `MARKETING-STACK-SETUP.md` wins on data flow and configuration.
- `INTEGRATION-PLAYBOOK.md` wins on what to do and in what order.
- Frozen contracts (event names, payload keys, cookies) are defined in `MARKETING-STACK-SETUP.md` §9 and `FORM-SPEC.md` §10 — never rename them.
