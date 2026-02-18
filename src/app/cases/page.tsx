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

const RECENT_TERMS = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

export default function CasesPage() {
  const [cases, setCases] = useState<OyezCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [termFilter, setTermFilter] = useState("");

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const allCases: OyezCase[] = [];
      const casesPerTerm = 10;

      for (const term of RECENT_TERMS) {
        const params = new URLSearchParams();
        params.set("term", term);
        params.set("per_page", String(casesPerTerm));
        const res = await fetch(`/api/cases?${params}`);
        const data = await res.json();
        const list = Array.isArray(data) && data && !("error" in data) ? data : [];
        allCases.push(...list);
      }

      setCases(allCases.slice(0, 100));
    } catch {
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const filtered = termFilter
    ? cases.filter((c) => c.term === termFilter)
    : cases;
  const fuse = new Fuse(filtered, {
    keys: ["name", "docket_number", "citation.volume", "citation.page", "citation.year"],
    threshold: 0.4,
  });
  const searched = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : filtered;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Supreme Court Cases
        </h1>
        <p className="mt-2 text-ink/70">
          Search and explore 100 of the most recent cases from the last 10 years.
          Follow cases on the current docket to track their progress.
        </p>
      </div>

      <div className="mb-8">
        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          termFilter={termFilter}
          onTermChange={setTermFilter}
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
            {searched.length} case{searched.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searched.map((c) => (
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
