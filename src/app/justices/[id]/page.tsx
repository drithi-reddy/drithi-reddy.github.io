"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JusticeImage } from "@/components/JusticeImage";

interface JusticeDetail {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  href?: string;
  thumbnail?: { href: string };
  biography?: string;
  nicknames?: string[];
  positions?: Array<{ title: string; court?: { name: string }; date_start: string }>;
}

const FALLBACK_JUSTICE_DETAILS: Record<number, JusticeDetail> = {
  1: { id: 1, name: "John Roberts", biography: "John Glover Roberts Jr. is the 17th and current chief justice of the United States. He was nominated by President George W. Bush and took his seat on September 29, 2005.", positions: [{ title: "Chief Justice", court: { name: "Supreme Court of the United States" }, date_start: "2005" }] },
  2: { id: 2, name: "Clarence Thomas", biography: "Clarence Thomas is an associate justice of the Supreme Court. He was nominated by President George H. W. Bush and took his seat on October 23, 1991.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "1991" }] },
  3: { id: 3, name: "Samuel Alito", biography: "Samuel Anthony Alito Jr. is an associate justice of the Supreme Court. He was nominated by President George W. Bush and took his seat on January 31, 2006.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2006" }] },
  4: { id: 4, name: "Sonia Sotomayor", biography: "Sonia Maria Sotomayor is an associate justice of the Supreme Court. She was nominated by President Barack Obama and took her seat on August 8, 2009.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2009" }] },
  5: { id: 5, name: "Elena Kagan", biography: "Elena Kagan is an associate justice of the Supreme Court. She was nominated by President Barack Obama and took her seat on August 7, 2010.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2010" }] },
  6: { id: 6, name: "Neil Gorsuch", biography: "Neil Gorsuch is an associate justice of the Supreme Court. He was nominated by President Donald Trump and took his seat on April 10, 2017.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2017" }] },
  7: { id: 7, name: "Brett Kavanaugh", biography: "Brett Kavanaugh is an associate justice of the Supreme Court. He was nominated by President Donald Trump and took his seat on October 6, 2018.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2018" }] },
  8: { id: 8, name: "Amy Coney Barrett", biography: "Amy Coney Barrett is an associate justice of the Supreme Court. She was nominated by President Donald Trump and took her seat on October 27, 2020.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2020" }] },
  9: { id: 9, name: "Ketanji Brown Jackson", biography: "Ketanji Brown Jackson is an associate justice of the Supreme Court. She was nominated by President Joe Biden and took her seat on June 30, 2022.", positions: [{ title: "Associate Justice", court: { name: "Supreme Court of the United States" }, date_start: "2022" }] },
};

export default function JusticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [justice, setJustice] = useState<JusticeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallback = FALLBACK_JUSTICE_DETAILS[parseInt(id, 10)];
    fetch(`/api/justices/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) setJustice(fallback ?? null);
        else setJustice(data);
      })
      .catch(() => setJustice(fallback ?? null))
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
          <JusticeImage
            justiceId={justice.id}
            name={justice.name}
            size="md"
            className="shrink-0"
          />
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
