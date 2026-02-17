"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OyezCase {
  ID: number;
  name: string;
  docket_number: string;
  term: string;
  citation: { volume: string; page: string; year: string } | null;
}

export default function TimelinePage() {
  const [casesByTerm, setCasesByTerm] = useState<Record<string, OyezCase[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDecade, setSelectedDecade] = useState("1960");

  useEffect(() => {
    const terms = ["1960", "1970", "1980", "1990", "2000", "2010", "2020"];
    Promise.all(
      terms.map((t) =>
        fetch(`/api/cases?term=${t}&per_page=20`).then((r) => r.json())
      )
    )
      .then((results) => {
        const byTerm: Record<string, OyezCase[]> = {};
        terms.forEach((t, i) => {
          byTerm[t] = Array.isArray(results[i]) ? results[i] : [];
        });
        setCasesByTerm(byTerm);
      })
      .catch(() => setCasesByTerm({}))
      .finally(() => setLoading(false));
  }, []);

  const decades = Object.keys(casesByTerm).sort((a, b) => Number(b) - Number(a));
  const idx = decades.indexOf(selectedDecade);
  const prevDecade = idx < decades.length - 1 ? decades[idx + 1] : null;
  const nextDecade = idx > 0 ? decades[idx - 1] : null;
  const cases = casesByTerm[selectedDecade] || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Timeline
        </h1>
        <p className="mt-2 text-ink/70">
          Explore Supreme Court cases and justices by era. Navigate through
          decades to see landmark decisions.
        </p>
      </div>

      <div className="mb-8 flex items-center justify-between rounded-lg border-2 border-ink/10 bg-white p-4">
        <button
          onClick={() => prevDecade && setSelectedDecade(prevDecade)}
          disabled={!prevDecade}
          className="flex items-center gap-1 rounded-lg px-4 py-2 font-medium disabled:opacity-40 hover:bg-ink/5 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          {prevDecade ? `${prevDecade}s` : "—"}
        </button>
        <h2 className="text-xl font-semibold text-ink">
          {selectedDecade}s Term
        </h2>
        <button
          onClick={() => nextDecade && setSelectedDecade(nextDecade)}
          disabled={!nextDecade}
          className="flex items-center gap-1 rounded-lg px-4 py-2 font-medium disabled:opacity-40 hover:bg-ink/5 transition-colors"
        >
          {nextDecade ? `${nextDecade}s` : "—"}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {decades.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDecade(d)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedDecade === d
                ? "bg-seal text-white"
                : "bg-ink/10 text-ink hover:bg-ink/20"
            }`}
          >
            {d}s
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-ink/10" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.ID}
              href={`/cases/${c.term}/${c.docket_number}`}
              className="rounded-lg border-2 border-ink/10 bg-white p-4 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
            >
              <h3 className="font-serif font-semibold text-ink line-clamp-2">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-ink/70">
                {c.citation
                  ? `${c.citation.volume} U.S. ${c.citation.page} (${c.citation.year})`
                  : c.term}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
