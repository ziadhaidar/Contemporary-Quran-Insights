// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="p-8 text-center space-y-6">
      <h1 className="text-4xl font-bold">Qur'ān Companion</h1>
      <p className="text-lg">
        منصة رقمية لتعميق فهمك للقُرْآن عبر شروح معاصرة، وسائط متعددة، وسهولة تصفح.
      </p>
      <div className="space-x-4">
        <Link
          to="/reader"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          افتح المصحف
        </Link>
        <Link
          to="/topics"
          className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
        >
          تصفح الموضوعات
        </Link>
      </div>
    </div>
  );
}
