"use client"

interface AudioControlsProps {
  onPrevious: () => void
  onPlayPause: () => void
  onNext: () => void
  isPlaying?: boolean
}

export function AudioControls({ onPrevious, onPlayPause, onNext, isPlaying = false }: AudioControlsProps) {
  return (
    <div className="flex justify-center items-center gap-8">
      <button onClick={onPrevious} className="text-black hover:text-black/70 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      <button onClick={onPlayPause} className="text-black hover:text-black/70 transition-colors">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>

      <button onClick={onNext} className="text-black hover:text-black/70 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>
  )
}
