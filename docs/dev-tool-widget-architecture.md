# DevToolWidget Architecture Proposal

This document proposes a cleaner architecture for developer-oriented tools in ConvertCenter without implementing the full refactor yet.

## Why This Needs A Separate Architecture

The current dev-tool path works, but it mixes several interaction models:

- [DevToolWidget](../components/dev-tool-widget.tsx) handles generic text-to-text tools
- [DevToolPageWidget](../components/dev-tool-page-widget.tsx) contains mode dispatch and mode-specific error logic
- [MarkdownToolWidget](../components/markdown-tool-widget.tsx) is a separate one-off because it needs preview + HTML output
- [TextPageTemplate](../components/text-page-template.tsx) branches between text tools, dev tools, and markdown tools
- [text.ts](../lib/conversion/text.ts) contains editorial transforms and developer-oriented converters in one module

That leads to three problems:

1. UI concerns and tool-logic concerns are too tightly coupled.
2. New dev tools push more special cases into `DevToolPageWidget`.
3. Preview-capable tools like Markdown do not fit the same shape as simple encode/decode tools.

## Goals

- Keep dev tools separate from text-case tools and numeric converters.
- Let simple encode/decode tools share one UI path.
- Support richer tools like Markdown preview and future schema-aware tools without one-off branching.
- Keep the client bundle controlled by loading heavy features only where needed.
- Preserve the current registry-driven routing and metadata model.

## Proposed Boundary

Introduce a dedicated dev-tool system with three layers:

1. `dev-tool-definitions.ts`
2. `use-dev-tool-controller.ts`
3. composable `DevToolWidget` UI primitives

### 1. Tool Definitions

Create a dedicated definitions module:

- `lib/dev-tools/dev-tool-definitions.ts`

Each tool definition would describe:

- `id`
- `title`
- `inputKind`
- `outputKind`
- `primaryActionLabel`
- `secondaryActionLabel?`
- `supportsLiveOutput`
- `supportsPreview`
- `transform`
- `validate?`
- `normalizeInput?`
- `previewRenderer?`

Example shape:

```ts
type DevToolDefinition = {
  id: DevToolMode;
  inputKind: "text" | "json" | "yaml" | "markdown" | "url" | "base64";
  outputKind: "text" | "json" | "yaml" | "html" | "status";
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  supportsLiveOutput: boolean;
  supportsPreview?: boolean;
  transform: (input: string, action: "primary" | "secondary") => string;
  validate?: (input: string, output: string) => DevToolValidationState;
  previewRenderer?: (output: string) => DevToolPreviewModel;
};
```

This moves mode branching out of the component tree and into a typed config layer.

### 2. Shared Controller Hook

Create:

- `components/use-dev-tool-controller.ts`

Responsibilities:

- manage `input`
- manage selected action
- compute `output`
- compute `validationState`
- expose `clear`
- expose `copyValue`
- expose optional preview model

Suggested state model:

- `empty`
- `ready`
- `error`

This is intentionally simpler than the numeric converter state machine because developer tools mostly operate on whole-string transforms rather than partial numeric parsing.

### 3. UI Primitives

Split the current large widget into smaller pieces:

- `DevToolShell`
- `DevToolInputPane`
- `DevToolOutputPane`
- `DevToolStatusPanel`
- `DevToolPreviewPane`
- `DevToolActionBar`

Then keep a thin composition component:

- `DevToolWidget`

That component would receive a `definition` plus page-level defaults and compose the panes based on the tool capabilities.

## Proposed Component API

```ts
type DevToolWidgetProps = {
  definition: DevToolDefinition;
  defaultValue: string;
  title: string;
  description?: string;
  showCharacterCount?: boolean;
};
```

The widget should not receive raw transform callbacks directly from each page anymore. Instead, it receives a typed tool definition.

## Recommended Rendering Modes

To avoid special-casing every page:

- `text-to-text`
  - Base64 encode
  - Base64 decode
  - URL encode
  - URL decode
  - JSON to YAML
  - YAML to JSON
  - HTML to Markdown

- `text-to-status`
  - JSON validator

- `text-to-text-with-secondary-action`
  - JSON formatter / minifier

- `text-to-preview-and-code`
  - Markdown to HTML

That gives us four stable UI patterns instead of ad hoc branching.

## Registry Integration Plan

Keep the existing page registry for routing and SEO, but stop using it as the place that defines transform behavior.

Recommended split:

- `text-transform-pages.ts`
  - page metadata
  - SEO metadata
  - category assignment
  - related links

- `dev-tool-definitions.ts`
  - runtime tool behavior
  - validation
  - preview behavior
  - output mode

The page layer would reference the runtime definition by `mode`.

## Markdown-Specific Recommendation

Markdown should stop being a one-off top-level branch in [TextPageTemplate](../components/text-page-template.tsx).

Instead:

- keep `markdownToHtml` as a dev tool mode
- let its definition declare:
  - `outputKind: "html"`
  - `supportsPreview: true`
  - `previewRenderer`

Then the shared widget can render both:

- a preview pane
- a copyable HTML output pane

That removes the current dedicated `MarkdownToolWidget` exception.

## Performance Guidance

Following Vercel React/Next best practices:

- keep heavy libraries mode-scoped, not globally coupled to the whole client widget
- dynamically import preview-only panes if they grow heavier later
- avoid centralizing every transform in a client-heavy mega-component
- keep definition objects serializable and simple
- do not move route metadata generation into client components

In practical terms:

- `marked`, `turndown`, and any future formatter libraries should stay behind mode usage boundaries
- preview panes should be optional and only rendered when the tool definition asks for them

## Migration Plan

Recommended incremental implementation order:

1. Add `dev-tool-definitions.ts`
2. Add `use-dev-tool-controller.ts`
3. Refactor `DevToolWidget` into shell + panes
4. Move Base64/URL/JSON tools onto the new definition-driven system
5. Move Markdown to the same system and remove `MarkdownToolWidget`
6. Simplify [TextPageTemplate](../components/text-page-template.tsx) so dev tools use one render path
7. Split developer transforms out of [text.ts](../lib/conversion/text.ts) if the module keeps growing

## Risks

- If the definition layer becomes too abstract, simple tools may become harder to read than they are today.
- If preview behavior is folded into the base widget too early, the simple encode/decode path could become overbuilt.
- If all tool logic stays in `text.ts`, the architecture will still be cleaner at the UI layer but remain mixed in the conversion layer.

## Recommendation

Implement the proposal in the next phase as a focused refactor, not mixed into unrelated SEO or page-expansion work.

The best first milestone is:

- definition-driven Base64/URL/JSON tools
- shared controller hook
- no Markdown migration yet

That keeps the first refactor small while establishing the right architecture for the richer tools that come after.
