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
      // Detect file sharing support (mostly Android Chrome)
      try {
        const testFile = new File(["test"], "test.txt", { type: "text/plain" })
        setSupportsFileShare(
          !!(navigator as any).canShare && (navigator as any).canShare({ files: [testFile] }),
        )
      } catch {
        setSupportsFileShare(false)
      }
      renderStoryCard()
    }
  }, [])

  const storyWidth = 1080
  const storyHeight = 1920

  // Renders a clean “winner” graphic (NO DISCOUNT CODE on the image)
  const renderStoryCard = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = storyWidth
    canvas.height = storyHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background
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

    // Subline
    ctx.font = "bold 44px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    wrapText(ctx, "Post this to your story & tag @caliphsafe", storyWidth / 2, 720, 900, 56)

    // Footer
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

  // More robust download: Blob + createObjectURL, with new-tab fallback (helps iOS)
  const handleDownload = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png", 0.95))
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "lyric-genius-win.png"
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        return
      }
    } catch {
      // fall through to dataURL
    }
    // Fallback: open in a new tab so user can long-press/save (iOS-friendly)
    const dataUrl = canvas.toDataURL("image/png")
    window.open(dataUrl, "_blank")
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
    } catch {
      await handleDownload()
    }
  }

  // Tries to open the IG Story camera; falls back to Instagram profile if deep link blocked
  const openInstagramStoryCamera = () => {
    const scheme = "instagram://story-camera"
    const fallback = "https://instagram.com/_u/caliphsafe"
    let bounced = false
    const timer = setTimeout(() => {
      if (!bounced) window.open(fallback, "_blank", "noopener,noreferrer")
    }, 800)
    try {
      // User gesture context: should attempt to open the app
      (window as any).location.href = scheme
      bounced = true
      clearTimeout(timer)
    } catch {
      clearTimeout(timer)
      window.open(fallback, "_blank", "noopener,noreferrer")
    }
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

        {/* RESTORED: Merch discount (code is shown here on the page, not on the graphic) */}
        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white/60 p-8 shadow-lg">
            <h2 className="text-xl font-black uppercase tracking-tight">Exclusive Merch Discount</h2>
            <p className="mt-3 text-sm font-semibold uppercase text-black/70">
              Use this code at checkout to get 20% off select Caliph merch.
            </p>
            <div className="mt-6 rounded-2xl border-2 border-dashed border-black bg-[#FFFF64] p-6 text-center">
              <p className="text-sm font-semibold uppercase text-black/70">Your code</p>
              <p className="mt-2 text-3xl font-black tracking-widest">{DISCOUNT_CODE}</p>
            </div>
            <Link
              href="https://caliph-merch.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-bold uppercase text-[#FFFF64] transition hover:scale-105"
            >
              Shop the drop
            </Link>
          </div>

          {/* RESTORED: Hidden video */}
          <div className="rounded-3xl border border-black/10 bg-white/60 p-0 shadow-lg">
            <div className="rounded-t-3xl bg-black p-6 text-[#FFFF64]">
              <h2 className="text-xl font-black uppercase tracking-tight">Hidden performance</h2>
              <p className="mt-2 text-sm font-semibold uppercase text-[#FFFF64]/80">
                Stream this unreleased live cut while it&apos;s still underground.
              </p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-b-3xl bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Pxi4VazCkuw?autoplay=0&rel=0"
                title="Hidden Caliph Performance"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Share section */}
        <section className="rounded-3xl border border-black/10 bg-white/60 p-8 text-center shadow-lg">
          <h2 className="text-xl font-black uppercase tracking-tight">Share the win</h2>
          <p className="mt-2 text-sm font-semibold uppercase text-black/70">
            Download your winner graphic (no code on the image), then open Instagram Stories and post it.
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
