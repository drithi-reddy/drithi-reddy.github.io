const STORAGE_KEY = 'scotus-followed-cases';

export function getFollowedCaseIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isCaseFollowed(caseId: string): boolean {
  return getFollowedCaseIds().includes(caseId);
}

export function followCase(caseId: string): void {
  const ids = getFollowedCaseIds();
  if (!ids.includes(caseId)) {
    ids.push(caseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

export function unfollowCase(caseId: string): void {
  const ids = getFollowedCaseIds().filter((id) => id !== caseId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function toggleFollow(caseId: string): boolean {
  const ids = getFollowedCaseIds();
  const idx = ids.indexOf(caseId);
  if (idx >= 0) {
    ids.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return false;
  } else {
    ids.push(caseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  }
}
