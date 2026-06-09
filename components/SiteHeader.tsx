import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        <span className="brand-mark__dot" />
        Monika AI Prototype
      </Link>

      <nav className="site-nav" aria-label="Primary">
        <Link href="/login">Demo Access</Link>
        <Link href="/patient">Patient</Link>
        <Link href="/doctor">Doctor</Link>
        <Link href="/trrf">TRRF</Link>
      </nav>
    </header>
  );
}

