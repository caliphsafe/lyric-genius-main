"use client"

import { AlbumCard } from "@/components/patterns/album-card"

interface GameHeaderProps {
  albumTitle: string
  artist: string
  duration: string
  albumArt: string
}

export function GameHeader({ albumTitle, artist, duration, albumArt }: GameHeaderProps) {
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
        GUESS THE MISSING LYRICS & WIN A PRIZE
      </div>
    </div>
  )
}
