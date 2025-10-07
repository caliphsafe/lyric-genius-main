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
  // lets parent (page/header) update the banner text
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
    // Continue with more timings for chorus, verse 2, etc.
  ]

  // ✅ Disable time-based highlighting: always return true so everything is black
  const isLyricActive = (_index: number) => true

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

  // Helpers: normalize, safe wrapper for onChange (handles string or event), and focus->clue
  const normalized = (s: string) => s.trim().toLowerCase()
  const wrapOnChange =
    (orig: ((value: string) => void) | undefined, correct?: string) =>
    (arg: any) => {
      const next =
        typeof arg === "string"
          ? arg
          : arg && arg.target && typeof arg.target.value === "string"
          ? arg.target.value
          : ""

      orig?.(next)

      if (correct && normalized(next) === normalized(correct)) {
        onActiveClueChange?.(null)
      }
    }

  const onFocusClue = (clue?: string) => () => {
    onActiveClueChange?.(clue ?? null)
  }

  return (
    <div className="relative">
      <div className="pb-8">
        <h2 className="text-base md:text-lg font-bold text-black mb-4">{verseTitle}</h2>

        <div className="flex flex-col gap-3.5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] leading-relaxed">
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
            </span>
            <LyricInput
              value={guesses[3]?.value || ""}
              onChange={wrapOnChange(guesses[3]?.onChange, "rug")}
              correctAnswer="rug"
              clue={guesses[3]?.clue}
              onFocus={onFocusClue(guesses[3]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
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
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">CHORUS</h3>

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

          {/* DIALOGUE */}
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">DIALOGUE</h3>
          <p className={`font-black uppercase ${isLyricActive(26) ? "text-black" : "text-black/25"}`}>NAH LIKE…</p>
          <p className={`font-black uppercase ${isLyricActive(27) ? "text-black" : "text-black/25"}`}>
            NAH TO BE REAL I AIN'T GOT NO BEEF WITH MY EX WE COOL
          </p>
          <p className={`font-black uppercase ${isLyricActive(28) ? "text-black" : "text-black/25"}`}>
            THAT WAS MY DOG WE JUST NOT MEANT FOR EACH OTHER
          </p>
          <p className={`font-black uppercase ${isLyricActive(29) ? "text-black" : "text-black/25"}`}>
            JUST I, THAT'S JUST HOW IT BE SOMETIMES, YOU FEEL ME?
          </p>
          <p className={`font-black uppercase ${isLyricActive(30) ? "text-black" : "text-black/25"}`}>FOR REAL</p>

          {/* VERSE 2 */}
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">VERSE 2</h3>

          <p className={`font-black uppercase ${isLyricActive(31) ? "text-black" : "text-black/25"}`}>
            NOW I'M OUTSIDE SINGLE AS A GEORGIE
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(32) ? "text-black" : "text-black/25"}`}>
              TENS IN MY FACE TRYNA TELL ME THEY
            </span>
            <LyricInput
              value={guesses[14]?.value || ""}
              onChange={wrapOnChange(guesses[14]?.onChange, "adore")}
              correctAnswer="adore"
              clue={guesses[14]?.clue}
              onFocus={onFocusClue(guesses[14]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(32) ? "text-black" : "text-black/25"}`}>
              ME
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(33) ? "text-black" : "text-black/25"}`}>
            I'M INN AND OUT SO THEY SAY THEY WANT MORE OF ME
          </p>

          <div className="flex flex-wrap items-centered gap-2">
            <span className={`font-black uppercase ${isLyricActive(34) ? "text-black" : "text-black/25"}`}>
              BUT I GOT
            </span>
            <LyricInput
              value={guesses[15]?.value || ""}
              onChange={wrapOnChange(guesses[15]?.onChange, "adhd")}
              correctAnswer="adhd"
              clue={guesses[15]?.clue}
              onFocus={onFocusClue(guesses[15]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(34) ? "text-black" : "text-black/25"}`}>
              IT'S EASY TO BORE ME
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(35) ? "text-black" : "text-black/25"}`}>
            I'M LIKE CALL ME, AND THEY CALL ME
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(36) ? "text-black" : "text-black/25"}`}>
              THEN I DON'T ANSWER THEY LIKE WHY'D YOU
            </span>
            <LyricInput
              value={guesses[16]?.value || ""}
              onChange={wrapOnChange(guesses[16]?.onChange, "ignore")}
              correctAnswer="ignore"
              clue={guesses[16]?.clue}
              onFocus={onFocusClue(guesses[16]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(36) ? "text-black" : "text-black/25"}`}>
              ME
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(37) ? "text-black" : "text-black/25"}`}>
            I AIN'T DO THIS SHIT ON PURPOSE
          </p>
          <p className={`font-black uppercase ${isLyricActive(38) ? "text-black" : "text-black/25"}`}>
            I'M JUST A NIGGA WITH A PURPOSE
          </p>

          <p className={`font-black uppercase ${isLyricActive(39) ? "text-black" : "text-black/25"}`}>
            SNAKE IN MY PANTS SO SHE WANNA SEE THE SERPENT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <LyricInput
              value={guesses[17]?.value || ""}
              onChange={wrapOnChange(guesses[17]?.onChange, "anaconda")}
              correctAnswer="anaconda"
              clue={guesses[17]?.clue}
              onFocus={onFocusClue(guesses[17]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(40) ? "text-black" : "text-black/25"}`}>
              GOT HER THINKING THAT IT'S WORTH IT
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(41) ? "text-black" : "text-black/25"}`}>
              I'M IN HER CONDO WHILE SHE SIPPING AND SHE
            </span>
            <LyricInput
              value={guesses[18]?.value || ""}
              onChange={wrapOnChange(guesses[18]?.onChange, "twerking")}
              correctAnswer="twerking"
              clue={guesses[18]?.clue}
              onFocus={onFocusClue(guesses[18]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(42) ? "text-black" : "text-black/25"}`}>
            IN A CONDO WHILE SHE GLITCHING AND SHE WORKIN
          </p>
          <p className={`font-black uppercase ${isLyricActive(43) ? "text-black" : "text-black/25"}`}>
            DAMN, WORK IT, WORK IT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(44) ? "text-black" : "text-black/25"}`}>
              SHORTY LIKE A SUPER SOAKER HOW SHE
            </span>
            <LyricInput
              value={guesses[19]?.value || ""}
              onChange={wrapOnChange(guesses[19]?.onChange, "squirting")}
              correctAnswer="squirting"
              clue={guesses[19]?.clue}
              onFocus={onFocusClue(guesses[19]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(45) ? "text-black" : "text-black/25"}`}>
            DAMN, SQUIRTING, SQUIRTING
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(46) ? "text-black" : "text-black/25"}`}>
              I'M TRYNA KEEP MY WORDS ALL TOGETHER LIKE IT'S
            </span>
            <LyricInput
              value={guesses[20]?.value || ""}
              onChange={wrapOnChange(guesses[20]?.onChange, "cursive")}
              correctAnswer="cursive"
              clue={guesses[20]?.clue}
              onFocus={onFocusClue(guesses[20]?.clue)}
              onBlur={() => setFocusedWord(null)}
              className="flex-1"
            />
          </div>

          {/* CHORUS 2 */}
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">CHORUS</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(47) ? "text-black" : "text-black/25"}`}>
              BABY I'M A PRODUCT OF
            </span>
            <LyricInput
              value={guesses[21]?.value || ""}
              onChange={wrapOnChange(guesses[21]?.onChange, "polygamy")}
              correctAnswer="polygamy"
              clue={guesses[21]?.clue}
              onFocus={onFocusClue(guesses[21]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(48) ? "text-black" : "text-black/25"}`}>
            LIKE YOU GON HAVE TO LEARN TO SHARE IF YOU INTO ME
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(20) ? "text-black" : "text-black/25"}`}>
              IF I DO THIS SHIT RIGHT IT AIN'T A
            </span>
            <LyricInput
              value={guesses[22]?.value || ""}
              onChange={wrapOnChange(guesses[22]?.onChange, "sin")}
              correctAnswer="sin"
              clue={guesses[22]?.clue}
              onFocus={onFocusClue(guesses[22]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(20) ? "text-black" : "text-black/25"}`}>
              TO ME
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(50) ? "text-black" : "text-black/25"}`}>
              SHE LOOKED ME
            </span>
            <LyricInput
              value={guesses[23]?.value || ""}
              onChange={wrapOnChange(guesses[23]?.onChange, "dead")}
              correctAnswer="dead"
              clue={guesses[23]?.clue}
              onFocus={onFocusClue(guesses[23]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(50) ? "text-black" : "text-black/25"}`}>
              IN THE FACE LIKE YOU KIDDING ME?
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(51) ? "text-black" : "text-black/25"}`}>
            I AM UNLESS YOU GON DO IT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(52) ? "text-black" : "text-black/25"}`}>
              IT AIN'T A THING FOR THE
            </span>
            <LyricInput
              value={guesses[24]?.value || ""}
              onChange={wrapOnChange(guesses[24]?.onChange, "kid")}
              correctAnswer="kid"
              clue={guesses[24]?.clue}
              onFocus={onFocusClue(guesses[24]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(52) ? "text-black" : "text-black/25"}`}>
              TO ONE TWO IT
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(53) ? "text-black" : "text-black/25"}`}>
            I LEFT MY EX AND NOW THE BITCH IS GOING THROUGH IT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(25) ? "text-black" : "text-black/25"}`}>
              SWOOSH
            </span>
            <LyricInput
              value={guesses[25]?.value || ""}
              onChange={wrapOnChange(guesses[25]?.onChange, "gang")}
              correctAnswer="gang"
              clue={guesses[25]?.clue}
              onFocus={onFocusClue(guesses[25]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(25) ? "text-black" : "text-black/25"}`}>
              ON HER LIKE I HAD TO JUST DO IT
            </span>
          </div>

          {/* DIALOGUE 2 */}
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">DIALOGUE</h3>
          <p className={`font-black uppercase ${isLyricActive(55) ? "text-black" : "text-black/25"}`}>
            NAH REALLY THOUGH I AIN'T GOT NO PROBLEMS WITH MY EXES
          </p>
          <p className={`font-black uppercase ${isLyricActive(56) ? "text-black" : "text-black/25"}`}>
            BUT WHEN I LEAVE THEY DO GO THROUGH IT THOUGH, FACTS
          </p>
          <p className={`font-black uppercase ${isLyricActive(57) ? "text-black" : "text-black/25"}`}>
            DO I MAKE YOU HORNY BABY?
          </p>

          {/* VERSE 3 */}
          <h3 className="text-base md:text-lg font-bold text-black mt-6 mb-4">VERSE 3</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(58) ? "text-black" : "text-black/25"}`}>
              IF MY GRANDDADDY AIN'T HAVE HIS 3RD
            </span>
            <LyricInput
              value={guesses[26]?.value || ""}
              onChange={wrapOnChange(guesses[26]?.onChange, "wife")}
              correctAnswer="Wife"
              clue={guesses[26]?.clue}
              onFocus={onFocusClue(guesses[26]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(58) ? "text-black" : "text-black/25"}`}></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(59) ? "text-black" : "text-black/25"}`}>
              I WOULDN'T BE OUT HERE LIVIN OUT MY 3RD LIFE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(60) ? "text-black" : "text-black/25"}`}>
              FELL IN
            </span>
            <LyricInput
              value={guesses[27]?.value || ""}
              onChange={wrapOnChange(guesses[27]?.onChange, "love")}
              correctAnswer="Love"
              clue={guesses[27]?.clue}
              onFocus={onFocusClue(guesses[27]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(60) ? "text-black" : "text-black/25"}`}>
              3 TIMES AND THIS MY 3RD STRIKE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(61) ? "text-black" : "text-black/25"}`}>
              IN HER DUGOUT DIGGING HER OUT FOR THE 3RD NIGHT
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
  <span className={`font-black uppercase ${isLyricActive(62) ? "text-black" : "text-black/25"}`}>
    WE IN THE MAKINGS OF A
  </span>
  <LyricInput
    value={guesses[28]?.value || ""}
    onChange={wrapOnChange(guesses[28]?.onChange, "matching")}
    correctAnswer="matching"
    clue={guesses[28]?.clue}
    onFocus={onFocusClue(guesses[28]?.clue)}
    onBlur={() => setFocusedWord(null)}
  />
  <span className={`font-black uppercase ${isLyricActive(62) ? "text-black" : "text-black/25"}`}>
    HIS AND HERS RIGHT
  </span>
