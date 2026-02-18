"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";

interface OyezCase {
  ID: number;
  name: string;
  docket_number: string;
  term: string;
  citation: { volume: string; page: string; year: string } | null;
}

export default function TopicPage({
  params,
}: {
  params: { topic: string };
}) {
  const { topic } = params;
  const [cases, setCases] = useState<OyezCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Topic filter would ideally come from case metadata; Oyez may have case_issues
    // For now we fetch recent cases and filter by name matching topic keywords
    const keywords: Record<string, string[]> = {
      "First Amendment": ["first amendment", "free speech", "religion"],
      "Commerce Clause": ["commerce", "interstate"],
      "Equal Protection": ["equal protection", "discrimination"],
      "Due Process": ["due process"],
      "Free Speech": ["speech", "first amendment"],
      "Search and Seizure": ["search", "seizure", "fourth amendment"],
      "Criminal Procedure": ["criminal", "right to counsel", "miranda"],
      Federalism: ["federalism", "state", "federal"],
      "Executive Power": ["executive", "president"],
      "Judicial Power": ["judicial", "jurisdiction"],
      Privacy: ["privacy"],
      "Voting Rights": ["voting", "ballot"],
      Immigration: ["immigration", "deportation"],
      Employment: ["employment", "labor", "worker"],
    };

    const kws = keywords[topic] || [topic.toLowerCase()];

    fetch(`/api/cases?per_page=200`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) && !data.error ? data : [];
        const filtered = list.filter((c) =>
          kws.some((kw) => c.name?.toLowerCase().includes(kw))
        );
        setCases(filtered.slice(0, 50));
      })
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, [topic]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        href="/topics"
        className="text-sm text-gold hover:underline mb-4 inline-block"
      >
        ← Back to Topics
      </Link>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          {topic}
        </h1>
        <p className="mt-2 text-ink/70">
          Cases involving {topic.toLowerCase()} doctrine.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-ink/10" />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
