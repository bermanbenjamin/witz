import { Icons } from '@/components/icons'

export default function SuitabilityCard() {
  return (
    <div className="flex cursor-pointer flex-col space-y-2">
      <span className="text-sm font-bold">2023</span>
      <div className="flex flex-col items-center justify-center gap-y-2 rounded-md border border-dashed border-secondary bg-card-foreground p-11">
        <Icons.cloudDownload className="h-10 w-10 text-primary" />
        <span className="text-center text-sm">Relatório-2023.pdf</span>
      </div>
    </div>
  )
}
