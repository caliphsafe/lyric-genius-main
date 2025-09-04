"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

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
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Tooltip positioning
  const tipRef = useRef<HTMLDivElement>(null)
  const [tipTop, setTipTop] = useState<number | null>(null)
  const [tipLeft, setTipLeft] = useState<number | null>(null)
  const [arrowLeft, setArrowLeft] = useState<number>(0)
  const [placeBelow, setPlaceBelow] = useState(false)

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

  const updateTooltipPosition = () => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()

    // Tooltip size (fallbacks before it renders)
    const tipW = tipRef.current?.offsetWidth ?? 260
    const tipH = tipRef.current?.offsetHeight ?? 40

    const margin = 8
    const viewportW = window.innerWidth
    const inputCenterX = rect.left + rect.width / 2

    // Center over input, clamp inside viewport
    const desiredLeft = inputCenterX - tipW / 2
    const clampedLeft = clamp(desiredLeft, margin, viewportW - tipW - margin)

    // Arrow position within tooltip box
    const arrowX = clamp(inputCenterX - clampedLeft, 10, tipW - 10)

    // Prefer above; flip below if not enough room
    const aboveTop = rect.top - tipH - margin
    const belowTop = rect.bottom + margin
    const canPlaceAbove = aboveTop >= margin

    setPlaceBelow(!canPlaceAbove)
    setTipTop(canPlaceAbove ? aboveTop : belowTop)
    setTipLeft(clampedLeft)
    setArrowLeft(arrowX)
  }

  const handleFocus = () => {
    setState("focused")
    onFocus?.()
    updateTooltipPosition()
  }

  const handleBlur = () => {
    onBlur?.()
    if (value.trim() && state !== "correct") {
      validateAnswer()
    } else if (!value.trim()) {
      setState("idle")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      validateAnswer()
      // Do NOT blur on Enter — prevents jump
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
        setTimeout(() => {}, 300)
      } else {
        setTimeout(() => setState("idle"), 1500)
      }
    }, 800)
  }

  // Recalculate after tooltip mounts (to get real width/height)
  useLayoutEffect(() => {
    if (state !== "focused") return
    const id = requestAnimationFrame(updateTooltipPosition)
    return () => cancelAnimationFrame(id)
  }, [state, clue])

  // Keep synced on scroll/resize/orientation changes
  useEffect(() => {
    if (state !== "focused") return
    const onMove = () => updateTooltipPosition()

    // Use capture on scroll so we reflow before painting
    window.addEventListener("scroll", onMove, true)
    window.addEventListener("resize", onMove)
    window.addEventListener("orientationchange", onMove)
    return () => {
      window.removeEventListener("scroll", onMove, true)
      window.removeEventListener("resize", onMove)
      window.removeEventListener("orientationchange", onMove)
    }
  }, [state])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
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
    <>
      {/* Tooltip (portal) */}
      {state === "focused" && clue && tipTop !== null && tipLeft !== null &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            className="pointer-events-none fixed z-[70] w-max max-w-[min(85vw,360px)] rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm animate-tooltip-in"
            style={{
              top: tipTop,
              left: tipLeft,
              boxShadow: "0 1px 0 rgba(0,0,0,0.1), 0 6px 14px rgba(0,0,0,0.08)",
            }}
          >
            {clue}
            <span
              className="absolute"
              style={{
                left: arrowLeft,
                transform: "translateX(-50%)",
                ...(placeBelow
                  ? {
                      bottom: "100%",
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderBottom: "6px solid #ffffff",
                    }
                  : {
                      top: "100%",
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #ffffff",
                    }),
              }}
            />
          </div>,
          document.body
        )
      }

      <div className="relative inline-block ml-1 overflow-visible">
        <div className="relative overflow-visible">
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

          {state === "checking" && (
            <div
              className="absolute inset-0 rounded-xl animate-fill-progress"
              style={{
                background: `linear-gradient(90deg, #37DB00 0%, #37DB00 var(--progress, 0%), transparent var(--progress, 0%))`,
                animation: "fillProgress 0.8s ease-out forwards",
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
