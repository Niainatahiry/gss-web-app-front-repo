// components/DebugOverlay.jsx
import { useState, useEffect } from 'react';

function getBreakpoint(width) {
  if (width < 640) return '<sm';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

export default function DebugOverlay() {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const bp = getBreakpoint(dims.w);

  return (
    <div className="fixed top-0 left-0 z-[9999] font-mono text-[11px] pointer-events-none select-none">
      <div className="bg-black/70 text-gray-300 px-2 py-1 backdrop-blur-sm border-b border-r border-white/10">
        <span className="text-cyan-400 font-bold">{dims.w}</span>
        ×
        <span className="text-cyan-400 font-bold">{dims.h}</span>
        <span className="mx-1 text-white/30">|</span>
        <span className={`font-bold ${bp === 'md' ? 'text-green-400' : 'text-orange-400'}`}>
          {bp}
        </span>
      </div>
    </div>
  );
}