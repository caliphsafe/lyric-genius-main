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

  // Tooltip via portal
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; bottom: number } | null>(null)
  const showTooltip = state === "focused" && !!clue

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

  function getScrollParents(el: HTMLElement | null): (Element | Window)[] {
    const parents: (Element | Window)[] = [window]
    let p = el?.parentElement || null
    while (p) {
      const { overflowY } = window.getComputedStyle(p)
      if (/auto|scroll|overlay/i.test(overflowY)) parents.push(p)
      p = p.parentElement
    }
    return parents
  }

  const updateTooltipPos = () => {
    const inputEl = inputRef.current
    const tipEl = tooltipRef.current
    if (!inputEl || !tipEl) return

    const rect = inputEl.getBoundingClientRect()

    // Use visual viewport on iOS so keyboard doesn’t throw off vertical math
    const vv = window.visualViewport
    const viewportWidth = vv?.width ?? window.innerWidth
    const viewportHeight = vv?.height ?? window.innerHeight

    // measure tip width for clamping
    const tipWidth = tipEl.offsetWidth || 0
    const edgePadding = 8

    const centerX = rect.left + rect.width / 2
    const leftEdge = clamp(
      centerX - tipWidth / 2,
      edgePadding,
      Math.max(edgePadding, viewportWidth - tipWidth - edgePadding)
    )

    // Place ABOVE the input with an 8px gap
    const bottom = Math.max(0, viewportHeight - rect.top + 8)

    setTooltipPos({ left: Math.round(leftEdge), bottom: Math.round(bottom) })
  }

  // Reposition while visible: scroll, resize, keyboard, typing
  useEffect(() => {
    if (!showTooltip) return

    // Ensure the portal node exists, then measure
    const raf = requestAnimationFrame(updateTooltipPos)

    const onScroll = () => updateTooltipPos()
    const onResize = () => updateTooltipPos()

    const scrollParents = getScrollParents(inputRef.current)
    for (const p of scrollParents) {
      ;(p as Element | Window).addEventListener("scroll", onScroll, { passive: true } as any)
    }
    window.addEventListener("resize", onResize)

    const vv = window.visualViewport
    vv?.addEventListener("resize", onResize)
    vv?.addEventListener("scroll", onResize)

    const inputEl = inputRef.current
    inputEl?.addEventListener("input", onResize)

    return () => {
      cancelAnimationFrame(raf)
      for (const p of scrollParents) {
        ;(p as Element | Window).removeEventListener("scroll", onScroll)
      }
      window.removeEventListener("resize", onResize)
      vv?.removeEventListener("resize", onResize)
      vv?.removeEventListener("scroll", onResize)
      inputEl?.removeEventListener("input", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTooltip])

  // Also recalc when value changes while focused
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
      // no blur -> prevents scroll jump
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
    const base =
      "inline-flex w-32 h-10 rounded-xl text-lg md:text-xl lg:text-2xl font-black uppercase border-none transition-all duration-300 relative overflow-hidden text-center"

    switch (state) {
      case "checking":
        return `${base} text-white animate-fill-left-to-right animate-pulse`
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
              className="absolute inset-0 rounded-xl animate-fill-progress pointer-events-none"
              style={{
                background: `linear-gradient(90deg, #37DB00 0%, #37DB00 var(--progress, 0%), transparent var(--progress, 0%))`,
                animation: "fillProgress 0.8s ease-out forwards",
              }}
            />
          )}
        </div>
      </div>

      {/* Portal tooltip: render even before measured; hidden until we have a position */}
      {showTooltip &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="pointer-events-none fixed z-[1000] animate-tooltip-in"
            style={{
              visibility: tooltipPos ? "visible" : "hidden",
              left: tooltipPos?.left ?? 0,
              bottom: tooltipPos?.bottom ?? 0,
              maxWidth: "min(92vw, 420px)",
            }}
          >
            <div
              className="rounded-lg px-3 py-2 text-xs font-medium shadow-md tooltip-reset"
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
