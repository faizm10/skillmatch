import TeamPage from '@/components/TeamPage'

export default async function HackathonTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <TeamPage hackathonId={id} />
} 

