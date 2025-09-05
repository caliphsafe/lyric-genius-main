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
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = state === "focused" && !!clue

  const handleFocus = () => {
    setState("focused")
    onFocus?.()
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
      // DO NOT blur on Enter — prevents jumping
    }
  }

  const validateAnswer = () => {
    if (state === "checking" || state === "correct") return

    setState("checking")

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // Simulate loading animation duration
    timeoutRef.current = setTimeout(() => {
      const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase()
      setState(isCorrect ? "correct" : "incorrect")

      if (isCorrect) {
        // keep "correct" state; keep input enabled if you want to allow edits:
        // setTimeout(() => setState("focused"), 300)
      } else {
        setTimeout(() => {
          setState("idle")
        }, 1500)
      }
    }, 800)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getInputStyles = () => {
    const base =
      "inline-flex w-32 h-10 rounded-xl text-lg md:text-xl lg:text-2xl font-black uppercase border-none transition-all duration-300 relative overflow-hidden text-center"
    switch (state) {
      case "checking":
        return `${base} text-white`
      case "correct":
        return `${base} text-white animate-scale-success`
      case "incorrect":
        return `${base} text-white`
      case "focused":
        return `${base} text-black placeholder:text-gray-600`
      default:
        return `${base} text-black placeholder:text-gray-600`
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
      {/* Inline tooltip: centered over this input, never intercepts taps/clicks */}
      {showTooltip && (
        <div
          className="
            pointer-events-none absolute left-1/2 -translate-x-1/2
            bottom-[calc(100%+8px)] z-[100]
          "
          style={{ maxWidth: "min(92vw, 420px)" }}
        >
          <div
            className="rounded-lg px-3 py-2 text-xs font-medium"
            style={{
              background: "#fff",
              color: "#111",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          >
            {clue}
          </div>
        </div>
      )}

      <div className="relative overflow-visible">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`${getInputStyles()} focus-anchor ${className} ${state === "correct" ? "!opacity-100" : ""}`}
          style={getBackgroundStyle()}
          placeholder={placeholder}
          // Keep inputs editable at all times. If you want to lock when correct, uncomment:
          // disabled={state === "checking" || state === "correct"}
        />

        {/* Loading animation overlay */}
        {state === "checking" && (
          <div
            className="absolute inset-0 rounded-xl animate-fill-progress pointer-events-none"
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
