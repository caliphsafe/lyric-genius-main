// LyricInput.tsx
"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"

interface LyricInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  correctAnswer: string
  clue?: string
  onFocus?: () => void
  onBlur?: () => void
}

type InputState = "idle" | "focused" | "checking" | "correct" | "incorrect"

export function LyricInput({
  value,
  onChange,
  placeholder = "",
  className = "",
  correctAnswer,
  clue = "Think about the context...",
  onFocus,
  onBlur,
}: LyricInputProps) {
  const [state, setState] = useState<InputState>("idle")
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; bottom: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const computeTooltip = () => {
    if (!inputRef.current || typeof window === "undefined") return
    const rect = inputRef.current.getBoundingClientRect()
    const vw = window.innerWidth
    const pad = 8
    const maxWidth = Math.min(vw - pad * 2, 448)
    const center = rect.left + rect.width / 2
    const clampedCenter = Math.max(pad + maxWidth / 2, Math.min(vw - pad - maxWidth / 2, center))
    const bottom = Math.max(8, window.innerHeight - rect.top + 8)
    setTooltipPos({ left: clampedCenter, bottom })
  }

  const handleFocus = () => {
    setState("focused")
    setShowTooltip(true)
    computeTooltip()
    onFocus?.()
  }

  const handleBlur = () => {
    onBlur?.()
    setShowTooltip(false)
    if (value.trim() && state !== "correct") {
      validateAnswer()
    } else if (!value.trim()) {
      setState("idle")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      validateAnswer()
    }
  }

  const validateAnswer = () => {
    if (state === "checking" || state === "correct") return
    setState("checking")
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase()
      setState(isCorrect ? "correct" : "incorrect")
      if (isCorrect) {
        setShowTooltip(false)
      } else {
        setShowTooltip(true)
        setTimeout(() => setState("idle"), 1500)
      }
    }, 800)
  }

  useEffect(() => {
    if (!showTooltip) return
    const handler = () => computeTooltip()
    computeTooltip()
    window.addEventListener("scroll", handler, true)
    window.addEventListener("resize", handler)
    const vv = (window as any).visualViewport as VisualViewport | undefined
    vv?.addEventListener("resize", handler)
    vv?.addEventListener("scroll", handler)
    return () => {
      window.removeEventListener("scroll", handler, true)
      window.removeEventListener("resize", handler)
      vv?.removeEventListener("resize", handler)
      vv?.removeEventListener("scroll", handler)
    }
  }, [showTooltip])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getInputStyles = () => {
    // No "!" so iOS override can win with 16px and prevent zoom
    const baseStyles =
      "inline-flex w-32 h-10 rounded-xl text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] leading-tight " +
      "font-black uppercase border-none transition-all duration-300 relative overflow-hidden text-center"

    switch (state) {
      case "checking":
        return `${baseStyles} text-white animate-pulse`
      case "correct":
        return `${baseStyles} text-white animate-scale-success`
      case "incorrect":
        return `${baseStyles} text-white`
      case "focused":
        return `${baseStyles} text-black placeholder:text-gray-600`
      default:
        return `${baseStyles} text-black placeholder:text-gray-600`
    }
  }

  const getBackgroundStyle = () => {
    switch (state) {
      case "checking":
        return { background: "rgba(0, 0, 0, 0.06)", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.12)" }
      case "correct":
        return { background: "#37DB00", boxShadow: "0 0 0 1px #37DB00" }
      case "incorrect":
        return { background: "#FF4043", boxShadow: "0 0 0 1px #FF4043" }
      case "focused":
        return { background: "#FFFFFF", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.12)" }
      default:
        return { background: "rgba(0, 0, 0, 0.06)", boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.12)" }
    }
  }

  return (
    <div className="relative inline-block ml-1 overflow-visible">
      <div className="relative overflow-visible">
        {showTooltip && tooltipPos && (
          <div
            className="fixed pointer-events-none z-50"
            style={{ left: tooltipPos.left, bottom: tooltipPos.bottom, transform: "translateX(-50%)" }}
          >
            <div
              className="rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap"
              style={{
                background: "#fff",
                color: "#111",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "min(90vw, 28rem)",
              }}
            >
              {clue}
            </div>
          </div>
        )}

        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${getInputStyles()} ios-no-zoom focus-anchor ${className} ${state === "correct" ? "!opacity-100" : ""}`}
          style={getBackgroundStyle()}
          placeholder={placeholder}
          disabled={state === "checking" || state === "correct"}
        />

        {state === "checking" && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl animate-fill-progress"
            style={{
              background: `linear-gradient(90deg, #37DB00 0%, #37DB00 var(--progress, 0%), transparent var(--progress, 0%))`,
              animation: "fillProgress 0.8s ease-out forwards",
            }}
          />
        )}
      </div>
    </div>
  )
}
