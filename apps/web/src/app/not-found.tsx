import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="text-[34px] leading-tight sm:text-[56px]">This page is not in the books</h1>
      <p className="mt-8 max-w-prose">The address does not match a page we publish. The home page and the audit form still do.</p>
      <p className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="underline">
          Home
        </Link>
        <Link href="/process-audit" className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink">
          Book a free process audit
        </Link>
      </p>
    </main>
  );
}
