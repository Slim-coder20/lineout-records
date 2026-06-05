/**
 * =============================================================================
 * IMAGE ARTISTE / PRODUCTION — components/ArtistImage.tsx
 * =============================================================================
 * QUOI   : Affiche une image (pochette ou photo artiste).
 * POURQUOI : next/image optimise les fichiers locaux (/studios/…) mais refuse
 *            les URLs externes non configurées → fallback <img> si URL externe.
 * =============================================================================
 */
import Image from "next/image";

type ArtistImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string; // hint responsive pour next/image
  priority?: boolean; // true = charger en priorité (above the fold)
};

export default function ArtistImage({
  src,
  alt,
  className = "object-cover",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ArtistImageProps) {
  // Chemins locaux (/public/...) → optimisation Next.js
  const isOptimizable = src.startsWith("/");

  if (isOptimizable) {
    return (
      <Image
        src={src}
        alt={alt}
        fill // remplit le conteneur parent (doit être position: relative)
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  // URLs externes (Cloudinary, etc.) → balise img classique
  return (
    // eslint-disable-next-line @next/next/no-img-element -- URLs externes (Cloudinary, etc.)
    <img src={src} alt={alt} className={`h-full w-full ${className}`} />
  );
}
