"use client"

import { AlbumCard } from "@/components/patterns/album-card"

export const DEFAULT_BANNER = "GUESS THE MISSING LYRICS & WIN A PRIZE"

interface GameHeaderProps {
  albumTitle: string
  artist: string
  duration: string
  albumArt: string
  // NEW: when set, replaces the banner text while the user is guessing
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
    <div className="space-y-6">
      <AlbumCard
        title={albumTitle}
        artist={artist}
        duration={duration}
        albumArt={albumArt}
        altText={`${albumTitle} album cover`}
      />

      <div
        className="w-full bg-white text-black font-bold text-sm py-4 border-2 border-black text-center"
        style={{ borderRadius: "12px" }}
      >
        {activeClue ?? DEFAULT_BANNER}
      </div>
    </div>
  )
}
