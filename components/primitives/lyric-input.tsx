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
      // Validate but DO NOT blur — keeps the viewport from jumping
      validateAnswer()
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
        setTimeout(() => {
          // keep correct state; do not change focus
        }, 300)
      } else {
        setTimeout(() => {
          setState("idle")
        }, 1500)
      }
    }, 800)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // NOTE:
  // - Removed previous fixed text sizes (text-lg/md/lg).
  // - Forced compact font size with important so it overrides any UI lib defaults.
  // - Compact width/height so lines fit on mobile.
  const getInputStyles = () => {
    const baseStyles =
      [
        "inline-flex",
        "w-24", "md:w-28", "lg:w-32",
        "h-8", "md:h-9", "lg:h-10",
        "rounded-xl",
        "!text-[0.7rem]", "md:!text-[0.85rem]", "lg:!text-[1rem]",
        "font-black",
        "uppercase",
        "border-none",
        "transition-all", "duration-300",
        "relative", "overflow-hidden",
        "text-center",
      ].join(" ")

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
  )
}
