"use client";

import { useEffect, useState, useCallback } from "react";
import Fuse from "fuse.js";
import { CaseCard } from "@/components/CaseCard";
import { SearchFilters } from "@/components/SearchFilters";

interface OyezCase {
  ID: number;
  name: string;
  docket_number: string;
  term: string;
  citation: { volume: string; page: string; year: string } | null;
}

export default function HomePage() {
  const [cases, setCases] = useState<OyezCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [termFilter, setTermFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("per_page", "100");
      if (termFilter) params.set("term", termFilter);
      const res = await fetch(`/api/cases?${params}`);
      const data = await res.json();
      setCases(Array.isArray(data) && !data.error ? data : []);
    } catch {
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, [termFilter]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const fuse = new Fuse(cases, {
    keys: ["name", "docket_number", "citation.volume", "citation.page", "citation.year"],
    threshold: 0.4,
  });

  const filtered = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : cases;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Supreme Court Cases
        </h1>
        <p className="mt-2 text-ink/70">
          Search and explore thousands of Supreme Court decisions. Follow cases on
          the current docket to track their progress.
        </p>
      </div>

      <div className="mb-8">
        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          termFilter={termFilter}
          onTermChange={setTermFilter}
          topicFilter={topicFilter}
          onTopicChange={setTopicFilter}
        />
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg bg-ink/10"
            />
          ))}
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink/60">
            {filtered.length} case{filtered.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
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
        </>
      )}
    </div>
  );
}
