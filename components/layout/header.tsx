import Image from "next/image"

export function Header() {
  return (
    <header className="px-5 py-4" style={{ backgroundColor: "#FFFF64" }}>
      <div className="flex justify-center">
        <Image src="/lyric-genius-logo.svg" alt="Lyric Genius" width={128} height={128} className="h-32 w-auto" />
      </div>
    </header>
  )
}
