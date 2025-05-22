import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuran, Chapter } from '../services/tanzil';

export function Reader() {
  const { surahId, ayahId } = useParams<{ surahId?: string; ayahId?: string }>();
  const navigate = useNavigate();
  const [quran, setQuran] = useState<Chapter[] | null>(null);
  const [current, setCurrent] = useState({ chapter: 1, aya: 1 });

  // Load Quran once
  useEffect(() => {
    fetchQuran()
      .then(setQuran)
      .catch(console.error);
  }, []);

  // Sync URL params → state
  useEffect(() => {
    if (quran) {
      const chap = parseInt(surahId || '1', 10);
      const aya = parseInt(ayahId || '1', 10);
      setCurrent({ chapter: chap, aya });
    }
  }, [surahId, ayahId, quran]);

  if (!quran) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        جاري التحميل…
      </div>
    );
  }

  const chapterData = quran.find((c) => c.chapter === current.chapter)!;
  const verses = chapterData.verses;

  // When user clicks, update both state and URL
  const handleClickAya = (ayaNum: number) => {
    setCurrent({ chapter: chapterData.chapter, aya: ayaNum });
    navigate(`/reader/${chapterData.chapter}/${ayaNum}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Pane: Mushaf */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {verses.map((ayaText, idx) => {
          const ayaNum = idx + 1;
          const isSelected =
            current.chapter === chapterData.chapter && current.aya === ayaNum;
          return (
            <p
              key={ayaNum}
              className={`text-2xl mb-6 leading-snug cursor-pointer ${
                isSelected ? 'bg-yellow-100 rounded-lg p-2' : ''
              }`}
              onClick={() => handleClickAya(ayaNum)}
            >
              <span className="mr-2 text-gray-500">﴿{ayaNum}﴾</span>
              <span className="font-mushaf">{ayaText}</span>
            </p>
          );
        })}
      </div>

      {/* Right Pane: Insight Panel */}
      <div className="w-1/3 border-l p-6 flex flex-col">
        <h2 className="text-2xl mb-4">
          سُورَة {chapterData.chapter}، آية {current.aya}
        </h2>
        {/* TODO: Hook up to Supabase for real summary */}
        <div className="flex-1">
          <p className="mb-4">— ملخص التفسير هنا —</p>
          <div className="mb-4">
            <div className="bg-gray-200 h-40 flex items-center justify-center rounded">
              لا يوجد فيديو بعد
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">الآيات ذات الصلة:</h3>
            <ul className="list-disc list-inside text-sm text-blue-600">
              <li>سورة 2:117</li>
              <li>سورة 3:64</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 space-x-2">
          <button className="px-4 py-2 border rounded">حفظ</button>
          <button className="px-4 py-2 border rounded">ملاحظة</button>
        </div>
      </div>
    </div>
  );
}
