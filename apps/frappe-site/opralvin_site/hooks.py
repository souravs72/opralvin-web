app_name = "opralvin_site"
app_title = "Opralvin Site"
app_publisher = "Opralvin Technologies"
app_description = "Marketing lead API. Internal."
app_email = "owner@placeholder.invalid"
app_license = "mit"
required_apps = ["crm"]

export_python_type_annotations = True

fixtures = [
    {
        "dt": "Custom Field",
        "filters": [["module", "=", "Opralvin Site"]],
    }
]
