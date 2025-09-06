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
    const pad = 8 // viewport padding so tooltip never touches screen edge
    const maxWidth = Math.min(vw - pad * 2, 448) // 28rem cap from your tooltip style

    // center over the input, but clamp so the tooltip stays fully on-screen
    const center = rect.left + rect.width / 2
    const clampedCenter = Math.max(pad + maxWidth / 2, Math.min(vw - pad - maxWidth / 2, center))

    // place tooltip just above the input (no need to know its height when using bottom)
    const bottom = Math.max(8, window.innerHeight - rect.top + 8)

    setTooltipPos({ left: clampedCenter, bottom })
  }

  const handleFocus = () => {
    setState("focused")
    setShowTooltip(true)
    // position immediately on focus
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
      // Validate but DO NOT blur — keeps the viewport from jumping
      validateAnswer()
      // inputRef.current?.blur()  // intentionally not blurring
    }
  }

  const validateAnswer = () => {
    if (state === "checking" || state === "correct") return

    setState("checking")

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase()
      setState(isCorrect ? "correct" : "incorrect")

      if (isCorrect) {
        setShowTooltip(false)
        setTimeout(() => {
          // keep correct state; do not change focus
        }, 300)
      } else {
        // keep tooltip visible to help the user retry
        setShowTooltip(true)
        setTimeout(() => {
          setState("idle")
        }, 1500)
      }
    }, 800)
  }

  // keep tooltip aligned while it's visible (scroll/resize/keyboard)
  useEffect(() => {
    if (!showTooltip) return
    computeTooltip()

    const handler = () => computeTooltip()
    window.addEventListener("scroll", handler, true) // capture to catch container scrolls
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
    // only rebind while visible
  }, [showTooltip])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getInputStyles = () => {
    const baseStyles =
      "inline-flex w-32 h-10 rounded-xl text-lg md:text-xl lg:text-2xl font-black uppercase border-none transition-all duration-300 relative overflow-hidden text-center"

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
        {/* Tooltip: single-line, centered above input, clamped to viewport (prevents left-edge cutoff on mobile) */}
        {showTooltip && tooltipPos && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: tooltipPos.left,
              bottom: tooltipPos.bottom,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap"
              style={{
                background: "#fff",
                color: "#111",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
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
          className={`${getInputStyles()} focus-anchor ${className} ${state === "correct" ? "!opacity-100" : ""}`}
          style={getBackgroundStyle()}
          placeholder={placeholder}
          disabled={state === "checking" || state === "correct"}
        />

        {/* Loading animation overlay — does not block input */}
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
