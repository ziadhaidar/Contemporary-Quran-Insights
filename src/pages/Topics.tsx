import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { mockTopicsData } from '../data/mockTopicsData';

export function Topics() {
  const navigate = useNavigate();

  const handleTopicClick = (topicId: string) => {
    navigate(`/search?topic=${topicId}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Topics', path: '/topics' },
        ]}
      />
      
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Topics</h1>
        <p className="text-neutral-700 mb-6">
          Explore the Qur'ān by themes and topics to understand its guidance on various aspects of life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockTopicsData.map((topic) => (
          <div
            key={topic.id}
            onClick={() => handleTopicClick(topic.id)}
            className="card group hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
          >
            <div 
              className="h-32 bg-cover bg-center"
              style={{ backgroundImage: `url(${topic.imageUrl})` }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent to-primary-900/70 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{topic.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-neutral-700 text-sm line-clamp-2">{topic.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-500">{topic.ayahCount} āyāt</span>
                <span className="text-primary-600 text-sm font-medium group-hover:underline">
                  Explore
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}