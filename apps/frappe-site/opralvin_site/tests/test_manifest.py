import unittest
from pathlib import Path

APP = Path(__file__).resolve().parents[1]
ROOT = APP.parent


class ManifestTests(unittest.TestCase):
    def test_install_files_exist(self) -> None:
        for path in (
            ROOT / "pyproject.toml",
            APP / "hooks.py",
            APP / "modules.txt",
            APP / "patches.txt",
            APP / "lead_contract.py",
            APP / "api" / "lead.py",
            APP / "fixtures" / "custom_field.json",
        ):
            self.assertTrue(path.is_file(), path)

    def test_hooks_name_the_app(self) -> None:
        text = (APP / "hooks.py").read_text(encoding="utf-8")
        self.assertIn('app_name = "opralvin_site"', text)
        self.assertIn('required_apps = ["crm"]', text)

    def test_pyproject_names_the_app(self) -> None:
        text = (ROOT / "pyproject.toml").read_text(encoding="utf-8")
        self.assertIn('name = "opralvin_site"', text)


if __name__ == "__main__":
    unittest.main()
