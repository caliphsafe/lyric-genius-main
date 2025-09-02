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
  const [guess19, setGuess19] = useState("") // rug
  const [guess20, setGuess20] = useState("") // cuddle
  const [guess21, setGuess21] = useState("") // dead
  const [guess22, setGuess22] = useState("") // kid
  const [guess23, setGuess23] = useState("") // sin
  const [guess24, setGuess24] = useState("") // gang
  const [guess25, setGuess25] = useState("") // adore
  const [guess26, setGuess26] = useState("") // adhd
  const [guess27, setGuess27] = useState("") // ignore
  const [guess28, setGuess28] = useState("") // anaconda
  const [guess29, setGuess29] = useState("") // twerking
  const [guess30, setGuess30] = useState("") // squirting
  const [guess31, setGuess31] = useState("") // cursive
  const [guess32, setGuess32] = useState("") // NEW: immigrant

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
    { id: "guess0", value: guess0, onChange: setGuess0, correctAnswer: "bitch", clue: "A female dog", showTooltip: false },
    { id: "guess1", value: guess1, onChange: setGuess1, correctAnswer: "court", clue: "Where people play basketball, or get sued", showTooltip: false },
    { id: "guess2", value: guess2, onChange: setGuess2, correctAnswer: "first", clue: "Number one, before all others", showTooltip: false },
    { id: "guess3", value: guess3, onChange: setGuess3, correctAnswer: "rug", clue: "Floor covering, another word for a carpet", showTooltip: false },
    { id: "guess4", value: guess4, onChange: setGuess4, correctAnswer: "budden", clue: "Joe ______ Podcast, 'sudden' with a B", showTooltip: false },
    { id: "guess5", value: guess5, onChange: setGuess5, correctAnswer: "buttercup", clue: "The green Powerpuff Girl", showTooltip: false },
    { id: "guess6", value: guess6, onChange: setGuess6, correctAnswer: "butternut", clue: "Type of squash, rhymes with the previous answer", showTooltip: false },
    { id: "guess7", value: guess7, onChange: setGuess7, correctAnswer: "friend", clue: "Someone close to you, opposite of an enemy", showTooltip: false },
    { id: "guess8", value: guess8, onChange: setGuess8, correctAnswer: "cuddle", clue: "Hugging and holding each other in bed", showTooltip: false },
    { id: "guess9", value: guess9, onChange: setGuess9, correctAnswer: "polygamy", clue: "Marriage practice with multiple spouses", showTooltip: false },
    { id: "guess10", value: guess10, onChange: setGuess10, correctAnswer: "sin", clue: "What you commit when you do something wrong in religion", showTooltip: false },
    { id: "guess11", value: guess11, onChange: setGuess11, correctAnswer: "dead", clue: "The opposite of being alive", showTooltip: false },
    { id: "guess12", value: guess12, onChange: setGuess12, correctAnswer: "kid", clue: "Young person or child, a baby goat", showTooltip: false },
    { id: "guess13", value: guess13, onChange: setGuess13, correctAnswer: "gang", clue: "A group of criminals, street crew", showTooltip: false },
    { id: "guess14", value: guess14, onChange: setGuess14, correctAnswer: "adore", clue: "To love or admire greatly", showTooltip: false },
    { id: "guess15", value: guess15, onChange: setGuess15, correctAnswer: "adhd", clue: "The acronym for attention deficit hyperactivity disorder", showTooltip: false },
    { id: "guess16", value: guess16, onChange: setGuess16, correctAnswer: "ignore", clue: "To pay no attention to someone, brush them off", showTooltip: false },
    { id: "guess17", value: guess17, onChange: setGuess17, correctAnswer: "anaconda", clue: " A kind of snake that is very large", showTooltip: false },
    { id: "guess18", value: guess18, onChange: setGuess18, correctAnswer: "twerking", clue: "A dance move that involves rotating the buttocks, shaking booty", showTooltip: false },
    { id: "guess19", value: guess19, onChange: setGuess19, correctAnswer: "squirting", clue: "To eject liquid in a stream", showTooltip: false },
    { id: "guess20", value: guess20, onChange: setGuess20, correctAnswer: "cursive", clue: "Joined-up handwriting style", showTooltip: false },
    { id: "guess21", value: guess21, onChange: setGuess21, correctAnswer: "polygamy", clue: "Marriage practice with multiple spouses", showTooltip: false },
    { id: "guess22", value: guess22, onChange: setGuess22, correctAnswer: "sin", clue: "What you commit when you do something wrong in religion", showTooltip: false },
    { id: "guess23", value: guess23, onChange: setGuess23, correctAnswer: "dead", clue: "The opposite of being alive", showTooltip: false },
    { id: "guess24", value: guess24, onChange: setGuess24, correctAnswer: "kid", clue: "Young person or child, a baby goat", showTooltip: false },
    { id: "guess25", value: guess25, onChange: setGuess25, correctAnswer: "gang", clue: "A group of criminals, street crew", showTooltip: false },
    { id: "guess26", value: guess26, onChange: setGuess26, correctAnswer: "wife", clue: "A spouse that is a woman", showTooltip: false },
    { id: "guess27", value: guess27, onChange: setGuess27, correctAnswer: "love", clue: "The purest feeling on earth, the opposite of hate", showTooltip: false },
    { id: "guess28", value: guess28, onChange: setGuess28, correctAnswer: "matching", clue: "Coordinating, colors / clothes that go together", showTooltip: false },
    { id: "guess29", value: guess29, onChange: setGuess29, correctAnswer: "matching", clue: "The opposite of heaven, where sinners go in religion", showTooltip: false },
    { id: "guess30", value: guess30, onChange: setGuess30, correctAnswer: "termite", clue: "A small bug that is known for eating through wood", showTooltip: false },
    { id: "guess31", value: guess31, onChange: setGuess31, correctAnswer: "baobab", clue: "the magnificent African 'Tree of Life' known for its enormous, water-storing trunks and nutritious fruit", showTooltip: false },
    { id: "guess32", value: guess32, onChange: setGuess32, correctAnswer: "immigrant", clue: "A person who comes to live permanently in a foreign country", showTooltip: false },
  ]

  const handleStartGame = () => {
    console.log("[v0] Game started")
  }

  const handlePlayPause = () => setIsPlaying(!isPlaying)

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
      <div className="flex-1 flex flex-col pb-6 mx-auto max-w-[1024px] pt-8 px-4">
        <div className="flex justify-center mb-8">
          <img src="/lyric-genius-logo.svg" alt="Lyric Genius" className="w-32 h-auto" />
        </div>

        <GameHeader
          albumTitle="Polygamy"
          artist="Caliph"
          duration="3:40"
          albumArt="/polygamy-album.png"
          activeClue={activeClue}
          onStartGame={handleStartGame}
        />

        <div className="mb-8" />

        <LyricsSection
          verseTitle="VERSE 1"
          guesses={guesses}
          currentTime={currentTime}
          onActiveClueChange={setActiveClue}
        />

        <div className="mt-8">
          <AudioPlayer
            currentTime={formatTime(currentTime)}
            totalTime={formatTime(duration)}
            progress={progress}
            isPlaying={isPlaying}
            onPrevious={handlePrevious}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onSeek={handleSeek}
          />
        </div>
      </div>

      <div className="py-4 text-center" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.08)", background: "#000" }}>
        <p className="text-sm font-medium" style={{ color: "#FFFF64" }}>
          POWERED BY KIIKU © 2025
        </p>
      </div>
    </div>
  )
}
