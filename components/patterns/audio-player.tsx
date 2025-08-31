import { ProgressBar } from "@/components/primitives/progress-bar"
import { AudioControls } from "@/components/primitives/audio-controls"

interface AudioPlayerProps {
  currentTime: string
  totalTime: string
  progress: number
  isPlaying?: boolean
  onPrevious: () => void
  onPlayPause: () => void
  onNext: () => void
  onSeek?: (progress: number) => void // Added seek prop
}

export function AudioPlayer({
  currentTime,
  totalTime,
  progress,
  isPlaying = false,
  onPrevious,
  onPlayPause,
  onNext,
  onSeek,
}: AudioPlayerProps) {
  return (
    <div className="space-y-4">
      <ProgressBar currentTime={currentTime} totalTime={totalTime} progress={progress} onSeek={onSeek} />
      <AudioControls onPrevious={onPrevious} onPlayPause={onPlayPause} onNext={onNext} isPlaying={isPlaying} />
    </div>
  )
}
