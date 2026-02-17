# SCOTUS Encyclopedia

An interactive encyclopedia for the Supreme Court of the United States. Explore cases, opinions, precedents, justice biographies, overrulings, and the current docket—with plain-language summaries for everyone.

## Features

- **Search & filters** — Search by case name, citation, justice, term, topic, and outcome
- **Current docket** — Track cases on the current term, follow cases you care about
- **Timeline views** — Browse cases and justices by decade/era
- **Relationship graphs** — Precedent chains, overrulings, justice voting alignments
- **Topic browsing** — First Amendment, Commerce Clause, Equal Protection, and more
- **Plain-language summaries** — "In plain English" explanations alongside legal text
- **Justice biographies** — Current and former justices with tenure information

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Oyez API** for case and justice data
- **Fuse.js** for fuzzy search
- **Recharts** for relationship visualizations

## Data Sources

Case data is fetched from the [Oyez API](https://api.oyez.org). Docket following is stored locally in your browser (localStorage).
