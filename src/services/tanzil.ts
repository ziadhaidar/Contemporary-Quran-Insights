// src/services/tanzil.ts
export type Chapter = {
  number: number;    // surah number
  name: string;      // surah name in Arabic
  verses: string[];  // Arabic text of each aya
};

export async function fetchQuran(): Promise<Chapter[]> {
  const res = await fetch(
    'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json'
  );
  if (!res.ok) {
    throw new Error('Failed to load Quran Uthmani text from CDN');
  }
  // Response is an array: [{ number:1, name:"الفاتحة", verses:[...], ... }, ...]
  return (await res.json()) as Chapter[];
}
