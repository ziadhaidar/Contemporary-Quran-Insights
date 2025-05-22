import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkPlus, MessageSquarePlus, Check, Play, Info } from 'lucide-react';
import { cn } from '../utils/cn';
import { mockQuranData } from '../data/mockQuranData';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function Reader() {
  const { surahId = '1', ayahId = '1' } = useParams();
  const [selectedSurah, setSelectedSurah] = useState(surahId);
  const [selectedAyah, setSelectedAyah] = useState(ayahId);
  const [insightOpen, setInsightOpen] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const navigate = useNavigate();

  const currentSurah = mockQuranData.surahs.find(s => s.id === selectedSurah);
  const currentAyah = currentSurah?.ayahs.find(a => a.id === selectedAyah);

  useEffect(() => {
    setSelectedSurah(surahId);
    setSelectedAyah(ayahId);
  }, [surahId, ayahId]);

  const handleAyahClick = (surahId: string, ayahId: string) => {
    navigate(`/reader/${surahId}/${ayahId}`);
    setInsightOpen(true);
  };

  const toggleInsightPanel = () => {
    setInsightOpen(!insightOpen);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const toggleReviewed = () => {
    setReviewed(!reviewed);
  };

  const handlePrevAyah = () => {
    const prevAyahId = String(Math.max(1, parseInt(selectedAyah) - 1));
    navigate(`/reader/${selectedSurah}/${prevAyahId}`);
  };

  const handleNextAyah = () => {
    const nextAyahId = String(Math.min(
      currentSurah?.ayahs.length || 1,
      parseInt(selectedAyah) + 1
    ));
    navigate(`/reader/${selectedSurah}/${nextAyahId}`);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      {/* Breadcrumbs */}
      <div className="w-full mb-4">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: `Surah ${currentSurah?.name}`, path: `/reader/${selectedSurah}` },
            { label: `Ayah ${selectedAyah}`, path: `/reader/${selectedSurah}/${selectedAyah}` },
          ]}
        />
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-14rem)]">
        {/* Left pane - Mushaf */}
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-900">
              {currentSurah?.name} ({currentSurah?.transliteration})
            </h2>
            <button
              onClick={toggleInsightPanel}
              className="md:hidden btn btn-outline flex items-center gap-1 text-sm"
            >
              <Info className="h-4 w-4" />
              {insightOpen ? 'Hide Insights' : 'Show Insights'}
            </button>
          </div>

          <div className="arabic-text text-right" dir="rtl">
            {currentSurah?.ayahs.map((ayah) => (
              <p 
                key={ayah.id}
                onClick={() => handleAyahClick(selectedSurah, ayah.id)}
                className={cn(
                  'py-2 px-1 my-1 rounded-md cursor-pointer transition-colors hover:bg-primary-50',
                  ayah.id === selectedAyah ? 'bg-primary-100 hover:bg-primary-100' : ''
                )}
              >
                {ayah.text} <span className="inline-block rounded-full bg-primary-200 text-primary-900 w-6 h-6 text-center leading-6 text-sm">{ayah.id}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Right pane - Insight Panel */}
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out bg-neutral-50 rounded-lg shadow-md p-4 md:p-6 overflow-y-auto",
            insightOpen ? "block" : "hidden md:block md:w-0 md:p-0 md:opacity-0",
            insightOpen ? "md:w-2/5 lg:w-1/3" : ""
          )}
        >
          {insightOpen && currentAyah && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-primary-900">Insight</h2>
                <button
                  onClick={toggleInsightPanel}
                  className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  aria-label="Close insight panel"
                >
                  <ChevronRight className="h-5 w-5 text-neutral-700" />
                </button>
              </div>

              <div className="mb-6">
                <div className="arabic-text mb-3">
                  {currentAyah.text}
                </div>
                <p className="text-neutral-700 italic">
                  "{currentAyah.translation}"
                </p>
                <div className="text-xs text-neutral-500 mt-1">
                  {currentSurah?.name} ({currentSurah?.transliteration}), Ayah {currentAyah.id}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg text-primary-800">Summary</h3>
                <ul className="space-y-2 list-disc pl-5">
                  {currentAyah.insights.summary.map((point, index) => (
                    <li key={index} className="text-neutral-700">{point}</li>
                  ))}
                </ul>
                
                <div className="mt-2">
                  <button className="text-sm text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1">
                    Read full explanation <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {currentAyah.insights.videoUrl && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-primary-800 mb-3">Video Explanation</h3>
                  <div className="bg-neutral-200 rounded-lg aspect-video flex items-center justify-center">
                    <button className="btn btn-primary flex items-center gap-2">
                      <Play className="h-4 w-4" /> Watch Video
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-lg text-primary-800 mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {currentAyah.insights.topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg text-primary-800 mb-3">Related Ayahs</h3>
                <div className="space-y-2">
                  {currentAyah.insights.relatedAyahs.map((related, index) => (
                    <button 
                      key={index}
                      onClick={() => handleAyahClick(related.surahId, related.ayahId)}
                      className="block w-full text-left p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
                    >
                      <div className="text-neutral-600 text-sm">
                        Surah {related.surahName} ({related.surahId}), Ayah {related.ayahId}
                      </div>
                      <div className="text-neutral-900 mt-1 text-sm line-clamp-2">
                        {related.excerpt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                <button 
                  onClick={toggleBookmark} 
                  className={cn(
                    "btn flex items-center gap-1",
                    bookmarked ? "btn-primary" : "btn-outline"
                  )}
                >
                  {bookmarked ? (
                    <>
                      <Bookmark className="h-4 w-4" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="h-4 w-4" />
                      Bookmark
                    </>
                  )}
                </button>

                <button className="btn btn-outline flex items-center gap-1">
                  <MessageSquarePlus className="h-4 w-4" />
                  Add Note
                </button>

                <button 
                  onClick={toggleReviewed} 
                  className={cn(
                    "btn flex items-center gap-1",
                    reviewed ? "bg-success-500 text-white hover:bg-success-600" : "btn-outline"
                  )}
                >
                  <Check className="h-4 w-4" />
                  {reviewed ? "Reviewed" : "Mark Reviewed"}
                </button>
              </div>

              <div className="flex justify-between mt-8">
                <button 
                  onClick={handlePrevAyah}
                  disabled={selectedAyah === '1'}
                  className={cn(
                    "btn btn-outline flex items-center gap-1",
                    selectedAyah === '1' ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button 
                  onClick={handleNextAyah}
                  disabled={selectedAyah === String(currentSurah?.ayahs.length)}
                  className={cn(
                    "btn btn-outline flex items-center gap-1",
                    selectedAyah === String(currentSurah?.ayahs.length) ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}