'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ArenaSelectorProps {
  currentArena: string;
}

const arenas = [
  { id: 'text', name: 'Text Generation' },
  { id: 'svg', name: 'SVG Generation' },
  { id: 'twigl', name: 'Twigl.app Code' },
  { id: 'music', name: 'Music Generation' },
];

const ArenaSelector = ({ currentArena }: ArenaSelectorProps) => {
  const pathname = usePathname();
  
  // Determine if we're on the arena page or leaderboard page
  const isArenaPage = pathname.startsWith('/arena');
  const isLeaderboardPage = pathname.startsWith('/leaderboard');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-medium mb-3">Select Arena</h2>
      <div className="flex flex-wrap gap-2">
        {arenas.map((arena) => (
          <Link
            key={arena.id}
            href={isArenaPage ? `/arena/${arena.id}` : isLeaderboardPage ? `/leaderboard?arenaType=${arena.id}` : `/arena/${arena.id}`}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentArena === arena.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {arena.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArenaSelector;