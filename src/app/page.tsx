import Link from "next/link";
import { Scale, BookOpen, Users, Calendar, GitBranch } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-16 text-center">
        <Scale className="mx-auto h-16 w-16 text-gold" />
        <h1 className="mt-4 font-serif text-4xl font-bold text-ink md:text-5xl">
          SCOTUS Encyclopedia
        </h1>
        <p className="mt-4 text-xl text-ink/80">
          Your interactive guide to the Supreme Court of the United States
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 font-serif text-2xl font-bold text-ink">
          A Legal Tool & Research Reference
        </h2>
        <div className="space-y-4 text-ink/90 leading-relaxed">
          <p>
            The SCOTUS Encyclopedia serves as a practical legal tool and reference
            for legal research. Whether you are a law student, practitioner,
            journalist, or simply a citizen seeking to understand the nation&apos;s
            highest court, this site provides structured access to Supreme Court
            cases, opinions, precedents, and justices.
          </p>
          <p>
            Use it to search and filter cases by name, citation, term, or outcome;
            explore the current docket and follow cases as they progress; trace
            precedent chains and overrulings; and read plain-language summaries
            alongside legal text. The goal is to make Supreme Court jurisprudence
            more accessible and navigable for everyone.
          </p>
        </div>
      </section>

      <div className="mb-16 grid gap-6 sm:grid-cols-2">
        <Link
          href="/cases"
          className="flex items-start gap-4 rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
        >
          <BookOpen className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <h3 className="font-serif font-semibold text-ink">Cases</h3>
            <p className="mt-1 text-sm text-ink/70">
              Search 100+ recent cases from the last decade. Filter by term and
              explore full opinions.
            </p>
          </div>
        </Link>
        <Link
          href="/docket"
          className="flex items-start gap-4 rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
        >
          <Calendar className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <h3 className="font-serif font-semibold text-ink">Current Docket</h3>
            <p className="mt-1 text-sm text-ink/70">
              Track cases on the 2025–2026 term. Follow cases to monitor oral
              arguments and decisions.
            </p>
          </div>
        </Link>
        <Link
          href="/justices"
          className="flex items-start gap-4 rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
        >
          <Users className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <h3 className="font-serif font-semibold text-ink">Justices</h3>
            <p className="mt-1 text-sm text-ink/70">
              Biographies of current and former Supreme Court justices.
            </p>
          </div>
        </Link>
        <Link
          href="/graphs"
          className="flex items-start gap-4 rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
        >
          <GitBranch className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <h3 className="font-serif font-semibold text-ink">Relationships</h3>
            <p className="mt-1 text-sm text-ink/70">
              Precedent chains, overrulings, and justice voting alignments.
            </p>
          </div>
        </Link>
      </div>

      <section className="border-t-2 border-ink/10 pt-12">
        <h2 className="mb-4 font-serif text-xl font-bold text-ink">About Me</h2>
        <p className="text-ink/90 leading-relaxed">
          My name is Drithi Reddy, and I am an undergraduate student at the
          University of Texas at Austin, majoring in Government and Business,
          Ethics, & Law. I am also a member of the Liberal Arts Honors (LAH)
          program and the Humanities Honors program.
        </p>
        <div className="mt-4">
          <p className="mb-3 text-sm font-medium text-ink/70">Contact</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/drithi-reddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold/20 hover:border-gold"
            >
              LinkedIn
            </a>
            <a
              href="mailto:drithi.reddy@utexas.edu"
              className="rounded-lg border-2 border-gold bg-gold/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold/20 hover:border-gold"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
