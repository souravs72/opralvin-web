"""Pure lead validation. Importable without Frappe."""

from __future__ import annotations

import re
from typing import Any

PHONE_RE = re.compile(r"^\+91[6-9]\d{9}$")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
ALLOWED_ORIGINS_ENV = "OPRALVIN_ALLOWED_ORIGINS"

REQUIRED = ("name", "phone", "email", "company", "consent")


class LeadError(ValueError):
    def __init__(self, code: str, message: str) -> None:
        super().__init__(message)
        self.code = code
        self.message = message


def validate_payload(data: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise LeadError("shape", "Payload must be an object.")

    honeypot = str(data.get("company_website") or "").strip()
    if honeypot:
        raise LeadError("honeypot", "Rejected.")

    missing = [key for key in REQUIRED if data.get(key) in (None, "")]
    if missing:
        raise LeadError("missing", "Missing: " + ", ".join(missing))

    consent = data.get("consent")
    if consent is not True:
        raise LeadError("consent", "Consent is required for contacting you about a process audit.")

    phone = str(data["phone"]).strip()
    if not PHONE_RE.match(phone):
        raise LeadError("phone", "Phone must be +91 and a 10-digit mobile number.")

    email = str(data["email"]).strip().lower()
    if not EMAIL_RE.match(email):
        raise LeadError("email", "Email is not usable.")

    name = str(data["name"]).strip()
    company = str(data["company"]).strip()
    if len(name) < 2 or len(company) < 2:
        raise LeadError("name", "Name and company are required.")

    return {
        "lead_name": name,
        "mobile_no": phone,
        "email_id": email,
        "company_name": company,
        "custom_utm_source": str(data.get("utm_source") or "").strip(),
        "custom_utm_medium": str(data.get("utm_medium") or "").strip(),
        "custom_utm_campaign": str(data.get("utm_campaign") or "").strip(),
        "custom_landing_page": str(data.get("landing_page") or "").strip(),
        "custom_segment": str(data.get("segment") or "").strip(),
        "custom_assessment_score": data.get("assessment_score"),
        "custom_calculator_result": data.get("calculator_result"),
        "custom_consent": True,
        "custom_consent_purpose": "Contact about a process audit.",
        "source": "Website",
    }


def origin_allowed(origin: str, allow_list: str) -> bool:
    allowed = [item.strip() for item in allow_list.split(",") if item.strip()]
    return origin in allowed


def create_lead(insert, payload: dict[str, Any]) -> str:
    """insert(doctype, fields) -> name. The caller supplies the Frappe insert."""
    fields = validate_payload(payload)
    return insert("CRM Lead", fields)


def handle_request(origin: str, allow_list: str, payload: dict[str, Any], insert) -> str:
    if not origin_allowed(origin, allow_list):
        raise LeadError("origin", "Origin is not allow-listed.")
    return create_lead(insert, payload)
