import Link from "next/link";
import { LEGAL_TOPICS } from "@/types";

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Legal Topics &amp; Doctrines
        </h1>
        <p className="mt-2 text-ink/70">
          Browse Supreme Court cases by legal doctrine. Each topic links to
          landmark cases and key holdings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEGAL_TOPICS.map((topic) => (
          <Link
            key={topic}
            href={`/topics/${encodeURIComponent(topic)}`}
            className="rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
          >
            <h2 className="font-serif text-lg font-semibold text-ink hover:text-seal">
              {topic}
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Explore cases involving {topic.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
