import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from opralvin_site.lead_contract import LeadError, create_lead, handle_request, origin_allowed, validate_payload


VALID = {
    "name": "Asha",
    "phone": "+919876543210",
    "email": "asha@example.com",
    "company": "Sample Traders",
    "consent": True,
    "utm_source": "google",
    "landing_page": "/process-audit",
    "assessment_score": 12,
    "calculator_result": {"hours": 40},
}


class LeadContractTests(unittest.TestCase):
    def test_accepts_a_complete_payload(self) -> None:
        fields = validate_payload(VALID)
        self.assertEqual(fields["lead_name"], "Asha")
        self.assertEqual(fields["mobile_no"], "+919876543210")
        self.assertTrue(fields["custom_consent"])
        self.assertEqual(fields["custom_utm_source"], "google")
        self.assertEqual(fields["custom_assessment_score"], 12)
        self.assertEqual(fields["custom_calculator_result"]["hours"], 40)

    def test_rejects_missing_consent(self) -> None:
        data = dict(VALID)
        data["consent"] = False
        with self.assertRaises(LeadError) as caught:
            validate_payload(data)
        self.assertEqual(caught.exception.code, "consent")

    def test_rejects_honeypot(self) -> None:
        data = dict(VALID)
        data["company_website"] = "http://spam.example"
        with self.assertRaises(LeadError) as caught:
            validate_payload(data)
        self.assertEqual(caught.exception.code, "honeypot")

    def test_rejects_bad_phone(self) -> None:
        data = dict(VALID)
        data["phone"] = "9876543210"
        with self.assertRaises(LeadError) as caught:
            validate_payload(data)
        self.assertEqual(caught.exception.code, "phone")

    def test_origin_allow_list(self) -> None:
        self.assertTrue(origin_allowed("https://opralvin.example", "https://opralvin.example"))
        self.assertFalse(origin_allowed("https://evil.example", "https://opralvin.example"))

    def test_create_lead_uses_insert(self) -> None:
        seen = {}

        def insert(doctype: str, fields: dict) -> str:
            seen["doctype"] = doctype
            seen["fields"] = fields
            return "CRM-LEAD-0001"

        name = create_lead(insert, VALID)
        self.assertEqual(name, "CRM-LEAD-0001")
        self.assertEqual(seen["doctype"], "CRM Lead")
        self.assertEqual(seen["fields"]["email_id"], "asha@example.com")

    def test_handle_request_matches_the_web_route_shape(self) -> None:
        seen = {}

        def insert(doctype: str, fields: dict) -> str:
            seen["doctype"] = doctype
            return "CRM-LEAD-0002"

        body = {
            "origin": "https://opralvin.example",
            "allow_list": "https://opralvin.example",
            "payload": VALID,
        }
        name = handle_request(body["origin"], body["allow_list"], body["payload"], insert)
        self.assertEqual(name, "CRM-LEAD-0002")
        self.assertEqual(seen["doctype"], "CRM Lead")

    def test_handle_request_rejects_a_foreign_origin(self) -> None:
        with self.assertRaises(LeadError) as caught:
            handle_request("https://evil.example", "https://opralvin.example", VALID, lambda *_: "x")
        self.assertEqual(caught.exception.code, "origin")


if __name__ == "__main__":
    unittest.main()
