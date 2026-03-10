---
description: Typography system rules and replacement workflow
---

# Typography System Workflow

This document defines the typography utility classes and rules for the NX4 Hydrogen project.

## Typography Utility Classes (Figma-Based)

The following custom typography classes are defined in `app/styles/tailwind.css`:

| Class               | Weight | Size   | Line Height | Letter Spacing | Extras     |
| ------------------- | ------ | ------ | ----------- | -------------- | ---------- |
| `text-display`      | 300    | 48px   | 32px        | 3.5px          | —          |
| `text-h1`           | 500    | 30px   | 40px        | 2.3px          | —          |
| `text-h1-allcaps`   | 600    | 30px   | 32px        | 2.3px          | uppercase  |
| `text-h1-light`     | 300    | 30px   | 32px        | 2.3px          | capitalize |
| `text-h2-light`     | 300    | 22px   | 28px        | 2.3px          | —          |
| `text-h3`           | 500    | 16px   | 28px        | 1.35px         | —          |
| `text-body-regular` | 400    | 13.5px | 18px        | 1.35px         | —          |
| `text-body-medium`  | 500    | 13.5px | 18px        | 1.35px         | —          |
| `text-cta`          | 400    | 13.5px | 22px        | 1.35px         | —          |
| `text-caption`      | 500    | 13.5px | 18px        | 2.3px          | uppercase  |
| `text-detail`       | 400    | 11px   | 14px        | 1.35px         | —          |

## HTML Element Defaults

The following HTML elements have default typography applied via CSS (in `tailwind.css` `@layer base`):

```css
h1 {
  @apply text-h1;
}
h2 {
  @apply text-h2-light;
}
h3 {
  @apply text-h3;
}
p {
  @apply text-body-regular;
}
caption {
  @apply text-caption;
}
```

## Rules

### Rule 1: Don't Redeclare Default Styles

Since HTML elements inherit default typography, **do not** add redundant classes:

```tsx
// ❌ BAD - text-h1 is redundant on <h1>
<h1 className="text-h1 font-bold">Title</h1>

// ✅ GOOD - only add non-typography classes
<h1 className="font-bold">Title</h1>

// ❌ BAD - text-body-regular is redundant on <p>
<p className="text-body-regular text-gray-500">Description</p>

// ✅ GOOD - only add non-typography classes
<p className="text-gray-500">Description</p>
```

### Rule 2: Override When Needed

Use typography classes when you want a **different** style than the default:

```tsx
// ✅ Using text-caption on <p> to override default text-body-regular
<p className="text-caption text-white">Small footer caption</p>

// ✅ Using text-display on <h1> for larger heading
<h1 className="text-display">Hero Title</h1>

// ✅ Using text-h2-light styling on an <h4> for semantic reasons
<h4 className="text-h2-light">Section title</h4>
```

### Rule 3: Non-Paragraph Elements Need Explicit Classes

Elements like `<span>`, `<div>`, `<small>`, `<input>` don't inherit default styling:

```tsx
// ✅ Span needs explicit typography
<span className="text-detail">Label</span>

// ✅ Input needs explicit typography
<input className="text-body-regular" placeholder="Enter text" />

// ✅ Small element needs explicit typography
<small className="text-body-medium text-black">Price</small>
```

## Replacement Mapping (Old → New)

When migrating from old typography classes to new Figma-based classes:

| Old Class                | New Class           | Notes                 |
| ------------------------ | ------------------- | --------------------- |
| `text-h1` (old)          | `text-h1`           | Different specs       |
| `text-h2`                | `text-h2-light`     | Now uses Light weight |
| `text-p-large`           | `text-body-regular` | —                     |
| `text-p-small`           | `text-body-regular` | —                     |
| `text-display-l`         | `text-display`      | —                     |
| `text-body-l`            | `text-body-medium`  | —                     |
| `text-paragraph`         | `text-body-regular` | Now default for `<p>` |
| `text-caption-regular`   | `text-detail`       | —                     |
| `text-caption-uppercase` | `text-caption`      | —                     |
| `text-caption` (old)     | `text-caption`      | Different specs       |

## Workflow

1. **Scan** the component for typography classes (`text-h1`, `text-h2`, `text-p-*`, `text-caption-*`, etc.)
2. **Identify** the HTML element type (`<h1>`, `<p>`, `<span>`, etc.)
3. **Check** if the element has a default style applied
4. **Remove** redundant classes if the element inherits the correct style
5. **Replace** old classes with new Figma-based classes using the mapping above
6. **Keep** intentional overrides where a different style is needed

## Legacy Classes (Commented Out)

The following old typography classes are commented out in `tailwind.css` (lines 19-131) and should be migrated:

- `text-h1` (old responsive version)
- `text-h2` (old responsive version)
- `text-p-large`
- `text-p-small`
- `text-display-l`
- `text-body-l`
- `text-paragraph`
- `text-caption-regular`
- `text-caption-uppercase`
- `text-caption` (old responsive version)
