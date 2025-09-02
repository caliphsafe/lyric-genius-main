import { ProgressBar } from "@/components/primitives/progress-bar"
import { AudioControls } from "@/components/primitives/audio-controls"

interface AudioPlayerProps {
  currentTime: string
  totalTime: string
  progress: number
  isPlaying: boolean
  onPrevious: () => void
  onPlayPause: () => void
  onNext: () => void
  onSeek: (progress: number) => void
  albumTitle: string
  artist: string
  albumArt: string
}


export function AudioPlayer({
  currentTime,
  totalTime,
  progress,
  isPlaying,
  onPrevious,
  onPlayPause,
  onNext,
  onSeek,
  albumTitle,
  artist,
  albumArt,
}: AudioPlayerProps) {

  return (
    <div className="space-y-4">
  {/* Mini song card */}
  <div className="flex items-center gap-3 min-w-0">
    <img
      src={albumArt}
      alt={`${albumTitle} cover`}
      className="w-12 h-12 rounded-md border border-black/10 object-cover"
    />
    <div className="min-w-0">
      <p className="text-sm font-bold truncate">{albumTitle}</p>
      <p className="text-xs text-black/70 truncate">{artist}</p>
    </div>
  </div>

  <ProgressBar
    currentTime={currentTime}
    totalTime={totalTime}
    progress={progress}
    onSeek={onSeek}
  />
  <AudioControls
    onPrevious={onPrevious}
    onPlayPause={onPlayPause}
    onNext={onNext}
    isPlaying={isPlaying}
  />
</div>

  )
}
