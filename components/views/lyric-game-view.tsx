"use client"

import { useState } from "react"
import { LyricsSection } from "@/components/patterns/lyrics-section"

export function LyricGameView() {
  const [guess0, setGuess0] = useState("")
  const [guess1, setGuess1] = useState("")
  const [guess2, setGuess2] = useState("")
  const [guess3, setGuess3] = useState("")
  const [guess4, setGuess4] = useState("")
  const [guess5, setGuess5] = useState("")
  const [guess6, setGuess6] = useState("")
  const [guess7, setGuess7] = useState("")
  const [guess8, setGuess8] = useState("")
  const [guess9, setGuess9] = useState("")
  const [guess10, setGuess10] = useState("")
  const [guess11, setGuess11] = useState("")
  const [guess12, setGuess12] = useState("")
  const [guess13, setGuess13] = useState("")
  const [guess14, setGuess14] = useState("")
  const [guess15, setGuess15] = useState("")
  const [guess16, setGuess16] = useState("")
  const [guess17, setGuess17] = useState("")
  const [guess18, setGuess18] = useState("")
  const [guess19, setGuess19] = useState("")
  const [guess20, setGuess20] = useState("")
  const [guess21, setGuess21] = useState("")
  const [guess22, setGuess22] = useState("")
  const [guess23, setGuess23] = useState("")
  const [guess24, setGuess24] = useState("")
  const [guess25, setGuess25] = useState("")
  const [guess26, setGuess26] = useState("")
  const [guess27, setGuess27] = useState("")
  const [guess28, setGuess28] = useState("")
  const [guess29, setGuess29] = useState("")
  const [guess30, setGuess30] = useState("")
  const [guess31, setGuess31] = useState("")
  const [guess32, setGuess32] = useState("")

  const [activeClue, setActiveClue] = useState<string | null>(null)

  const guesses = [
    { id: "guess0", value: guess0, onChange: setGuess0, correctAnswer: "bitch", clue: "A FEMALE DOG" },
    { id: "guess1", value: guess1, onChange: setGuess1, correctAnswer: "court", clue: "WHERE PEOPLE PLAY BASKETBALL, OR GET SUED" },
    { id: "guess2", value: guess2, onChange: setGuess2, correctAnswer: "first", clue: "NUMBER ONE, BEFORE ALL OTHERS" },
    { id: "guess3", value: guess3, onChange: setGuess3, correctAnswer: "rug", clue: "ANOTHER WORD FOR A CARPET" },
    { id: "guess4", value: guess4, onChange: setGuess4, correctAnswer: "budden", clue: "JOE ______ PODCAST, 'SUDDEN' WITH A B" },
    { id: "guess5", value: guess5, onChange: setGuess5, correctAnswer: "buttercup", clue: "THE GREEN POWERPUFF GIRL" },
    { id: "guess6", value: guess6, onChange: setGuess6, correctAnswer: "butternut", clue: "TYPE OF SQUASH, RHYMES WITH THE PREVIOUS ANSWER" },
    { id: "guess7", value: guess7, onChange: setGuess7, correctAnswer: "friend", clue: "SOMEONE CLOSE TO YOU, OPPOSITE OF AN ENEMY" },
    { id: "guess8", value: guess8, onChange: setGuess8, correctAnswer: "cuddle", clue: "HUGGING AND HOLDING EACH OTHER IN BED" },
    { id: "guess9", value: guess9, onChange: setGuess9, correctAnswer: "polygamy", clue: "MARRIAGE PRACTICE WITH MULTIPLE SPOUSES" },
    { id: "guess10", value: guess10, onChange: setGuess10, correctAnswer: "sin", clue: "WHAT YOU COMMIT WHEN YOU DO SOMETHING WRONG IN RELIGION" },
    { id: "guess11", value: guess11, onChange: setGuess11, correctAnswer: "dead", clue: "THE OPPOSITE OF BEING ALIVE" },
    { id: "guess12", value: guess12, onChange: setGuess12, correctAnswer: "kid", clue: "YOUNG PERSON OR CHILD, A BABY GOAT" },
    { id: "guess13", value: guess13, onChange: setGuess13, correctAnswer: "gang", clue: "A GROUP OF CRIMINALS, STREET CREW" },
    { id: "guess14", value: guess14, onChange: setGuess14, correctAnswer: "adore", clue: "TO LOVE OR ADMIRE GREATLY" },
    { id: "guess15", value: guess15, onChange: setGuess15, correctAnswer: "adhd", clue: "THE ACRONYM FOR ATTENTION DEFICIT HYPERACTIVITY DISORDER" },
    { id: "guess16", value: guess16, onChange: setGuess16, correctAnswer: "ignore", clue: "TO PAY NO ATTENTION TO SOMEONE, BRUSH THEM OFF" },
    { id: "guess17", value: guess17, onChange: setGuess17, correctAnswer: "anaconda", clue: " A KIND OF SNAKE THAT IS VERY LARGE" },
    { id: "guess18", value: guess18, onChange: setGuess18, correctAnswer: "twerking", clue: "A DANCE MOVE THAT INVOLVES ROTATING THE BUTTOCKS, SHAKING BOOTY" },
    { id: "guess19", value: guess19, onChange: setGuess19, correctAnswer: "squirting", clue: "TO EJECT LIQUID IN A STREAM" },
    { id: "guess20", value: guess20, onChange: setGuess20, correctAnswer: "cursive", clue: "JOINED-UP HANDWRITING STYLE" },
    { id: "guess21", value: guess21, onChange: setGuess21, correctAnswer: "polygamy", clue: "MARRIAGE PRACTICE WITH MULTIPLE SPOUSES" },
    { id: "guess22", value: guess22, onChange: setGuess22, correctAnswer: "sin", clue: "WHAT YOU COMMIT WHEN YOU DO SOMETHING WRONG IN RELIGION" },
    { id: "guess23", value: guess23, onChange: setGuess23, correctAnswer: "dead", clue: "THE OPPOSITE OF BEING ALIVE" },
    { id: "guess24", value: guess24, onChange: setGuess24, correctAnswer: "kid", clue: "YOUNG PERSON OR CHILD, A BABY GOAT" },
    { id: "guess25", value: guess25, onChange: setGuess25, correctAnswer: "gang", clue: "A GROUP OF CRIMINALS, STREET CREW" },
    { id: "guess26", value: guess26, onChange: setGuess26, correctAnswer: "wife", clue: "A SPOUSE THAT IS A WOMAN" },
    { id: "guess27", value: guess27, onChange: setGuess27, correctAnswer: "love", clue: "THE PUREST FEELING ON EARTH, THE OPPOSITE OF HATE" },
    { id: "guess28", value: guess28, onChange: setGuess28, correctAnswer: "matching", clue: "COORDINATING, COLORS / CLOTHES THAT GO TOGETHER" },
    { id: "guess29", value: guess29, onChange: setGuess29, correctAnswer: "hell", clue: "THE OPPOSITE OF HEAVEN, WHERE SINNERS GO IN RELIGION" },
    { id: "guess30", value: guess30, onChange: setGuess30, correctAnswer: "termite", clue: "A SMALL BUG THAT IS KNOWN FOR EATING THROUGH WOOD" },
    { id: "guess31", value: guess31, onChange: setGuess31, correctAnswer: "baobab", clue: "THE MAGNIFICENT AFRICAN 'TREE OF LIFE' KNOWN FOR ITS ENORMOUS, WATER-STORING TRUNKS AND NUTRITIOUS FRUIT" },
    { id: "guess32", value: guess32, onChange: setGuess32, correctAnswer: "immigrant", clue: "A PERSON WHO COMES TO LIVE PERMANENTLY IN A FOREIGN COUNTRY" },
  ]

  return (
    <div className="h-[100svh] flex flex-col overflow-hidden" style={{ backgroundColor: "#FFFF64" }}>
      {/* TOP: logo only, with divider underneath */}
      <div className="shrink-0 w-full" style={{ backgroundColor: "#FFFF64" }}>
        <div className="mx-auto max-w-[1024px] px-4 pt-4 pb-3">
          <div className="flex justify-center">
            <img src="/lyric-genius-logo.svg" alt="Lyric Genius" className="w-20 h-auto" />
          </div>
        </div>
        <div className="border-b border-black/10" />
      </div>

      {/* LYRICS (scrollable) */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain mx-auto w-full max-w-[1024px] px-4 pt-4 scrollbar-minimal">
        <LyricsSection
          verseTitle="VERSE 1"
          guesses={guesses}
          onActiveClueChange={setActiveClue}
        />
      </div>

      {/* Divider between lyrics and footer */}
      <div className="border-t border-black/10" />

      {/* FOOTER */}
      <div className="shrink-0 w-full">
        <div className="py-3 text-center" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.08)", background: "#000" }}>
          <p className="text-xs font-medium" style={{ color: "#FFFF64" }}>
            POWERED BY KIIKU © 2025
          </p>
        </div>
      </div>
    </div>
  )
}
