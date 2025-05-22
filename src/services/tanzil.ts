// src/services/tanzil.ts
export type Chapter = {
  number: number;
  name: string;
  verses: string[];
};

export async function fetchQuran(): Promise<Chapter[]> {
  const res = await fetch(
    'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json'
  );
  if (!res.ok) throw new Error('Cannot load Quran JSON from CDN');
  return (await res.json()) as Chapter[];
}
