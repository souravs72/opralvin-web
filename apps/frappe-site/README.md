# opralvin_site

Internal Frappe app for marketing leads. Not a customer-facing product name.

Install only on a site the owner names. Do not install on a client site listed in `docs/TODO_FROM_OWNER.md`. Live install is pending `FRAPPE_URL`, `FRAPPE_API_KEY`, and `FRAPPE_API_SECRET`.

Tests in this folder run without a bench:

```
python3 -m unittest discover -s opralvin_site/tests -v
```
