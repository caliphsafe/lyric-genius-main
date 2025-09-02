"use client"

interface GameHeaderProps {
  activeClue?: string
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
    <div
      className="w-full bg-white text-black font-bold text-xs md:text-sm py-3 border-2 border-black text-center"
      style={{ borderRadius: "12px" }}
    >
      {activeClue || "GUESS THE MISSING LYRICS & WIN A PRIZE"}
    </div>
  </div>
)
}
