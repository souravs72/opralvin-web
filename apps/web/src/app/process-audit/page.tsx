export default function ProcessAuditPage() {
  const booking = process.env.NEXT_PUBLIC_BOOKING_LINK ?? "{{BOOKING_LINK}}";
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="text-4xl">Book a free process audit</h1>
      <p className="mt-7">
        The audit is a written look at how the firm invoices, stocks, and files. It does not include a build, a data
        move, or a price.
      </p>
      <p className="mt-7 text-sm text-muted">
        The booking link is {booking}. It stays a placeholder until the owner supplies one.
      </p>
    </main>
  );
}
