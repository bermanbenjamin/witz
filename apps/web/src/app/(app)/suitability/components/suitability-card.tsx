'use client'

import { Icons } from '@/components/icons'
import { generatePDF } from '@/hooks/generate-pdf'

interface SuitabilityCardProps {
  createdAt: Date
}
export default function SuitabilityCard({ createdAt }: SuitabilityCardProps) {
  const year = new Date(createdAt).getFullYear()


  const handleDownload = async () => {
    const pdfUrl = await generatePDF("Gerar modelo");
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `witz_wealth_suitability_${year}.pdf`;
    link.click();
  };


  return (
    <button onClick={handleDownload}>
      <div className="flex cursor-pointer flex-col space-y-2">
        <div className="flex flex-col items-center justify-center gap-y-2 rounded-md border border-dashed border-secondary bg-card-foreground p-11">
          <Icons.cloudDownload className="h-10 w-10 text-primary" />
          <span className="text-center text-sm">Relatório-{year}.pdf</span>
        </div>
      </div>
    </button>
  )
}
