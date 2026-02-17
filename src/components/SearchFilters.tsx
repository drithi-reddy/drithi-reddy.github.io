"use client";

import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
  query: string;
  onQueryChange: (q: string) => void;
  termFilter: string;
  onTermChange: (t: string) => void;
  topicFilter: string;
  onTopicChange: (t: string) => void;
}

const TERMS = Array.from({ length: 20 }, (_, i) => String(2024 - i));
const TOPICS = [
  "All Topics",
  "First Amendment",
  "Commerce Clause",
  "Equal Protection",
  "Due Process",
  "Free Speech",
  "Search and Seizure",
  "Criminal Procedure",
  "Federalism",
  "Privacy",
  "Voting Rights",
];

export function SearchFilters({
  query,
  onQueryChange,
  termFilter,
  onTermChange,
  topicFilter,
  onTopicChange,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/50" />
        <input
          type="search"
          placeholder="Search by case name or citation (e.g., Brown v. Board)"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded-lg border-2 border-ink/10 bg-white py-3 pl-10 pr-4 text-ink placeholder:text-ink/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-ink/60" />
        <select
          value={termFilter}
          onChange={(e) => onTermChange(e.target.value)}
          className="rounded-lg border-2 border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none"
        >
          <option value="">All Terms</option>
          {TERMS.map((t) => (
            <option key={t} value={t}>
              {t} Term
            </option>
          ))}
        </select>
        <select
          value={topicFilter}
          onChange={(e) => onTopicChange(e.target.value)}
          className="rounded-lg border-2 border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t === "All Topics" ? "" : t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
