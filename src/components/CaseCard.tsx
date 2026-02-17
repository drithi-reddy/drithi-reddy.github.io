"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { followCase, unfollowCase, isCaseFollowed } from "@/lib/followed-cases";
import { useState } from "react";

interface CaseCardProps {
  id: string;
  name: string;
  citation?: { volume: string; page: string; year: string } | null;
  term: string;
  docket: string;
}

export function CaseCard({ id, name, citation, term, docket }: CaseCardProps) {
  const [followed, setFollowed] = useState(isCaseFollowed(id));

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFollowed((prev) => {
      const next = !prev;
      if (next) followCase(id);
      else unfollowCase(id);
      return next;
    });
  };

  const citeStr = citation
    ? `${citation.volume} U.S. ${citation.page} (${citation.year})`
    : "—";

  return (
    <Link
      href={`/cases/${term}/${docket}`}
      className="block rounded-lg border-2 border-ink/10 bg-white p-4 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold text-ink line-clamp-2">
            {name}
          </h3>
          <p className="mt-1 text-sm text-ink/70">{citeStr}</p>
          <p className="mt-0.5 text-xs text-ink/50">Term: {term}</p>
        </div>
        <button
          onClick={handleFollow}
          className="shrink-0 rounded p-1.5 text-ink/50 hover:bg-gold/20 hover:text-gold transition-colors"
          title={followed ? "Unfollow case" : "Follow case"}
        >
          {followed ? (
            <BookmarkCheck className="h-5 w-5 text-gold fill-gold" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>
    </Link>
  );
}
