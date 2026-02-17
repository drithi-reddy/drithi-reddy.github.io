"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface JusticeDetail {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  href: string;
  thumbnail?: { href: string };
  biography?: string;
  nicknames?: string[];
  positions?: Array<{ title: string; court: { name: string }; date_start: string }>;
}

export default function JusticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [justice, setJustice] = useState<JusticeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/justices/${id}`)
      .then((r) => r.json())
      .then(setJustice)
      .catch(() => setJustice(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-lg bg-ink/10" />
      </div>
    );
  }

  if (!justice) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-ink/70">Justice not found.</p>
        <Link href="/justices" className="mt-4 inline-block text-gold hover:underline">
          ← Back to Justices
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/justices"
        className="text-sm text-gold hover:underline mb-6 inline-block"
      >
        ← Back to Justices
      </Link>

      <div className="rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6">
          {justice.thumbnail?.href ? (
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-lg bg-ink/5">
              <Image
                src={justice.thumbnail.href}
                alt={justice.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-6xl text-ink/30">
              ⚖
            </div>
          )}
          <div>
            <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
              {justice.name}
            </h1>
            {justice.nicknames?.length ? (
              <p className="mt-1 text-ink/60">{justice.nicknames.join(", ")}</p>
            ) : null}
            {justice.positions?.length ? (
              <div className="mt-4 space-y-1">
                {justice.positions.map((p, i) => (
                  <p key={i} className="text-sm text-ink/80">
                    {p.title} — {p.court?.name} ({p.date_start})
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {justice.biography && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-ink border-b border-gold/30 pb-2">
              Biography
            </h2>
            <p className="mt-3 text-ink/90 leading-relaxed whitespace-pre-wrap">
              {justice.biography}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
