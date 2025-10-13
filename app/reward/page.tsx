"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const DISCOUNT_CODE = "CALIPH20"
const SHARE_MESSAGE =
  "I just beat the Caliph Lyric Genius game and unlocked exclusive merch + music! #LyricGenius"

export default function RewardPage() {
  const [shareOrigin, setShareOrigin] = useState("")
  const [supportsFileShare, setSupportsFileShare] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareOrigin(window.location.origin)
      // Try detect file sharing support (Android Chrome typically true)
      const testFile = new File(["test"], "test.txt", { type: "text/plain" })
      setSupportsFileShare(
        !!(navigator as any).canShare && (navigator as any).canShare({ files: [testFile] }),
      )
      // Pre-render the story asset on mount
      renderStoryCard()
    }
  }, [])

  const storyWidth = 1080
  const storyHeight = 1920

  // UPDATED: clean “You won” card (no discount code drawn on the image)
  const renderStoryCard = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = storyWidth
    canvas.height = storyHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background (brand yellow)
    ctx.fillStyle = "#FFFF64"
    ctx.fillRect(0, 0, storyWidth, storyHeight)

    // Logo
    const logo = await loadImage("/lyric-genius-logo.svg").catch(() => null)
    if (logo) {
      const logoSize = 220
      ctx.drawImage(logo, (storyWidth - logoSize) / 2, 140, logoSize, logoSize)
    }

    // Headline
    ctx.fillStyle = "#000"
    ctx.textAlign = "center"
    ctx.font = "bold 80px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    ctx.fillText("YOU WON", storyWidth / 2, 520)

    ctx.font = "bold 70px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    ctx.fillText("LYRIC GENIUS", storyWidth / 2, 600)

    // Subline (no code!)
    ctx.font = "bold 44px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    wrapText(ctx, "Post this to your story & tag @caliphsafe", storyWidth / 2, 720, 900, 56)

    // Footer tag
    ctx.font = "bold 36px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    ctx.fillText("powered by kiiku", storyWidth / 2, storyHeight - 120)
  }

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  // (kept; harmless if unused)
  const roundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) => {
    const words = text.split(" ")
    let line = ""
    const lines: string[] = []
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line)
        line = words[n] + " "
      } else {
        line = testLine
      }
    }
    lines.push(line)

    lines.forEach((ln, i) => ctx.fillText(ln.trim(), x, y + i * lineHeight))
  }

  const canvasToFile = async (name = "lyric-genius-win.png") => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png", 0.95))
    if (!blob) return null
    return new File([blob], name, { type: "image/png" })
  }

  const handleDownload = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = "lyric-genius-win.png"
    a.click()
  }

  const handleShareAndroid = async () => {
    try {
      const file = await canvasToFile()
      if (!file) return
      const shareData: any = {
        files: [file],
        title: "Caliph Lyric Genius Champion",
        text: SHARE_MESSAGE,
      }
      if ((navigator as any).canShare?.(shareData)) {
        await (navigator as any).share(shareData)
      } else {
        await handleDownload()
      }
    } catch (e) {
      await handleDownload()
    }
  }

  const openInstagramStoryCamera = () => {
    // Opens the IG camera; user picks the just-downloaded image from Photos/Gallery
    window.location.href = "instagram://story-camera"
  }

  return (
    <div className="min-h-screen bg-[#FFFF64] text-black">
      {/* hidden canvas used to generate the story asset */}
      <canvas ref={canvasRef} width={storyWidth} height={storyHeight} style={{ display: "none" }} />

      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-6 py-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <img src="/lyric-genius-logo.svg" alt="Lyric Genius" className="h-20 w-20" />
          <h1 className="text-3xl font-black uppercase tracking-tight">You unlocked the vault</h1>
          <p className="text-base font-semibold uppercase">
            thanks for proving you&apos;re the real lyric genius.
          </p>
        </header>

        {/* ... your Merch + Video sections unchanged ... */}

        <section className="rounded-3xl border border-black/10 bg-white/60 p-8 text-center shadow-lg">
          <h2 className="text-xl font-black uppercase tracking-tight">Share the win</h2>
          <p className="mt-2 text-sm font-semibold uppercase text-black/70">
            Download your winner graphic (no code shown), then open Instagram Stories and post it.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-bold uppercase text-[#FFFF64] transition hover:scale-105"
            >
              Download Story Graphic
            </button>

            {supportsFileShare && (
              <button
                onClick={handleShareAndroid}
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-bold uppercase text-[#FFFF64] transition hover:scale-105"
              >
                Share (Android)
              </button>
            )}

            <button
              onClick={openInstagramStoryCamera}
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-bold uppercase text-[#FFFF64] transition hover:scale-105"
            >
              Open IG Story Camera
            </button>
          </div>

          {shareOrigin && (
            <p className="mt-4 text-xs uppercase text-black/50">
              Share link: <span className="font-bold">{`${shareOrigin}/reward`}</span>
            </p>
          )}
        </section>

        <footer className="pb-6 text-center text-xs font-semibold uppercase text-black/60">
          <Link href="/" className="underline transition hover:text-black">
            Play again
          </Link>
        </footer>
      </div>
    </div>
  )
}
