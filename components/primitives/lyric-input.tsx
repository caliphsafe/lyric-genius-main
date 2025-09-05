"use client"

import type React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
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
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Tooltip controls
  const [showTip, setShowTip] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const tipRef = useRef<HTMLDivElement>(null)

  // Only compute vertical position; horizontal is centered via flexbox
  const [tipStyle, setTipStyle] = useState<React.CSSProperties>({})

  useEffect(() => setIsMounted(true), [])

  const positionTooltip = () => {
    if (!inputRef.current || !tipRef.current) return
    const rect = inputRef.current.getBoundingClientRect()

    const vv = (typeof window !== "undefined" && (window as any).visualViewport) as VisualViewport | undefined
    const viewportH = vv?.height ?? window.innerHeight

    // Measure tooltip height (after it's rendered)
    const tipH = tipRef.current.offsetHeight

    // Place tooltip above the input, with an 8px gap; clamp to at least 8px from top
    const top = Math.max(8, rect.top - tipH - 8)

    setTipStyle({
      position: "fixed",
      top,
      left: 0,
      right: 0,
      zIndex: 60,
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
      paddingLeft: 16,
      paddingRight: 16,
      // keep inside viewport height if layout shifts
      maxHeight: viewportH - 8,
    })
  }

  useLayoutEffect(() => {
    if (!showTip) return
    positionTooltip()
    const vv = (typeof window !== "undefined" && (window as any).visualViewport) as VisualViewport | undefined

    const onScroll = () => positionTooltip()
    const onResize = () => positionTooltip()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    if (vv) {
      vv.addEventListener("resize", onResize)
      vv.addEventListener("scroll", onResize)
    }

    const raf = requestAnimationFrame(positionTooltip)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      if (vv) {
        vv.removeEventListener("resize", onResize)
        vv.removeEventListener("scroll", onResize)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTip, value])

  const handleFocus = () => {
    setState("focused")
    setShowTip(true)
    // Let layout settle before measuring
    requestAnimationFrame(positionTooltip)
    onFocus?.()
  }

  const handleBlur = () => {
    onBlur?.()
    setShowTip(false)
    if (value.trim() && state !== "correct") {
      validateAnswer()
    } else if (!value.trim()) {
      setState("idle")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      // validate but keep focus; avoids scroll jump
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
        setTimeout(() => {
          // remain correct
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

      {/* Centered, arrowless tooltip (portal) */}
      {isMounted && showTip && state !== "correct" && clue && createPortal(
        <div style={tipStyle}>
          <div
            ref={tipRef}
            className="pointer-events-auto rounded-xl shadow-md border border-black/10 bg-white px-3 py-2 text-[13px] leading-snug font-medium animate-tooltip-in"
            style={{
              maxWidth: "min(92vw, 520px)",
              textAlign: "center",
            }}
          >
            {clue}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
