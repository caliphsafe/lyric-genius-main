"use client"

import { LyricInput } from "@/components/primitives/lyric-input"
import { useState } from "react"

interface LyricGuess {
  id: string
  value: string
  onChange: (value: string) => void
  correctAnswer?: string
  clue?: string
}

interface LyricsSection {
  verseTitle: string
  guesses: LyricGuess[]
  currentTime?: number
  onActiveClueChange?: (clue: string | null) => void
}

export function LyricsSection({
  verseTitle,
  guesses,
  currentTime = 0,
  onActiveClueChange,
}: LyricsSection) {
  const [focusedWord, setFocusedWord] = useState<string | null>(null)

  const lyricTimings = [
    { start: 0, end: 3 },
    { start: 3, end: 5 },
    { start: 5, end: 8 },
    { start: 8, end: 11 },
    { start: 11, end: 14 },
    { start: 14, end: 17 },
    { start: 17, end: 20 },
    { start: 20, end: 23 },
    { start: 23, end: 26 },
    { start: 26, end: 29 },
    { start: 29, end: 32 },
    { start: 32, end: 35 },
    { start: 35, end: 38 },
    { start: 38, end: 41 },
    { start: 41, end: 44 },
    { start: 44, end: 47 },
    { start: 47, end: 50 },
    { start: 50, end: 53 },
  ]

  const isLyricActive = (index: number) => {
    if (index >= lyricTimings.length) return false
    const t = lyricTimings[index]
    return currentTime >= t.start && currentTime <= t.end
  }

  const areAllInputsCorrect = () => {
    const correctAnswers = [
      "bitch",
      "first",
      "budden",
      "buttercup",
      "butternut",
      "friend",
      "polygamy",
      "polygamy",
      "3rd",
      "wife",
      "love",
      "matching",
      "3rd",
      "termite",
      "birthright",
      "polygamy",
      "court",
      "rug",
      "cuddle",
      "dead",
      "kid",
      "sin",
      "gang",
      "adore",
      "adhd",
      "ignore",
      "anaconda",
      "twerking",
      "squirting",
      "cursive",
    ]
    return correctAnswers.every((answer, index) => {
      const guess = guesses[index]
      return guess && guess.value.toLowerCase().trim() === answer.toLowerCase()
    })
  }

  const normalized = (s: string) => s.trim().toLowerCase()
  const wrapOnChange =
    (orig: ((value: string) => void) | undefined, correct?: string) =>
    (arg: any) => {
      const next =
        typeof arg === "string"
          ? arg
          : arg?.target && typeof arg.target.value === "string"
          ? arg.target.value
          : ""
      orig?.(next)
      if (correct && normalized(next) === normalized(correct)) {
        onActiveClueChange?.(null)
      }
    }

  const onFocusClue = (clue?: string) => () => onActiveClueChange?.(clue ?? null)

  return (
    <div className="relative">
      <div className="pb-8">
        {/* 70% sizing across the board; headings slightly larger than body for hierarchy */}
        <h2 className="text-[0.7rem] md:text-[0.85rem] font-bold text-black mb-4">
          {verseTitle}
        </h2>

        {/* Body text size — everything inside inherits this size unless overridden */}
        <div className="flex flex-col gap-3.5 text-[0.7rem] md:text-[0.85rem] lg:text-[1rem] leading-tight">
          {/* VERSE 1 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(0) ? "text-black" : "text-black/25"}`}>
              YEAH, I'M IN THIS
            </span>
            <LyricInput
              value={guesses[0]?.value || ""}
              onChange={wrapOnChange(guesses[0]?.onChange, "bitch")}
              correctAnswer="bitch"
              clue={guesses[0]?.clue}
              onFocus={onFocusClue(guesses[0]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(0) ? "text-black" : "text-black/25"}`}>TRYN...</span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(1) ? "text-black" : "text-black/25"}`}>UNH LOOK</p>
          <p className={`font-black uppercase ${isLyricActive(2) ? "text-black" : "text-black/25"}`}>
            I'M IN THIS BITCH TRYNA RUN IT UP
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(3) ? "text-black" : "text-black/25"}`}>
              LIKE IT'S A FULL
            </span>
            <LyricInput
              value={guesses[1]?.value || ""}
              onChange={wrapOnChange(guesses[1]?.onChange, "court")}
              correctAnswer="court"
              clue={guesses[1]?.clue}
              onFocus={onFocusClue(guesses[1]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(3) ? "text-black" : "text-black/25"}`}>
              PRESS I'M TRYNA DOUBLE UP
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(4) ? "text-black" : "text-black/25"}`}>
            I GOT TWO 10S WITH ME THEY TRYNA FUCK IT UP
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(5) ? "text-black" : "text-black/25"}`}>
              SHORTY CAME
            </span>
            <LyricInput
              value={guesses[2]?.value || ""}
              onChange={wrapOnChange(guesses[2]?.onChange, "first")}
              correctAnswer="first"
              clue={guesses[2]?.clue}
              onFocus={onFocusClue(guesses[2]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(5) ? "text-black" : "text-black/25"}`}>
              AND TURNED HER TO A RUNNER UP
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(6) ? "text-black" : "text-black/25"}`}>
            NOW SHE GOT HER MOUTH ON IT TRYNA SUCK IT UP
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(7) ? "text-black" : "text-black/25"}`}>
              MET HER AT A PARTY I WAS BUSY TRYNA CUT A
              <LyricInput
                value={guesses[3]?.value || ""}
                onChange={wrapOnChange(guesses[3]?.onChange, "rug")}
                correctAnswer="rug"
                clue={guesses[3]?.clue}
                onFocus={onFocusClue(guesses[3]?.clue)}
                onBlur={() => setFocusedWord(null)}
              />
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(8) ? "text-black" : "text-black/25"}`}>
            UNH, BUT FUCK IT NOW WE CUTTING UP
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(9) ? "text-black" : "text-black/25"}`}>
              HER EX MAN IN THIS BITCH TRYNA
            </span>
            <LyricInput
              value={guesses[4]?.value || ""}
              onChange={wrapOnChange(guesses[4]?.onChange, "budden")}
              correctAnswer="budden"
              clue={guesses[4]?.clue}
              onFocus={onFocusClue(guesses[4]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(9) ? "text-black" : "text-black/25"}`}>UP</span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(10) ? "text-black" : "text-black/25"}`}>
            BRODY THOUGHT HE WAS BRAVE HE TRYNA PUMP IT UP
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(11) ? "text-black" : "text-black/25"}`}>
              TALKING BOUT IT'S BEEF BUT HE SOFT AS A
            </span>
            <LyricInput
              value={guesses[5]?.value || ""}
              onChange={wrapOnChange(guesses[5]?.onChange, "buttercup")}
              correctAnswer="buttercup"
              clue={guesses[5]?.clue}
              onFocus={onFocusClue(guesses[5]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(12) ? "text-black" : "text-black/25"}`}>
              SO WE SQUASHED IT
            </span>
            <LyricInput
              value={guesses[6]?.value || ""}
              onChange={wrapOnChange(guesses[6]?.onChange, "butternut")}
              correctAnswer="butternut"
              clue={guesses[6]?.clue}
              onFocus={onFocusClue(guesses[6]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(13) ? "text-black" : "text-black/25"}`}>
            MEANWHILE SHORTY LOOKIN LIKE WHAT'S UP WITH US
          </p>
          <p className={`font-black uppercase ${isLyricActive(14) ? "text-black" : "text-black/25"}`}>
            I LOOKED BACK LIKE WHATSUP WITH US?
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(15) ? "text-black" : "text-black/25"}`}>HER</span>
            <LyricInput
              value={guesses[7]?.value || ""}
              onChange={wrapOnChange(guesses[7]?.onChange, "friend")}
              correctAnswer="friend"
              clue={guesses[7]?.clue}
              onFocus={onFocusClue(guesses[7]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(15) ? "text-black" : "text-black/25"}`}>
              LOOK AT IS BOTH TRYNA THROUPLE UP
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(16) ? "text-black" : "text-black/25"}`}>
            I COULD TELL THAT SHE CAN'T GET ENOUGH OF US
          </p>
          <p className={`font-black uppercase ${isLyricActive(17) ? "text-black" : "text-black/25"}`}>
            I HIT IT THEN I DIPPED AND LEFT THEM BOTH THERE TO
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <LyricInput
              value={guesses[8]?.value || ""}
              onChange={wrapOnChange(guesses[8]?.onChange, "cuddle")}
              correctAnswer="cuddle"
              clue={guesses[8]?.clue}
              onFocus={onFocusClue(guesses[8]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(17) ? "text-black" : "text-black/25"}`}>UP</span>
          </div>

          {/* CHORUS */}
          <h3 className="text-[0.7rem] md:text-[0.85rem] font-bold text-black mt-6 mb-4">CHORUS</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(18) ? "text-black" : "text-black/25"}`}>
              BABY I'M A PRODUCT OF
            </span>
            <LyricInput
              value={guesses[9]?.value || ""}
              onChange={wrapOnChange(guesses[9]?.onChange, "polygamy")}
              correctAnswer="polygamy"
              clue={guesses[9]?.clue}
              onFocus={onFocusClue(guesses[9]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(19) ? "text-black" : "text-black/25"}`}>
            LIKE YOU GON HAVE TO LEARN TO SHARE IF YOU INTO ME
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(20) ? "text-black" : "text-black/25"}`}>
              IF I DO THIS SHIT RIGHT IT AIN'T A
            </span>
            <LyricInput
              value={guesses[10]?.value || ""}
              onChange={wrapOnChange(guesses[10]?.onChange, "sin")}
              correctAnswer="sin"
              clue={guesses[10]?.clue}
              onFocus={onFocusClue(guesses[10]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(20) ? "text-black" : "text-black/25"}`}>
              TO ME
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(21) ? "text-black" : "text-black/25"}`}>
              SHE LOOKED ME
            </span>
            <LyricInput
              value={guesses[11]?.value || ""}
              onChange={wrapOnChange(guesses[11]?.onChange, "dead")}
              correctAnswer="dead"
              clue={guesses[11]?.clue}
              onFocus={onFocusClue(guesses[11]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(21) ? "text-black" : "text-black/25"}`}>
              IN THE FACE LIKE YOU KIDDING ME?
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(22) ? "text-black" : "text-black/25"}`}>
            I AM UNLESS YOU GON DO IT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(23) ? "text-black" : "text-black/25"}`}>
              IT AIN'T A THING FOR THE
            </span>
            <LyricInput
              value={guesses[12]?.value || ""}
              onChange={wrapOnChange(guesses[12]?.onChange, "kid")}
              correctAnswer="kid"
              clue={guesses[12]?.clue}
              onFocus={onFocusClue(guesses[12]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(23) ? "text-black" : "text-black/25"}`}>
              TO ONE TWO IT
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(24) ? "text-black" : "text-black/25"}`}>
            I LEFT MY EX AND NOW THE BITCH IS GOING THROUGH IT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(25) ? "text-black" : "text-black/25"}`}>
              SWOOSH
            </span>
            <LyricInput
              value={guesses[13]?.value || ""}
              onChange={wrapOnChange(guesses[13]?.onChange, "gang")}
              correctAnswer="gang"
              clue={guesses[13]?.clue}
              onFocus={onFocusClue(guesses[13]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(25) ? "text-black" : "text-black/25"}`}>
              ON HER LIKE I HAD TO JUST DO IT
            </span>
          </div>

          {/* (The rest of your verses/sections remain unchanged, they inherit the same smaller size) */}

          <div className="flex justify-center mt-8 mb-16">
            <button
              disabled={!areAllInputsCorrect()}
              className={`px-8 py-3 rounded-xl font-bold text-[0.9rem] md:text-[1rem] transition-all duration-200 ${
                areAllInputsCorrect()
                  ? "bg-black text-[#FFFF64] hover:scale-105 cursor-pointer"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
              }`}
              onClick={() => {
                if (areAllInputsCorrect()) {
                  console.log("Game completed!")
                }
              }}
            >
              COMPLETE GAME
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
