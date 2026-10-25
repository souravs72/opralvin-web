export function formatInr(amount) {
  const n = Math.round(Number(amount));
  if (Number.isFinite(n) === false) return "₹0";
  const sign = n < 0 ? "-" : "";
  const digits = String(Math.abs(n));
  if (digits.length <= 3) return sign + "₹" + digits;
  const head = digits.slice(0, -3);
  const tail = digits.slice(-3);
  const grouped = head.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return sign + "₹" + grouped + "," + tail;
}
