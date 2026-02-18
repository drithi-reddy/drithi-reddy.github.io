"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { followCase, unfollowCase, isCaseFollowed } from "@/lib/followed-cases";

interface CaseDetail {
  ID: number;
  name: string;
  docket_number: string;
  term: string;
  citation: { volume: string; page: string; year: string } | null;
  facts_of_the_case?: string;
  question?: string;
  conclusion?: string;
  majority_vote?: number;
  minority_vote?: number;
  timeline?: Array<{ event: string }>;
  justia_url?: string;
}

export default function CaseDetailPage({
  params,
}: {
  params: { term: string; docket: string };
}) {
  const { term, docket } = params;
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  const caseId = `${term}-${docket}`;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cases/${term}/${docket}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) setCaseData(null);
        else setCaseData(data);
      })
      .catch(() => setCaseData(null))
      .finally(() => setLoading(false));
  }, [term, docket]);

  useEffect(() => {
    setFollowed(isCaseFollowed(caseId));
  }, [caseId]);

  const handleFollow = () => {
    const next = !followed;
    setFollowed(next);
    if (next) followCase(caseId);
    else unfollowCase(caseId);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-lg bg-ink/10" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-ink/70">Case not found.</p>
        <Link href="/cases" className="mt-4 inline-block text-gold hover:underline">
          ← Back to Cases
        </Link>
      </div>
    );
  }

  const citeStr = caseData.citation
    ? `${caseData.citation.volume} U.S. ${caseData.citation.page ?? "—"} (${caseData.citation.year})`
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/cases"
        className="text-sm text-gold hover:underline mb-6 inline-block"
      >
        ← Back to Cases
      </Link>

      <div className="rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
              {caseData.name}
            </h1>
            {citeStr && (
              <p className="mt-1 text-ink/70 font-mono text-sm">{citeStr}</p>
            )}
            <p className="mt-1 text-sm text-ink/50">
              Docket No. {caseData.docket_number} • {caseData.term} Term
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFollow}
              className="flex items-center gap-2 rounded-lg border-2 border-ink/20 px-4 py-2 text-sm font-medium hover:bg-gold/10 hover:border-gold/50 transition-colors"
            >
              {followed ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-gold fill-gold" />
                  Following
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Follow Case
                </>
              )}
            </button>
            {caseData.justia_url && (
              <a
                href={caseData.justia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border-2 border-ink/20 px-4 py-2 text-sm font-medium hover:bg-ink/5 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Justia
              </a>
            )}
          </div>
        </div>

        {caseData.majority_vote != null && (
          <div className="mt-6 rounded-lg bg-ink/5 p-4">
            <p className="text-sm font-medium text-ink/70">Vote</p>
            <p className="font-semibold">
              {caseData.majority_vote}–{caseData.minority_vote ?? "?"} in favor
            </p>
          </div>
        )}

        {/* Plain-language summary */}
        {(caseData.conclusion || caseData.facts_of_the_case) && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-ink border-b border-gold/30 pb-2">
              In Plain English
            </h2>
            <p className="mt-3 text-ink/90 leading-relaxed">
              {caseData.conclusion || caseData.facts_of_the_case}
            </p>
          </section>
        )}

        {caseData.facts_of_the_case && caseData.conclusion && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-ink">Facts</h2>
            <p className="mt-2 text-ink/80 leading-relaxed">
              {caseData.facts_of_the_case}
            </p>
          </section>
        )}

        {caseData.question && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-ink">Question</h2>
            <p className="mt-2 text-ink/80 leading-relaxed">
              {caseData.question}
            </p>
          </section>
        )}

        {caseData.timeline && caseData.timeline.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-ink">Timeline</h2>
            <ul className="mt-2 space-y-1">
              {caseData.timeline.map((t, i) => (
                <li key={i} className="text-ink/80">
                  {t.event}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
