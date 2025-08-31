"use client"

import type React from "react"

interface ProgressBarProps {
  currentTime: string
  totalTime: string
  progress: number // 0-100
  onSeek?: (progress: number) => void // Added seek functionality
}

export function ProgressBar({ currentTime, totalTime, progress, onSeek }: ProgressBarProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newProgress = (clickX / width) * 100
    onSeek(Math.max(0, Math.min(100, newProgress)))
  }

  return (
    <div>
      <div className="w-full bg-black/20 rounded-full h-1 cursor-pointer" onClick={handleClick}>
        <div className="bg-black h-1 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-sm text-black mt-2">
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>
    </div>
  )
}
