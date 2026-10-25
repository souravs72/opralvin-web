import json

from opralvin_site.lead_contract import handle_request


def _insert(doctype: str, fields: dict) -> str:
    import frappe

    doc = frappe.get_doc({"doctype": doctype, **fields})
    doc.insert(ignore_permissions=False)
    return doc.name


def capture_lead(origin: str, allow_list: str, payload) -> dict:
    if isinstance(payload, str):
        payload = json.loads(payload)
    name = handle_request(origin, allow_list, payload, _insert)
    return {"name": name}


try:
    import frappe

    capture_lead = frappe.whitelist(allow_guest=False)(capture_lead)
except ImportError:
    pass
