"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const DISCOUNT_CODE = "CALIPH20"

const SHARE_MESSAGE =
  "I just beat the Caliph Lyric Genius game and unlocked exclusive merch + music! #LyricGenius"

export default function RewardPage() {
  const [shareOrigin, setShareOrigin] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareOrigin(window.location.origin)
    }
  }, [])

  const handleShare = async () => {
    if (typeof window === "undefined") return

    const shareUrl = `${window.location.origin}/reward`
    const shareData = {
      title: "Caliph Lyric Genius Champion",
      text: SHARE_MESSAGE,
      url: shareUrl,
    }

    const instagramStoryUrl = `https://www.instagram.com/stories/create/?media=${encodeURIComponent(
      `${window.location.origin}/lyric-genius-logo.svg`,
    )}&caption=${encodeURIComponent(SHARE_MESSAGE)}`

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      }
    } catch (error) {
      console.warn("Web Share API failed", error)
    } finally {
      window.open(instagramStoryUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFF64] text-black">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-6 py-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <img src="/lyric-genius-logo.svg" alt="Lyric Genius" className="h-20 w-20" />
          <h1 className="text-3xl font-black uppercase tracking-tight">You unlocked the vault</h1>
          <p className="text-base font-semibold uppercase">
            thanks for proving you&apos;re the real lyric genius.
          </p>
        </header>

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

        <section className="rounded-3xl border border-black/10 bg-white/60 p-8 text-center shadow-lg">
          <h2 className="text-xl font-black uppercase tracking-tight">Share the win</h2>
          <p className="mt-2 text-sm font-semibold uppercase text-black/70">
            Blast your victory to the timeline or launch Instagram stories straight from here.
          </p>
          <button
            onClick={handleShare}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 font-bold uppercase text-[#FFFF64] transition hover:scale-105"
          >
            <span>Post to IG Stories</span>
          </button>
          <p className="mt-4 text-xs font-semibold uppercase text-black/60">
            Having trouble? Save a screenshot of this page and upload it to your story with the code above.
          </p>
          {shareOrigin && (
            <p className="mt-2 text-xs uppercase text-black/50">
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
