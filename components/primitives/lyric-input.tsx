"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"
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
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipTop, setTooltipTop] = useState<number | null>(null)

  const updateTooltipPosition = () => {
    if (!inputRef.current) return
    const rect = inputRef.current.getBoundingClientRect()
    const h = tooltipRef.current?.offsetHeight ?? 40
    const margin = 8
    // Place tooltip just above the input (vertical), but horizontally centered on viewport
    const top = window.scrollY + rect.top - h - margin
    setTooltipTop(top)
  }

  const handleFocus = () => {
    setState("focused")
    onFocus?.()
    // First calculation right away
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
      // Validate but DO NOT blur — prevents scroll jump on mobile
      validateAnswer()
      // inputRef.current?.blur()
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
        setTimeout(() => {
          // keep "correct"
        }, 300)
      } else {
        setTimeout(() => setState("idle"), 1500)
      }
    }, 800)
  }

  // Keep tooltip synced with scroll/resize/keyboard (visualViewport)
  useEffect(() => {
    if (state !== "focused") return

    const onMove = () => updateTooltipPosition()
    const vv = (typeof window !== "undefined" && (window as any).visualViewport) as VisualViewport | undefined

    // Use capture to catch inner scroll containers too
    window.addEventListener("scroll", onMove, true)
    window.addEventListener("resize", onMove)
    vv?.addEventListener("resize", onMove)
    vv?.addEventListener("scroll", onMove)

    // Recalculate after first paint so tooltipRef has dimensions
    const id = window.setTimeout(onMove, 0)

    return () => {
      window.removeEventListener("scroll", onMove, true)
      window.removeEventListener("resize", onMove)
      vv?.removeEventListener("resize", onMove)
      vv?.removeEventListener("scroll", onMove)
      window.clearTimeout(id)
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
        return `${baseStyles} text-white animate-fill-left-to-right animate-pulse`
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
      {/* Tooltip via portal: horizontally centered (50vw), vertically sits above this input */}
      {state === "focused" && clue && tooltipTop !== null &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-none fixed z-[60] w-max max-w-[min(85vw,320px)] left-1/2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm animate-tooltip-in"
            style={{
              top: tooltipTop,
              boxShadow: "0 1px 0 rgba(0,0,0,0.1), 0 6px 14px rgba(0,0,0,0.08)",
            }}
          >
            {clue}
            {/* caret pointing DOWN, centered under tooltip */}
            <span
              className="absolute left-1/2 top-full -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #ffffff",
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

          {/* Loading animation overlay */}
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
