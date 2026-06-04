import Image from "next/image";
import brandIcon from "@/app/icon.png";
export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex justify-center md:justify-end ">
          <Image
            src={brandIcon}
            alt="LineOut Records"
            width={280}
            height={280}
            className="rounded-full ring-4 ring-brand-accent/50"
            priority
          />
        </div>
      </div>
    </main>
  );
}
