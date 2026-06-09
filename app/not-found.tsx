import Link from "next/link";

export default function NotFound() {
  return (
    <main className="stack-xl">
      <section className="card panel-empathy">
        <span className="eyebrow">Page not found</span>
        <h1>This route is not available in the prototype.</h1>
        <p className="hero-copy">
          If you reached this page from a patient detail link, the record may be restricted for that role or the route does
          not exist yet.
        </p>
        <Link href="/" className="button-primary">
          Return to homepage
        </Link>
      </section>
    </main>
  );
}

