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
  /** NEW: turn off the inline tooltip (we’ll show the clue under the logo) */
  disableTooltip?: boolean
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
  disableTooltip = false, // NEW
}: LyricInputProps) {
  const [state, setState] = useState<InputState>("idle")
  const [showTooltip, setShowTooltip] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleFocus = () => {
    setState("focused")
    if (!disableTooltip) setShowTooltip(true)
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
    if (e.key === "Enter" && value.trim()) validateAnswer()
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
        if (!disableTooltip) setShowTooltip(true)
        setTimeout(() => setState("idle"), 1500)
      }
    }, 800)
  }

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), [])

  const baseStyles =
    "inline-flex w-32 h-10 rounded-xl text-lg md:text-xl lg:text-2xl font-black uppercase border-none transition-all duration-300 relative overflow-hidden text-center"
  const getInputStyles = () =>
    state === "checking" ? `${baseStyles} text-white animate-pulse`
    : state === "correct" ? `${baseStyles} text-white animate-scale-success`
    : state === "incorrect" ? `${baseStyles} text-white`
    : `${baseStyles} text-black placeholder:text-gray-600`

  const styleByState =
    state === "checking" ? { background: "rgba(0,0,0,0.06)", boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }
    : state === "correct" ? { background: "#37DB00", boxShadow: "0 0 0 1px #37DB00" }
    : state === "incorrect" ? { background: "#FF4043", boxShadow: "0 0 0 1px #FF4043" }
    : state === "focused" ? { background: "#FFFFFF", boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }
    : { background: "rgba(0,0,0,0.06)", boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }

  return (
    <div className="relative inline-block ml-1 pl-2 overflow-visible">
      <div className="relative overflow-visible">
        {/* Inline tooltip is disabled via prop */}
        {!disableTooltip && showTooltip && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none z-20">
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
          style={styleByState}
          placeholder={placeholder}
          disabled={state === "checking" || state === "correct"}
        />

        {state === "checking" && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl animate-fill-progress"
            style={{
              background:
                "linear-gradient(90deg, #37DB00 0%, #37DB00 var(--progress, 0%), transparent var(--progress, 0%))",
              animation: "fillProgress 0.8s ease-out forwards",
            }}
          />
        )}
      </div>
    </div>
  )
}