</div>


          <p className={`font-black uppercase ${isLyricActive(63) ? "text-black" : "text-black/25"}`}>
            OR AM I JUST TRYNA SEE IT IN REVERSE LIKE…
          </p>
          <p className={`font-black uppercase ${isLyricActive(64) ? "text-black" : "text-black/25"}`}>
            LIKE CAN YOU THROW IT IN A REVERSE TONIGHT
          </p>
          <p className={`font-black uppercase ${isLyricActive(65) ? "text-black" : "text-black/25"}`}>
            SHE LIKE CAN YOU THROW ME IN A VERSE TONIGHT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(66) ? "text-black" : "text-black/25"}`}>
              THAT'S A 
            </span>
            <LyricInput
              value={guesses[29]?.value || ""}
              onChange={wrapOnChange(guesses[29]?.onChange, "hell")}
              correctAnswer="hell"
              clue={guesses[29]?.clue}
              onFocus={onFocusClue(guesses[29]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(66) ? "text-black" : "text-black/25"}`}>
              OF AN ASK FOR A FIRST BITE
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(67) ? "text-black" : "text-black/25"}`}>
            BUT I HEARD SHE EAT THE WOOD LIKE A
          </p>
          <LyricInput
            value={guesses[30]?.value || ""}
            onChange={wrapOnChange(guesses[30]?.onChange, "termite")}
            correctAnswer="termite"
            clue={guesses[30]?.clue}
            onFocus={onFocusClue(guesses[30]?.clue)}
            onBlur={() => setFocusedWord(null)}
          />

          <p className={`font-black uppercase ${isLyricActive(68) ? "text-black" : "text-black/25"}`}>
            YIKES, I HAD TO FIND OUT WHAT THE SLURP LIKE
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(69) ? "text-black" : "text-black/25"}`}>
              PUT THE
            </span>
            <LyricInput
              value={guesses[31]?.value || ""}
              onChange={wrapOnChange(guesses[31]?.onChange, "baobab")}
              correctAnswer="baobab"
              clue={guesses[31]?.clue}
              onFocus={onFocusClue(guesses[31]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(69) ? "text-black" : "text-black/25"}`}>
              IN HER MOUTH LIKE A BIRTHRIGHT
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(70) ? "text-black" : "text-black/25"}`}>
            THAT'S A LEWD REFERENCE TO WHAT THE GIRTH LIKE
          </p>
          <p className={`font-black uppercase ${isLyricActive(71) ? "text-black" : "text-black/25"}`}>
            DICK GAME MADE HER GO OUTSIDE AND TOUCH EACH LIKE…
          </p>
          <p className={`font-black uppercase ${isLyricActive(72) ? "text-black" : "text-black/25"}`}>
            IT'S 4 AM I GUESS YOU WANNA HEAR THE BIRDS RIGHT
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(73) ? "text-black" : "text-black/25"}`}>
              AS I LEAVE LIKE AN
            </span>
            <LyricInput
              value={guesses[32]?.value || ""}
              onChange={wrapOnChange(guesses[32]?.onChange, "immigrant")}
              correctAnswer="immigrant"
              clue={guesses[32]?.clue}
              onFocus={onFocusClue(guesses[32]?.clue)}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(73) ? "text-black" : "text-black/25"}`}>
              TRYNA CURVE ICE
            </span>
          </div>

          <div className="flex justify-center mt-8 mb-16">
            <button
              disabled={!areAllInputsCorrect()}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
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
