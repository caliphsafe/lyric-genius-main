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
  const [tooltipBottom, setTooltipBottom] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const scrollParentRef = useRef<HTMLElement | Window | null>(null)

  const focusUpdateTooltip = () => {
    const el = inputRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vvHeight = (window as any).visualViewport?.height ?? window.innerHeight
    // place tooltip just above the input by ~8px, horizontally centered to viewport
    setTooltipBottom(Math.max(8, vvHeight - rect.top + 8))
  }

  const getScrollParent = (el: HTMLElement | null): HTMLElement | Window => {
    let p: HTMLElement | null = el?.parentElement ?? null
    while (p) {
      const s = getComputedStyle(p)
      if (/(auto|scroll)/.test(s.overflowY)) return p
      p = p.parentElement
    }
    return window
  }

  const handleFocus = () => {
    setState("focused")
    // find and listen to the nearest scrollable parent so tooltip follows input while scrolling
    scrollParentRef.current = getScrollParent(inputRef.current)
    focusUpdateTooltip()
    const sp = scrollParentRef.current as any
    sp?.addEventListener?.("scroll", focusUpdateTooltip, { passive: true })
    window.addEventListener("resize", focusUpdateTooltip)
    ;(window as any).visualViewport?.addEventListener("resize", focusUpdateTooltip)
    ;(window as any).visualViewport?.addEventListener("scroll", focusUpdateTooltip)
    onFocus?.()
  }

  const handleBlur = () => {
    onBlur?.()
    if (value.trim() && state !== "correct") {
      validateAnswer()
    } else if (!value.trim()) {
      setState("idle")
    }
    // remove listeners
    const sp = scrollParentRef.current as any
    sp?.removeEventListener?.("scroll", focusUpdateTooltip)
    window.removeEventListener("resize", focusUpdateTooltip)
    ;(window as any).visualViewport?.removeEventListener("resize", focusUpdateTooltip)
    ;(window as any).visualViewport?.removeEventListener("scroll", focusUpdateTooltip)
    setTooltipBottom(null)
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      const sp = scrollParentRef.current as any
      sp?.removeEventListener?.("scroll", focusUpdateTooltip)
      window.removeEventListener("resize", focusUpdateTooltip)
      ;(window as any).visualViewport?.removeEventListener("resize", focusUpdateTooltip)
      ;(window as any).visualViewport?.removeEventListener("scroll", focusUpdateTooltip)
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
    <div className="relative inline-block ml-1 overflow-visible">
      {/* Fixed, centered tooltip: always centered horizontally on the screen,
          and vertically positioned just above the focused input */}
      {state === "focused" && clue && tooltipBottom !== null && (
        <div
          className="pointer-events-none fixed left-1/2 -translate-x-1/2 z-50 w-max max-w-[min(85vw,320px)] rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm animate-tooltip-in"
          style={{
            bottom: tooltipBottom,
            boxShadow: "0 1px 0 rgba(0,0,0,0.1), 0 6px 14px rgba(0,0,0,0.08)",
          }}
        >
          {clue}
        </div>
      )}

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
  )
}
