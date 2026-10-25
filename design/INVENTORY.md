# Component inventory

The chosen system is Ledger to live. Storybook lives in `packages/ui`. Each control is shown in light and dark, and in the states below.

| Component | States |
|---|---|
| Button | primary, quiet, hover, focus, disabled |
| Field | empty, filled, error, disabled |
| Stamp | posted, illustrative |
| Figure | Indian rupee grouping, tabular figures |
| Rule | the single ledger line |

Hover and focus are real CSS. Stories also force those states with a class so the static build shows them. Copy in the stories is labelled illustrative where a number appears.
