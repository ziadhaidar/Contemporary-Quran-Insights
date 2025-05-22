// src/services/tanzil.ts
export type Chapter = {
  chapter: number;
  verses: string[];
};

export async function fetchQuran(): Promise<Chapter[]> {
  const res = await fetch('https://tanzil.net/trans/13113/json');
  if (!res.ok) {
    throw new Error('Failed to load Quran data');
  }
  return (await res.json()) as Chapter[];
}
