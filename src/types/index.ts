export interface CaseCitation {
  volume: string;
  page: string;
  year: string;
  formatted?: string;
}

export interface CaseTimelineEvent {
  event: string;
  dates: number[];
  href?: string;
}

export interface OyezCase {
  ID: number;
  name: string;
  href: string;
  docket_number: string;
  term: string;
  timeline: CaseTimelineEvent[];
  citation: CaseCitation | null;
  question?: string | null;
  description?: string | null;
  justia_url?: string;
}

export interface Justice {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  href: string;
  thumbnail?: string;
  appointment: { href: string };
  term_start: number;
  term_end?: number;
}

export interface CaseDetail extends OyezCase {
  facts_of_the_case?: string;
  question?: string;
  conclusion?: string;
  majority_vote?: number;
  minority_vote?: number;
  written_opinion?: { href: string };
  oral_argument_mp3?: string;
  court?: { name: string };
  parties?: Array<{ name: string }>;
}

export type CaseStatus = 'granted' | 'argued' | 'decided' | 'pending';

export const LEGAL_TOPICS = [
  'First Amendment',
  'Commerce Clause',
  'Equal Protection',
  'Due Process',
  'Free Speech',
  'Search and Seizure',
  'Criminal Procedure',
  'Federalism',
  'Executive Power',
  'Judicial Power',
  'Privacy',
  'Voting Rights',
  'Immigration',
  'Employment',
] as const;

export type LegalTopic = (typeof LEGAL_TOPICS)[number];
