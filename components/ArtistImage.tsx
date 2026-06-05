/**
 * Image artiste : next/image pour les fichiers locaux (/...), <img> pour URLs externes.
 */
import Image from "next/image";

type ArtistImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ArtistImage({
  src,
  alt,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ArtistImageProps) {
  const isOptimizable = src.startsWith("/");

  if (isOptimizable) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- URLs externes (Cloudinary, etc.)
    <img src={src} alt={alt} className={`h-full w-full ${className}`} />
  );
}
