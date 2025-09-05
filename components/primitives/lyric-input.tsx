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

  // Tooltip positioning (centered horizontally; arrow points at the input)
  const [tipStyle, setTipStyle] = useState<React.CSSProperties>({})
  const [arrowLeft, setArrowLeft] = useState<number>(0)

  useEffect(() => setIsMounted(true), [])

  const positionTooltip = () => {
    if (!inputRef.current || !tipRef.current) return
    const rect = inputRef.current.getBoundingClientRect()

    const viewportW =
      (typeof window !== "undefined" && (window as any).visualViewport?.width) ||
      window.innerWidth
    const tipW = tipRef.current.offsetWidth
    const tipH = tipRef.current.offsetHeight

    // horizontally center the tooltip in the viewport
    const left = Math.max(8, (viewportW - tipW) / 2)
    // put the tooltip above the input; add a little gap
    const top = Math.max(8, rect.top - tipH - 8)

    // arrow should point to the input's horizontal center
    const inputCenterX = rect.left + rect.width / 2
    const arrowX = inputCenterX - left
    // clamp arrow inside tooltip width (with a small padding)
    const clampedArrowX = Math.max(12, Math.min(arrowX, tipW - 12))

    setTipStyle({
      position: "fixed",
      top,
      left,
      zIndex: 60,
    })
    setArrowLeft(clampedArrowX)
  }

  // Recompute position on focus and on layout changes
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

    // in case fonts/layout settle after paint
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
    // small delay so the DOM has sizes before we measure
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
      // validate but keep focus so the viewport doesn't jump
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
          // keep correct state
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

        {/* “checking” overlay */}
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

      {/* Centered tooltip in a portal with arrow pointing to this input */}
      {isMounted && showTip && state !== "correct" && clue && createPortal(
        <div
          ref={tipRef}
          style={tipStyle}
          className="pointer-events-none"
        >
          <div
            className="pointer-events-auto rounded-xl shadow-md border border-black/10 bg-white px-3 py-2 text-[13px] leading-snug font-medium animate-tooltip-in"
            style={{ maxWidth: "min(92vw, 520px)" }}
          >
            {clue}
            {/* arrow */}
            <span
              aria-hidden
              className="absolute block"
              style={{
                position: "absolute",
                left: `${arrowLeft}px`,
                bottom: -6, // arrow height
                width: 12,
                height: 12,
                transform: "translateX(-50%) rotate(45deg)",
                background: "white",
                borderLeft: "1px solid rgba(0,0,0,0.1)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
