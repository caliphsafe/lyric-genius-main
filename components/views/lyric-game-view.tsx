"use client"

import { useState, useEffect } from "react"
import { GameHeader } from "@/components/patterns/game-header"
import { LyricsSection } from "@/components/patterns/lyrics-section"
import { AudioPlayer } from "@/components/patterns/audio-player"

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

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // in seconds
  const [duration] = useState(120) // 2:00 in seconds

  // drives banner text in GameHeader
  const [activeClue, setActiveClue] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const guesses = [
    { id: "guess0", value: guess0, onChange: setGuess0, correctAnswer: "bitch", clue: "A FEMALE DOG", showTooltip: false },
    { id: "guess1", value: guess1, onChange: setGuess1, correctAnswer: "court", clue: "WHERE PEOPLE PLAY BASKETBALL, OR GET SUED", showTooltip: false },
    { id: "guess2", value: guess2, onChange: setGuess2, correctAnswer: "first", clue: "NUMBER ONE, BEFORE ALL OTHERS", showTooltip: false },
    { id: "guess3", value: guess3, onChange: setGuess3, correctAnswer: "rug", clue: "FLOOR COVERING, ANOTHER WORD FOR A CARPET", showTooltip: false },
    { id: "guess4", value: guess4, onChange: setGuess4, correctAnswer: "budden", clue: "JOE ______ PODCAST, 'SUDDEN' WITH A B", showTooltip: false },
    { id: "guess5", value: guess5, onChange: setGuess5, correctAnswer: "buttercup", clue: "THE GREEN POWERPUFF GIRL", showTooltip: false },
    { id: "guess6", value: guess6, onChange: setGuess6, correctAnswer: "butternut", clue: "TYPE OF SQUASH, RHYMES WITH THE PREVIOUS ANSWER", showTooltip: false },
    { id: "guess7", value: guess7, onChange: setGuess7, correctAnswer: "friend", clue: "SOMEONE CLOSE TO YOU, OPPOSITE OF AN ENEMY", showTooltip: false },
    { id: "guess8", value: guess8, onChange: setGuess8, correctAnswer: "cuddle", clue: "HUGGING AND HOLDING EACH OTHER IN BED", showTooltip: false },
    { id: "guess9", value: guess9, onChange: setGuess9, correctAnswer: "polygamy", clue: "MARRIAGE PRACTICE WITH MULTIPLE SPOUSES", showTooltip: false },
    { id: "guess10", value: guess10, onChange: setGuess10, correctAnswer: "sin", clue: "WHAT YOU COMMIT WHEN YOU DO SOMETHING WRONG IN RELIGION", showTooltip: false },
    { id: "guess11", value: guess11, onChange: setGuess11, correctAnswer: "dead", clue: "THE OPPOSITE OF BEING ALIVE", showTooltip: false },
    { id: "guess12", value: guess12, onChange: setGuess12, correctAnswer: "kid", clue: "YOUNG PERSON OR CHILD, A BABY GOAT", showTooltip: false },
    { id: "guess13", value: guess13, onChange: setGuess13, correctAnswer: "gang", clue: "A GROUP OF CRIMINALS, STREET CREW", showTooltip: false },
    { id: "guess14", value: guess14, onChange: setGuess14, correctAnswer: "adore", clue: "TO LOVE OR ADMIRE GREATLY", showTooltip: false },
    { id: "guess15", value: guess15, onChange: setGuess15, correctAnswer: "adhd", clue: "THE ACRONYM FOR ATTENTION DEFICIT HYPERACTIVITY DISORDER", showTooltip: false },
    { id: "guess16", value: guess16, onChange: setGuess16, correctAnswer: "ignore", clue: "TO PAY NO ATTENTION TO SOMEONE, BRUSH THEM OFF", showTooltip: false },
    { id: "guess17", value: guess17, onChange: setGuess17, correctAnswer: "anaconda", clue: " A KIND OF SNAKE THAT IS VERY LARGE", showTooltip: false },
    { id: "guess18", value: guess18, onChange: setGuess18, correctAnswer: "twerking", clue: "A DANCE MOVE THAT INVOLVES ROTATING THE BUTTOCKS, SHAKING BOOTY", showTooltip: false },
    { id: "guess19", value: guess19, onChange: setGuess19, correctAnswer: "squirting", clue: "TO EJECT LIQUID IN A STREAM", showTooltip: false },
    { id: "guess20", value: guess20, onChange: setGuess20, correctAnswer: "cursive", clue: "JOINED-UP HANDWRITING STYLE", showTooltip: false },
    { id: "guess21", value: guess21, onChange: setGuess21, correctAnswer: "polygamy", clue: "MARRIAGE PRACTICE WITH MULTIPLE SPOUSES", showTooltip: false },
    { id: "guess22", value: guess22, onChange: setGuess22, correctAnswer: "sin", clue: "WHAT YOU COMMIT WHEN YOU DO SOMETHING WRONG IN RELIGION", showTooltip: false },
    { id: "guess23", value: guess23, onChange: setGuess23, correctAnswer: "dead", clue: "THE OPPOSITE OF BEING ALIVE", showTooltip: false },
    { id: "guess24", value: guess24, onChange: setGuess24, correctAnswer: "kid", clue: "YOUNG PERSON OR CHILD, A BABY GOAT", showTooltip: false },
    { id: "guess25", value: guess25, onChange: setGuess25, correctAnswer: "gang", clue: "A GROUP OF CRIMINALS, STREET CREW", showTooltip: false },
    { id: "guess26", value: guess26, onChange: setGuess26, correctAnswer: "wife", clue: "A SPOUSE THAT IS A WOMAN", showTooltip: false },
    { id: "guess27", value: guess27, onChange: setGuess27, correctAnswer: "love", clue: "THE PUREST FEELING ON EARTH, THE OPPOSITE OF HATE", showTooltip: false },
    { id: "guess28", value: guess28, onChange: setGuess28, correctAnswer: "matching", clue: "COORDINATING, COLORS / CLOTHES THAT GO TOGETHER", showTooltip: false },
    { id: "guess29", value: guess29, onChange: setGuess29, correctAnswer: "matching", clue: "THE OPPOSITE OF HEAVEN, WHERE SINNERS GO IN RELIGION", showTooltip: false },
    { id: "guess30", value: guess30, onChange: setGuess30, correctAnswer: "termite", clue: "A SMALL BUG THAT IS KNOWN FOR EATING THROUGH WOOD", showTooltip: false },
    { id: "guess31", value: guess31, onChange: setGuess31, correctAnswer: "baobab", clue: "THE MAGNIFICENT AFRICAN 'TREE OF LIFE' KNOWN FOR ITS ENORMOUS, WATER-STORING TRUNKS AND NUTRITIOUS FRUIT", showTooltip: false },
  ]

  const handleStartGame = () => {
    console.log("[v0] Game started")
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentTime(0)
    console.log("[v0] Previous track")
  }

  const handleNext = () => {
    setCurrentTime(duration)
    setIsPlaying(false)
    console.log("[v0] Next track")
  }

  const handleSeek = (progress: number) => {
    const newTime = Math.floor((progress / 100) * duration)
    setCurrentTime(newTime)
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFF64" }}>
      {/* STICKY TOP: LOGO + HEADER/BANNER */}
      <div className="sticky top-0 z-40 w-full" style={{ backgroundColor: "#FFFF64" }}>
        <div className="mx-auto max-w-[1024px] px-4 pt-4 pb-3">
          <div className="flex justify-center mb-3">
            {/* ~60% logo width (w-32 → w-20) */}
            <img src="/lyric-genius-logo.svg" alt="Lyric Genius" className="w-20 h-auto" />
          </div>

          <GameHeader activeClue={activeClue} />
        </div>
        <div className="border-t border-black/10" />
      </div>

      {/* LYRICS (the only thing that scrolls visually) */}
      <div className="mx-auto w-full max-w-[1024px] px-4 pt-4 pb-36">
        {/* extra bottom padding so last lines aren’t hidden behind sticky bottom */}
        <LyricsSection
          verseTitle="VERSE 1"
          guesses={guesses}
          currentTime={currentTime}
          onActiveClueChange={setActiveClue}
        />
      </div>

      {/* STICKY BOTTOM: PLAYER + FOOTER */}
      <div className="sticky bottom-0 z-40 w-full">
        <div className="w-full" style={{ backgroundColor: "#FFFF64" }}>
          <div className="mx-auto max-w-[1024px] w-full px-4 pt-3 pb-3 border-t border-black/10">
            <AudioPlayer
              currentTime={formatTime(currentTime)}
              totalTime={formatTime(duration)}
              progress={progress}
              isPlaying={isPlaying}
              onPrevious={handlePrevious}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onSeek={handleSeek}
              albumTitle="Polygamy"
              artist="Caliph"
              albumArt="/polygamy-album.png"
            />

          </div>
        </div>

        <div className="py-3 text-center" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.08)", background: "#000" }}>
          <p className="text-xs font-medium" style={{ color: "#FFFF64" }}>
            POWERED BY KIIKU © 2025
          </p>
        </div>
      </div>
    </div>
  )
}
