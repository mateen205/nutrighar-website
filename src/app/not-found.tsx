import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-ng max-w-lg text-center">
        <p className="script text-4xl text-ng-leaf">404</p>
        <h1 className="mt-3 text-3xl font-bold text-ng-forest">Page not found</h1>
        <p className="body-muted mt-3">
          This page may have moved, or the link might be outdated. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/plans" className="btn-secondary">
            View plans
          </Link>
        </div>
      </div>
    </section>
  );
}
