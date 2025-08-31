import Image from "next/image"

interface AlbumCardProps {
  title: string
  artist: string
  duration: string
  albumArt: string
  altText: string
}

export function AlbumCard({ title, artist, duration, albumArt, altText }: AlbumCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={albumArt || "/placeholder.svg"}
          alt={altText}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-black mb-1">{title}</h1>
        <p className="text-xl text-black">
          {artist} <span className="text-gray-600">{duration}</span>
        </p>
      </div>
    </div>
  )
}
