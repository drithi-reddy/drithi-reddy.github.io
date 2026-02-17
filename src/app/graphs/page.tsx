"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample overruling data (famous overrulings)
const OVERRULINGS = [
  { overruled: "Plessy v. Ferguson (1896)", by: "Brown v. Board (1954)", year: 1954 },
  { overruled: "Lochner v. New York (1905)", by: "West Coast Hotel (1937)", year: 1937 },
  { overruled: "Roe v. Wade (1973)", by: "Dobbs v. Jackson (2022)", year: 2022 },
  { overruled: "Baker v. Carr (1962)", by: "Rucho v. Common Cause (2019)", year: 2019 },
  { overruled: "Miranda (1966) (limited)", by: "Dickerson (2000)", year: 2000 },
];

// Sample precedent chain (simplified)
const PRECEDENT_CHAIN = [
  { from: "Marbury v. Madison", to: "Judicial Review", year: 1803 },
  { from: "McCulloch v. Maryland", to: "Federal Supremacy", year: 1819 },
  { from: "Brown v. Board", to: "Equal Protection", year: 1954 },
  { from: "Miranda v. Arizona", to: "Right to Counsel", year: 1966 },
  { from: "Roe v. Wade", to: "Privacy (overturned)", year: 1973 },
];

// Sample justice alignment (votes per term - illustrative)
const VOTE_DATA = [
  { term: "2018", conservative: 5, liberal: 4 },
  { term: "2019", conservative: 5, liberal: 4 },
  { term: "2020", conservative: 6, liberal: 3 },
  { term: "2021", conservative: 6, liberal: 3 },
  { term: "2022", conservative: 6, liberal: 3 },
];

const COLORS = {
  conservative: "#9b2226",
  liberal: "#1d3557",
};

export default function GraphsPage() {
  const [activeTab, setActiveTab] = useState<"overrulings" | "precedents" | "alignments">("overrulings");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Relationship Graphs
        </h1>
        <p className="mt-2 text-ink/70">
          Precedent chains, overrulings, and justice voting alignments.
          Visualizations are illustrative; full data integration coming soon.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {(["overrulings", "precedents", "alignments"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-seal text-white"
                : "bg-ink/10 text-ink hover:bg-ink/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-lg border-2 border-ink/10 bg-white p-6 shadow-sm">
        {activeTab === "overrulings" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">
              Notable Overrulings
            </h2>
            <div className="space-y-4">
              {OVERRULINGS.map((o, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border border-ink/10 p-4"
                >
                  <span className="text-ink/70 line-through">{o.overruled}</span>
                  <span className="text-ink/50 hidden sm:inline">→</span>
                  <span className="font-medium text-seal">{o.by}</span>
                  <span className="text-sm text-ink/50">({o.year})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "precedents" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">
              Precedent Chains (Landmark Cases)
            </h2>
            <div className="space-y-4">
              {PRECEDENT_CHAIN.map((p, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border border-ink/10 p-4"
                >
                  <span className="font-medium text-ink">{p.from}</span>
                  <span className="text-ink/50 hidden sm:inline">→</span>
                  <span className="text-gold">{p.to}</span>
                  <span className="text-sm text-ink/50">({p.year})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "alignments" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">
              Ideological Composition (Illustrative)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VOTE_DATA} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" domain={[0, 9]} />
                  <YAxis type="category" dataKey="term" width={50} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="conservative" fill={COLORS.conservative} name="Conservative votes" stackId="a" />
                  <Bar dataKey="liberal" fill={COLORS.liberal} name="Liberal votes" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
