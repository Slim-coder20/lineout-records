type ArtistDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistDetails({ params }: ArtistDetailsPageProps) {
  const { slug } = await params;
  return (
    <div>ArtistDetails</div>
  )
}
