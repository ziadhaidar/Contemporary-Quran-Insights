// src/services/tanzil.ts
export type VerseObj = { id: number; text: string };

export type Chapter = {
  number: number;    // surah number
  name: string;      // surah name in Arabic
  verses: VerseObj[]; // now objects, not raw strings
};

export async function fetchQuran(): Promise<Chapter[]> {
  const res = await fetch(
    'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json'
  );
  if (!res.ok) throw new Error('Cannot load Quran JSON from CDN');
  return (await res.json()) as Chapter[];
}
