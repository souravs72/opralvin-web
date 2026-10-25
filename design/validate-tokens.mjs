import Ajv from "ajv/dist/2020.js";
import { readFileSync } from "node:fs";

const schema = JSON.parse(readFileSync(new URL("./tokens.schema.json", import.meta.url), "utf8"));
const data = JSON.parse(readFileSync(new URL("./tokens.json", import.meta.url), "utf8"));
const ajv = new Ajv({ allErrors: true, strict: true });
const valid = ajv.validate(schema, data);
if (!valid) {
  console.error(JSON.stringify(ajv.errors, null, 2));
  process.exit(1);
}
const light = Object.keys(data.color.light).sort().join(",");
const dark = Object.keys(data.color.dark).sort().join(",");
if (light !== dark) {
  console.error("theme keys differ", light, dark);
  process.exit(1);
}
console.log("tokens.json valid against tokens.schema.json");
