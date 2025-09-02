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
  // NEW: lets parent (page/header) update the banner text
  onActiveClueChange?: (clue: string | null) => void
}

export function LyricsSection({
  verseTitle,
  guesses,
  currentTime = 0,
  onActiveClueChange, // NEW
}: LyricsSection) {
  const [focusedWord, setFocusedWord] = useState<string | null>(null)

  const lyricTimings = [
    { start: 0, end: 3 }, // YEAH, I'M IN THIS [bitch] TRYN...
    { start: 3, end: 5 }, // UNH LOOK
    { start: 5, end: 8 }, // I'M IN THIS BITCH TRYNA RUN IT UP
    { start: 8, end: 11 }, // LIKE IT'S A FULL [court] PRESS...
    { start: 11, end: 14 }, // I GOT TWO 10S WITH ME...
    { start: 14, end: 17 }, // SHORTY CAME [through] AND...
    { start: 17, end: 20 }, // NOW SHE GOT HER MOUTH ON IT...
    { start: 20, end: 23 }, // MET HER AT A PARTY...
    { start: 23, end: 26 }, // UNH, BUT FUCK IT NOW...
    { start: 26, end: 29 }, // HER EX MAN IN THIS BITCH TRYNA [budden] UP
    { start: 29, end: 32 }, // BRODY THOUGHT HE WAS BRAVE...
    { start: 32, end: 35 }, // TALKING BOUT IT'S BEEF BUT HE SOFT AS A [buttercup]
    { start: 35, end: 38 }, // SO WE SQUASHED IT [butternut]
    { start: 38, end: 41 }, // MEANWHILE SHORTY LOOKIN LIKE...
    { start: 41, end: 44 }, // I LOOKED BACK LIKE WHATSUP...
    { start: 44, end: 47 }, // HER [friend] LOOK AT IS BOTH TRYNA [throuple] UP
    { start: 47, end: 50 }, // I COULD TELL THAT SHE CAN'T...
    { start: 50, end: 53 }, // I HIT IT THEN I DIPPED...
    // Continue with more timings for chorus, verse 2, etc.
  ]

  const isLyricActive = (index: number) => {
    if (index >= lyricTimings.length) return false
    const timing = lyricTimings[index]
    return currentTime >= timing.start && currentTime <= timing.end
  }

  const getClueForWord = (word: string) => {
    const wordClues: Record<string, string> = {
      "bitch": "A female dog",
      "through": "Number one, before all others",
      "budden": "Joe ______, 'sudden' with a B",
      "buttercup": "The green Powerpuff Girl",
      "butternut": "Type of squash, rhymes with the previous answer",
      "friend": "Someone close to you, opposite of an enemy",
      "polygamy": "The title of this song, multiple spouses",
      "court": "Where people play basketball or get sued",
      "rug": "Floor covering, carpet piece",
      "cuddle": "Hugging in bed",
      "dead": "No longer alive",
      "kid": "A child, a baby goat",
      "sin": "What you commit when you do something wrong",
      "gang": "A group of criminals, street crew",
      "adore": "To love or admire greatly",
      "adhd": "Acronym for Attention-deficit/hyperactivity disorder",
      "ignore": "To pay no attention to, brush off",
      "anaconda": "An extremely large type of snake",
      "twerking": "Popular dance women do, shaking their rear end",
      "squirting": "To eject liquid in a stream",
      "cursive": "Joined-up handwriting style, the opposite of print writing",
      "wife": "A spouse that is a woman",
      "love": "Deep affection, tennis score of zero",
      "matching": "Coordinating, colors or clothes that go together"
    }
    return wordClues[word] || "Enter a word to see the clue"
  }

  const areAllInputsCorrect = () => {
    const correctAnswers = [
      "bitch",
      "through",
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
      "kid", // Adding "kid" to correct answers array
      "sin", // Adding "sin" to correct answers array
      "gang", // Adding "gang" to correct answers array
      "adore", // Adding "adore" to correct answers array
      "adhd", // Adding "adhd" to correct answers array
      "ignore", // Adding "ignore" to correct answers array
      "anaconda", // Adding "anaconda" to correct answers array
      "twerking", // Adding "twerking" to correct answers array
      "squirting", // Adding "squirting" to correct answers array
      "cursive", // Adding "cursive" to correct answers array
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

      // Call original change handler
      orig?.(next)

      // If this input is now correct, clear banner back to default
      if (correct && normalized(next) === normalized(correct)) {
        onActiveClueChange?.(null)
      }
    }

  const onFocusClue = (clue?: string) => () => {
    onActiveClueChange?.(clue ?? null)
  }

  return (
    <div className="h-80 relative overflow-hidden">
      <div className="h-full overflow-y-auto pb-8 scrollbar-minimal">
        <h2 className="text-lg md:text-xl font-bold text-black mb-4">{verseTitle}</h2>

        <div className="flex flex-col gap-3.5 text-lg md:text-xl lg:text-2xl leading-relaxed">
          {/* VERSE 1 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(0) ? "text-black" : "text-black/25"}`}>
              YEAH, I'M IN THIS
            </span>
            <LyricInput
              value={guesses[0]?.value || ""}
              onChange={wrapOnChange(guesses[0]?.onChange, "bitch")}
              correctAnswer="bitch"
              clue="What's another word for a difficult situation?"
              onFocus={onFocusClue("What's another word for a difficult situation?")}
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
              value={guesses[18]?.value || ""}
              onChange={wrapOnChange(guesses[18]?.onChange, "court")}
              correctAnswer="court"
              clue="Basketball term for defensive pressure"
              onFocus={onFocusClue("Basketball term for defensive pressure")}
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
              value={guesses[1]?.value || ""}
              onChange={wrapOnChange(guesses[1]?.onChange, "through")}
              correctAnswer="through"
              clue="Past tense of 'come'"
              onFocus={onFocusClue("Past tense of 'come'")}
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
              value={guesses[19]?.value || ""}
              onChange={wrapOnChange(guesses[19]?.onChange, "rug")}
              correctAnswer="rug"
              clue="What you cut when you're dancing"
              onFocus={onFocusClue("What you cut when you're dancing")}
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
              value={guesses[2]?.value || ""}
              onChange={wrapOnChange(guesses[2]?.onChange, "budden")}
              correctAnswer="budden"
              clue="Rhymes with 'sudden', sounds like a name"
              onFocus={onFocusClue("Rhymes with 'sudden', sounds like a name")}
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
              value={guesses[3]?.value || ""}
              onChange={wrapOnChange(guesses[3]?.onChange, "buttercup")}
              correctAnswer="buttercup"
              clue="A delicate yellow flower"
              onFocus={onFocusClue("A delicate yellow flower")}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(12) ? "text-black" : "text-black/25"}`}>
              SO WE SQUASHED IT
            </span>
            <LyricInput
              value={guesses[4]?.value || ""}
              onChange={wrapOnChange(guesses[4]?.onChange, "butternut")}
              correctAnswer="butternut"
              clue="Type of squash, rhymes with the previous answer"
              onFocus={onFocusClue("Type of squash, rhymes with the previous answer")}
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
              value={guesses[5]?.value || ""}
              onChange={wrapOnChange(guesses[5]?.onChange, "friend")}
              correctAnswer="friend"
              clue="Someone close to you"
              onFocus={onFocusClue("Someone close to you")}
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
              value={guesses[20]?.value || ""}
              onChange={wrapOnChange(guesses[20]?.onChange, "cuddle")}
              correctAnswer="cuddle"
              clue="What you do when you snuggle close together"
              onFocus={onFocusClue("What you do when you snuggle close together")}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(17) ? "text-black" : "text-black/25"}`}>UP</span>
          </div>

          {/* CHORUS */}
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">CHORUS</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(18) ? "text-black" : "text-black/25"}`}>
              BABY I'M A PRODUCT OF
            </span>
            <LyricInput
              value={guesses[7]?.value || ""}
              onChange={wrapOnChange(guesses[7]?.onChange, "polygamy")}
              correctAnswer="polygamy"
              clue="Marriage practice with multiple spouses"
              onFocus={onFocusClue("Marriage practice with multiple spouses")}
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
              value={guesses[23]?.value || ""}
              onChange={wrapOnChange(guesses[23]?.onChange, "sin")}
              correctAnswer="sin"
              clue="What you commit when you do something wrong"
              onFocus={onFocusClue("What you commit when you do something wrong")}
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
              value={guesses[21]?.value || ""}
              onChange={wrapOnChange(guesses[21]?.onChange, "dead")}
              correctAnswer="dead"
              clue="Completely, totally, or straight"
              onFocus={onFocusClue("Completely, totally, or straight")}
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
              IT AIN'T A THINK FOR THE
            </span>
            <LyricInput
              value={guesses[22]?.value || ""}
              onChange={wrapOnChange(guesses[22]?.onChange, "kid")}
              correctAnswer="kid"
              clue="Young person or child"
              onFocus={onFocusClue("Young person or child")}
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
              value={guesses[24]?.value || ""}
              onChange={wrapOnChange(guesses[24]?.onChange, "gang")}
              correctAnswer="gang"
              clue="Group of people who hang out together"
              onFocus={onFocusClue("Group of people who hang out together")}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(25) ? "text-black" : "text-black/25"}`}>
              ON HER LIKE I HAD TO JUST DO IT
            </span>
          </div>

          {/* DIALOGUE */}
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">DIALOGUE</h3>
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
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">VERSE 2</h3>

          <p className={`font-black uppercase ${isLyricActive(31) ? "text-black" : "text-black/25"}`}>
            NOW I'M OUTSIDE SINGLE AS A GEORGIE
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(32) ? "text-black" : "text-black/25"}`}>
              TENS IN MY FACE TRYNA TELL ME THEY
            </span>
            <LyricInput
              value={guesses[25]?.value || ""}
              onChange={wrapOnChange(guesses[25]?.onChange, "adore")}
              correctAnswer="adore"
              clue="To love and admire someone deeply"
              onFocus={onFocusClue("To love and admire someone deeply")}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(32) ? "text-black" : "text-black/25"}`}>
              ME
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(33) ? "text-black" : "text-black/25"}`}>
            I'M INN AND OUT SO THEY SAY THEY WANT MORE OF ME
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(34) ? "text-black" : "text-black/25"}`}>
              BUT I GOT
            </span>
            <LyricInput
              value={guesses[26]?.value || ""}
              onChange={wrapOnChange(guesses[26]?.onChange, "adhd")}
              correctAnswer="adhd"
              clue="Attention deficit hyperactivity disorder"
              onFocus={onFocusClue("Attention deficit hyperactivity disorder")}
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
              value={guesses[27]?.value || ""}
              onChange={wrapOnChange(guesses[27]?.onChange, "ignore")}
              correctAnswer="ignore"
              clue="To deliberately not pay attention to someone"
              onFocus={onFocusClue("To deliberately not pay attention to someone")}
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
              value={guesses[28]?.value || ""}
              onChange={wrapOnChange(guesses[28]?.onChange, "anaconda")}
              correctAnswer="anaconda"
              clue="A large type of snake"
              onFocus={onFocusClue("A large type of snake")}
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
              value={guesses[29]?.value || ""}
              onChange={wrapOnChange(guesses[29]?.onChange, "twerking")}
              correctAnswer="twerking"
              clue="A dance move involving hip movements"
              onFocus={onFocusClue("A dance move involving hip movements")}
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
              value={guesses[30]?.value || ""}
              onChange={wrapOnChange(guesses[30]?.onChange, "squirting")}
              correctAnswer="squirting"
              clue="To spray or shoot liquid in a stream"
              onFocus={onFocusClue("To spray or shoot liquid in a stream")}
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
              value={guesses[31]?.value || ""}
              onChange={wrapOnChange(guesses[31]?.onChange, "cursive")}
              correctAnswer="cursive"
              clue="A style of handwriting where letters are joined together"
              onFocus={onFocusClue("A style of handwriting where letters are joined together")}
              onBlur={() => setFocusedWord(null)}
              className="flex-1"
            />
          </div>

          {/* CHORUS 2 */}
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">CHORUS</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(47) ? "text-black" : "text-black/25"}`}>
              BABY I'M A PRODUCT OF
            </span>
            <LyricInput
              value={guesses[10]?.value || ""}
              onChange={wrapOnChange(guesses[10]?.onChange, "polygamy")}
              correctAnswer="polygamy"
              clue="Marriage practice with multiple spouses"
              onFocus={onFocusClue("Marriage practice with multiple spouses")}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(48) ? "text-black" : "text-black/25"}`}>
            LIKE YOU GON HAVE TO LEARN TO SHARE IF YOU INTO ME
          </p>
          <p className={`font-black uppercase ${isLyricActive(49) ? "text-black" : "text-black/25"}`}>
            IF I DO THIS SHIT RIGHT IT AIN'T A SIN TO ME
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(50) ? "text-black" : "text-black/25"}`}>
              SHE LOOKED ME
            </span>
            <LyricInput
              value={guesses[21]?.value || ""}
              onChange={wrapOnChange(guesses[21]?.onChange, "dead")}
              correctAnswer="dead"
              clue="No longer alive"
              onFocus={onFocusClue("No longer alive")}
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
              value={guesses[22]?.value || ""}
              onChange={wrapOnChange(guesses[22]?.onChange, "kid")}
              correctAnswer="kid"
              clue="Young person or child"
              onFocus={onFocusClue("Young person or child")}
              onBlur={() => setFocusedWord(null)}
            />
            <span className={`font-black uppercase ${isLyricActive(52) ? "text-black" : "text-black/25"}`}>
              TO ONE TWO IT
            </span>
          </div>

          <p className={`font-black uppercase ${isLyricActive(53) ? "text-black" : "text-black/25"}`}>
            I LEFT MY EX AND NOW THE BITCH IS GOING THROUGH IT
          </p>
          <p className={`font-black uppercase ${isLyricActive(54) ? "text-black" : "text-black/25"}`}>
            SWOOSH GANG ON HER LIKE I HAD TO JUST DO IT
          </p>

          {/* DIALOGUE 2 */}
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">DIALOGUE</h3>
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
          <h3 className="text-lg md:text-xl font-bold text-black mt-6 mb-4">VERSE 3</h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(58) ? "text-black" : "text-black/25"}`}>
              IF MY GRANDDADDY AIN'T HAVE HIS 3RD
            </span>
            <LyricInput
              value={guesses[11]?.value || ""}
              onChange={wrapOnChange(guesses[11]?.onChange, "wife")}
              correctAnswer="Wife"
              clue="A spouse that is a woman"
              onFocus={onFocusClue("A spouse that is a woman")}
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
              FELL IN{" "}
            </span>
            <LyricInput
              value={guesses[12]?.value || ""}
              onChange={wrapOnChange(guesses[12]?.onChange, "love")}
              correctAnswer="Love"
              clue="Deep affection, tennis score of zero"
              onFocus={onFocusClue("Deep affection, tennis score of zero")}
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
              WE IN THE MAKINGS OF A{" "}
            </span>
            <LyricInput
              value={guesses[12]?.value || ""}
              onChange={wrapOnChange(guesses[12]?.onChange, "matching")}
              correctAnswer="Matching"
              clue="Deep affection, tennis score of zero"
              onFocus={onFocusClue("Deep affection, tennis score of zero")}
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
          <p className={`font-black uppercase ${isLyricActive(66) ? "text-black" : "text-black/25"}`}>
            THAT'S A HELL OF AN ASK FOR A FIRST BITE
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(67) ? "text-black" : "text-black/25"}`}>
              BUT I HEARD SHE EAT THE WOOD LIKE A
            </span>
            <LyricInput
              value={guesses[15]?.value || ""}
              onChange={wrapOnChange(guesses[15]?.onChange, "termite")}
              correctAnswer="termite"
              clue="Insect that eats wood"
              onFocus={onFocusClue("Insect that eats wood")}
              onBlur={() => setFocusedWord(null)}
            />
          </div>

          <p className={`font-black uppercase ${isLyricActive(68) ? "text-black" : "text-black/25"}`}>
            YIKES I HAD TO FIND OUT WHAT THE SLURP LIKE
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-black uppercase ${isLyricActive(69) ? "text-black" : "text-black/25"}`}>
              PUT THE BAOBAB IN HER MOUTH LIKE A
            </span>
            <LyricInput
              value={guesses[16]?.value || ""}
              onChange={wrapOnChange(guesses[16]?.onChange, "birthright")}
              correctAnswer="birthright"
              clue="Something you're entitled to from birth"
              onFocus={onFocusClue("Something you're entitled to from birth")}
              onBlur={() => setFocusedWord(null)}
            />
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
          <p className={`font-black uppercase ${isLyricActive(73) ? "text-black" : "text-black/25"}`}>
            AS I LEAVE LIKE AN IMMIGRANT TRYNA CURVE ICE
          </p>

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
                  // Handle game completion
                  console.log("Game completed!")
                }
              }}
            >
              COMPLETE GAME
            </button>
          </div>
        </div>
      </div>

      {/* Removed bottom Clue Alert overlay since clues now surface in the banner */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FFFF64, transparent)" }}
      ></div>
    </div>
  )
}
