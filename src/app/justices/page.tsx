"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JusticeImage } from "@/components/JusticeImage";

interface Justice {
  id: number;
  name: string;
  href?: string;
  thumbnail?: { href: string };
  decades?: number[];
}

const FALLBACK_JUSTICES: Justice[] = [
  { id: 1, name: "John Roberts", decades: [2005, 2010, 2020] },
  { id: 2, name: "Clarence Thomas", decades: [1990, 2000, 2010, 2020] },
  { id: 3, name: "Samuel Alito", decades: [2005, 2010, 2020] },
  { id: 4, name: "Sonia Sotomayor", decades: [2009, 2010, 2020] },
  { id: 5, name: "Elena Kagan", decades: [2010, 2020] },
  { id: 6, name: "Neil Gorsuch", decades: [2017, 2020] },
  { id: 7, name: "Brett Kavanaugh", decades: [2018, 2020] },
  { id: 8, name: "Amy Coney Barrett", decades: [2020] },
  { id: 9, name: "Ketanji Brown Jackson", decades: [2022] },
];

export default function JusticesPage() {
  const [justices, setJustices] = useState<Justice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/justices")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.people ?? [];
        setJustices(list.length > 0 ? list : FALLBACK_JUSTICES);
      })
      .catch(() => setJustices(FALLBACK_JUSTICES))
      .finally(() => setLoading(false));
  }, []);

  const currentJustices = justices.filter((j) =>
    j.decades?.some((d: number) => d >= 2020)
  );
  const formerJustices = justices.filter(
    (j) => !j.decades?.some((d: number) => d >= 2020)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Supreme Court Justices
        </h1>
        <p className="mt-2 text-ink/70">
          Biographies of current and former Supreme Court justices. View tenure,
          notable opinions, and court composition by era.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-lg bg-ink/10" />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {currentJustices.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-ink border-b-2 border-gold/50 pb-2">
                Current Justices
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentJustices.map((j) => (
                  <Link
                    key={j.id}
                    href={`/justices/${j.id}`}
                    className="group rounded-lg border-2 border-ink/10 bg-white p-4 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
                  >
                    <JusticeImage justiceId={j.id} name={j.name} size="sm" className="w-full" />
                    <h3 className="mt-2 font-serif font-semibold text-ink group-hover:text-seal">
                      {j.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {formerJustices.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-ink border-b-2 border-gold/50 pb-2">
              Former Justices
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {formerJustices.map((j) => (
                <Link
                  key={j.id}
                  href={`/justices/${j.id}`}
                  className="group rounded-lg border-2 border-ink/10 bg-white p-4 shadow-sm transition-all hover:border-gold/50 hover:shadow-md"
                >
                    <JusticeImage justiceId={j.id} name={j.name} size="sm" className="w-full" />
                    <h3 className="mt-2 font-serif font-semibold text-ink group-hover:text-seal">
                      {j.name}
                    </h3>
                </Link>
              ))}
            </div>
          </section>
          )}
        </div>
      )}
    </div>
  );
}
