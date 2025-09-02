"use client"

import { AlbumCard } from "@/components/patterns/album-card"

interface GameHeaderProps {
  albumTitle: string
  artist: string
  duration: string
  albumArt: string
  /** NEW: shows clue text in the banner when active */
  activeClue?: string | null
}

export function GameHeader({
  albumTitle,
  artist,
  duration,
  albumArt,
  activeClue,
}: GameHeaderProps) {
  return (
    <div className="space-y-4">
      {/* SCALE DOWN THE SONG CARD ~60% TO PRIORITIZE LYRICS SPACE */}
      <div className="scale-[0.6] md:scale-[0.75] origin-top mx-auto">
        <AlbumCard
          title={albumTitle}
          artist={artist}
          duration={duration}
          albumArt={albumArt}
          altText={`${albumTitle} album cover`}
        />
      </div>

      {/* CLUE / DEFAULT BANNER (unchanged styles except content is dynamic) */}
      <div
        className="w-full bg-white text-black font-bold text-xs md:text-sm py-3 md:py-4 border-2 border-black text-center"
        style={{ borderRadius: "12px" }}
      >
        {activeClue ? activeClue : "GUESS THE MISSING LYRICS & WIN A PRIZE"}
      </div>
    </div>
  )
}
