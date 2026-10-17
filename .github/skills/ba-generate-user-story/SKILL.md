---
name: ba-generate-user-story
description: Generate, refine, split, or review Agile user stories from rough feature ideas, business requirements, meeting notes, screen descriptions, process flows, or backlog items. Use when the user asks to "generate user story", "write a user story", "create acceptance criteria", "turn this into a backlog item", "split this story", or prepare a sprint-ready story with business value, Gherkin acceptance criteria, assumptions, out-of-scope notes, NFRs, and traceability.
---

# BA Generate User Story

## Purpose

Use this skill to turn raw product or business input into a clear, testable Agile user story. Prefer business-facing language, vertical slices, and acceptance criteria that a delivery team can implement and QA can verify.

## Context First

1. Extract confirmed facts from the prompt and any provided files, links, screenshots, or existing stories.
2. If working inside a repository that has `.workspace/` or `.agents/`, read the local project/workflow context and relevant BA rules before creating or saving story artifacts.
3. Prefer local story templates and standards when they exist, especially `.agents/templates/user-story-template.md` and `.workspace/rules/ba/user-story/`.
4. Read the Product Brief and functional decomposition for the topic (for example under `working-artifacts/product-brief/` and `working-artifacts/functional-decomposition/`) so the story's context and traceability link to real brief items.
5. Ask only for blocking gaps that materially change the story, usually primary user role, business goal, value, parent epic, or scope boundary. If the user wants a fast draft, proceed with explicit assumptions.

## Workflow

1. Identify the business outcome.
   - Name the actor, capability, value, target workflow, source evidence, and boundaries.
   - Separate confirmed requirements from assumptions, recommendations, and open questions.

2. Choose the story shape.
   - Generate vertical business slices that include the complete user outcome.
   - Do not split by implementation layer such as API, database, UI component, logging, or infrastructure.
   - Do not create micro-interaction stories for button clicks, loaders, popups, field validation, or modal display unless they represent a distinct business capability.
   - Split only when there is meaningful separation by business capability, workflow stage, user role, release priority, operational handling, complexity, or independent demonstrability.

3. Draft the story.
   - Use "As a / I want / So that" for the story statement.
   - Add a **US context** section right after the header (see "US context section" below).
   - Include value, preconditions, assumptions, main workflow notes, out-of-scope items, NFRs, traceability, and open questions when relevant.
   - Write acceptance criteria in Gherkin or clear Given/When/Then form unless the user requests another format.
   - Include at least one happy path and one negative, boundary, permission, state, or error scenario when applicable.
   - Keep NFRs traceable to source input; do not invent thresholds.

4. Handle UI stories.
   - If a mockup, screenshot, Figma URL, or wireframe is provided, reference it and extract visible UI behavior and details.
   - If no visual exists, create one (use the `ba-wireframe-mockup-generation` skill) or mark the mockup as `TBD` and flag it in the open questions.
   - Add a **Mockup images for the developer to refer to** section (see "Mockup reference section" below).
   - Give every AC that affects the UI a **UI** table (see "UI table in each AC" below) and a corresponding mockup image.
   - Keep the Given/When/Then text business-focused; put field-level detail (labels, sizes, colors, states, exact messages) in the UI table.

5. Quality check before finalizing.
   - Validate INVEST: independent, negotiable, valuable, estimable, small, testable.
   - Check Definition of Ready basics: role, goal, value, priority, assumptions/preconditions, testable AC, out-of-scope, NFR handling, and traceability.
   - Check that the US context links to the Product Brief, every UI AC has a UI table and a matching mockup image, and image names match AC IDs.
   - Flag ambiguity, missing business rules, data/security/privacy impact, dependencies, and open decisions.

## US context section

Place `## US context` before `## Story`. Read the Product Brief (for example `working-artifacts/product-brief/<topic>/`) and the functional decomposition first. Include:

- **Concept.** 2–4 sentences: what the story adds to the product, the user flow it enables, and how it relates to neighboring stories.
- **Link to the Product Brief.** A link to the brief plus a table (`Product Brief item | How this story relates`) mapping the relevant core features, business rules, assumptions, design direction, and out-of-scope items to the story and its ACs. Cite only items that actually exist in the brief.
- **Related stories.** Dependencies on, and dependents of, other stories.

## Mockup reference section

Place `## Mockup images for the developer to refer to` after Preconditions and before Acceptance Criteria. Include:

- A relative link to the image folder, `working-artifacts/mockup-wireframe/<topic>/US-0x-<story-name>/`.
- The naming convention: each file name starts with the AC it illustrates, for example `AC4-perfect-day.png`.
- The image format (for example 390×844 screenshots) and a link to the source mockup file.
- A source note for any AC the mockup cannot illustrate (for example persistence after reopening) and which image stands in for it.

Create one image per UI-affecting AC from the mockup (or the wireframe produced for the story) and save it in that folder. Do not edit the source mockup to match the story without being asked.

## UI table in each AC

After the Given/When/Then lines of each AC, add `- **UI:**` followed by a table:

| Field name | Field type | Mandatory | Design description | Error message |
| --- | --- | --- | --- | --- |

- Include every visible element the AC involves: fields, buttons, cards, indicators, empty states, toasts.
- Design description: default value, size, color (hex), states, and animation, taken from the mockup and `DESIGN.md` when present.
- Error message: the exact text and where it appears; write `None` when no message applies.
- Use `N/A` in Mandatory for display-only elements or actions.
- Add a short intro under `## Acceptance Criteria` explaining the table columns.
- Keep the table consistent with the image named after the AC; if they conflict, resolve it and note the decision.

## Output Modes

- Inline story: Use when the user asks for a draft, rewrite, or review in chat.
- Saved artifact: Use only when the user asks to create files or the local workflow requires it. Default location: `working-artifacts/user-stories/<topic-or-task-name>/` at the workspace root (per the BA Agent's Artifact Output Location rule), unless the workspace follows the NashTech AI SDLC folder conventions below or the user requests a different location.
- Tool-specific format: Adapt fields for Azure DevOps, Jira, Confluence, or CSV only when requested.

Story document structure (omit a section only when it truly does not apply):

1. `# US-0x — <Title>` with Status, Priority, Primary actor
2. `## US context` (concept, Product Brief link and mapping table, related stories)
3. `## Story` (As a / I want / So that)
4. `## Value`
5. `## Preconditions`
6. `## Mockup images for the developer to refer to`
7. `## Acceptance Criteria` (each AC: Given/When/Then plus a **UI** table)
8. `## Rules and Notes`
9. `## Dependencies and Open Questions`
10. `## Traceability` (Product Brief, mockup annotations, functional decomposition IDs)

## Saving In A Workspace With BA Conventions

When saving a draft in a workspace that follows the NashTech AI SDLC folder conventions, use `.workspace/specs/...` instead of the default `working-artifacts/user-stories/` location:

1. Scan `.workspace/specs/user-stories/drafts/` and `.workspace/specs/user-stories/published/` for existing sequence numbers.
2. Use the next 5-digit sequence number and a short kebab-case description.
3. Create `.workspace/specs/user-stories/drafts/<00000-short-name>/<00000-short-name>.md`.
4. Use the local user story template if present.
5. Add a references table listing consulted workspace files.
6. Do not publish the story unless the user explicitly asks and the project workflow allows it.

## Final Response

When returning the result, keep the story first. Put assumptions, open questions, and quality notes after the story so the user can review the deliverable quickly.
