// src/services/tanzil.js
export async function fetchQuran() {
  const res = await fetch('https://tanzil.net/trans/13113/json');
  if (!res.ok) throw new Error('Failed to load Quran data');
  return await res.json();
}

