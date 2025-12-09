import React, { useState } from 'react';

interface AparatPlayerProps {
  videoId: string; // هش ویدیو (مثلاً nnwltfi)
  title: string;
}

const AparatPlayer: React.FC<AparatPlayerProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg group">
      {/* Loading Placeholder / Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 z-10 transition-opacity duration-300">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      )}

      <iframe
        src={`https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allowFullScreen={true}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default AparatPlayer;