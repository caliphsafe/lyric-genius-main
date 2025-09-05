"use client"

import type React from "react"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { Input } from "@/components/ui/input"

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Tooltip portal
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null)
  const showTooltip = state === "focused" && !!clue

  const updateTooltipPos = () => {
    const inputEl = inputRef.current
    const tipEl = tooltipRef.current
    if (!inputEl || !tipEl) return

    const rect = inputEl.getBoundingClientRect()
    const pageX = window.scrollX || window.pageXOffset || 0
    const pageY = window.scrollY || window.pageYOffset || 0

    const tipW = tipEl.offsetWidth || tipEl.getBoundingClientRect().width || 0
    const tipH = tipEl.offsetHeight || tipEl.getBoundingClientRect().height || 0

    const gap = 8
    const edgePadding = 8
    const viewportW = document.documentElement.clientWidth || window.innerWidth

    const leftCentered = pageX + (viewportW - tipW) / 2
    const left = Math.round(Math.max(leftCentered, pageX + edgePadding))

    let top = pageY + rect.top - tipH - gap
    top = Math.round(Math.max(top, pageY + 4))

    setTooltipPos({ left, top })
  }

  useEffect(() => {
    if (!showTooltip) return

    const onMove = () => updateTooltipPos()

    window.addEventListener("scroll", onMove, { passive: true })
    window.addEventListener("resize", onMove)

    const el = inputRef.current
    el?.addEventListener("input", onMove)

    const raf = requestAnimationFrame(updateTooltipPos)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onMove)
      window.removeEventListener("resize", onMove)
      el?.removeEventListener("input", onMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTooltip])

  useLayoutEffect(() => {
    if (showTooltip) updateTooltipPos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, showTooltip])

  // Input state handling
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
      // no blur -> avoids jump
    }
  }

  const validateAnswer = () => {
    if (state === "checking" || state === "correct") return
    setState("checking")

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase()
      setState(isCorrect ? "correct" : "incorrect")

      if (!isCorrect) {
        setTimeout(() => setState("idle"), 1500)
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
    <>
      <div className="relative inline-block ml-1 overflow-visible">
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
          />
        </div>
      </div>

      {showTooltip &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="pointer-events-none absolute z-[1000] animate-tooltip-in"
            style={{
              visibility: tooltipPos ? "visible" : "hidden",
              left: tooltipPos?.left ?? 0,
              top: tooltipPos?.top ?? 0,
              maxWidth: "min(92vw, 420px)",
              willChange: "left, top",
              touchAction: "none",
              userSelect: "none",
            }}
          >
            <div
              className="rounded-lg px-3 py-2 text-xs font-medium tooltip-reset"
              style={{
                background: "#fff",
                color: "#111",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            >
              {clue}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
