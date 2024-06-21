import { Icons } from '@/components/icons'

interface SuitabilityCardProps {
  createdAt: Date
}
export default function SuitabilityCard({ createdAt }: SuitabilityCardProps) {
  const year = new Date(createdAt).getFullYear()

  return (
    <div className="flex cursor-pointer flex-col space-y-2">
      <div className="flex flex-col items-center justify-center gap-y-2 rounded-md border border-dashed border-secondary bg-card-foreground p-11">
        <Icons.cloudDownload className="h-10 w-10 text-primary" />
        <span className="text-center text-sm">Relatório-{year}.pdf</span>
      </div>
    </div>
  )
}
