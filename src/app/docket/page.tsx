"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { BookmarkCheck } from "lucide-react";
import { getFollowedCaseIds } from "@/lib/followed-cases";

interface OyezCase {
  ID: number;
  name: string;
  docket_number: string;
  term: string;
  citation: { volume: string; page: string; year: string } | null;
  timeline?: Array<{ event: string }>;
}

export default function DocketPage() {
  const [cases, setCases] = useState<OyezCase[]>([]);
  const [loading, setLoading] = useState(true);
  const currentTerm = "2025";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cases?term=${currentTerm}&per_page=50`)
      .then((r) => r.json())
      .then((data) => setCases(Array.isArray(data) && data && !("error" in data) ? data : []))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, [currentTerm]);

  const followedIds = getFollowedCaseIds();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Current Docket
        </h1>
        <p className="mt-2 text-ink/70">
          Cases on the {currentTerm}–{Number(currentTerm) + 1} term. Follow cases to track
          oral arguments, decisions, and opinions.
        </p>
      </div>

      {followedIds.length > 0 && (
        <div className="mb-8 rounded-lg border-2 border-gold/30 bg-gold/5 p-4">
          <h2 className="flex items-center gap-2 font-semibold text-ink">
            <BookmarkCheck className="h-5 w-5 text-gold" />
            Your Followed Cases ({followedIds.length})
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            Followed cases appear across the site. Manage them from case pages.
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-ink/10" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <CaseCard
                key={c.ID}
                id={`${c.term}-${c.docket_number}`}
                name={c.name}
                citation={c.citation}
                term={c.term}
                docket={c.docket_number}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
