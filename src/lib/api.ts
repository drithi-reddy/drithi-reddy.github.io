const OYEZ_BASE = 'https://api.oyez.org';

export async function fetchCases(params?: {
  term?: string;
  page?: number;
  per_page?: number;
}): Promise<any[]> {
  const search = new URLSearchParams();
  if (params?.term) search.set('filter', `term:${params.term}`);
  if (params?.per_page) search.set('per_page', String(params.per_page));
  if (params?.page) search.set('page', String(params.page));

  const url = `${OYEZ_BASE}/cases${search.toString() ? '?' + search : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch cases');
  return res.json();
}

export async function fetchCaseDetail(term: string, docket: string): Promise<any> {
  const res = await fetch(`${OYEZ_BASE}/cases/${term}/${docket}`);
  if (!res.ok) throw new Error('Case not found');
  return res.json();
}

export async function fetchJustices(): Promise<any[]> {
  const res = await fetch(`${OYEZ_BASE}/people?person_type=scotus_justice`);
  if (!res.ok) throw new Error('Failed to fetch justices');
  const data = await res.json();
  return data;
}

export async function fetchCurrentTermCases(): Promise<any[]> {
  const currentTerm = new Date().getFullYear();
  return fetchCases({ term: String(currentTerm), per_page: 50 });
}
