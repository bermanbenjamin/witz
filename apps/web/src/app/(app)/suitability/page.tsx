'use client'

import { Icons } from '@/components/icons'
import { suitabilityInitialText } from '@/lib/constants'

import SuitabilityHeader from './components/suitability-header'
import SuitabilityHistory from './components/suitability-history'

export default function SuitabilityPage() {
  return (
    <section className="w-full">
      <SuitabilityHeader />

      <div className="w-full mt-4">
        <span className="text-justify flex flex-col whitespace-pre-wrap">
          {suitabilityInitialText}
        </span>
      </div>

      <div className="flex flex-col gap-y-5 mt-12">
        <div className="flex items-center space-x-1">
          <Icons.fileArchive className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Histórico</h1>
        </div>
        <SuitabilityHistory />
      </div>
    </section>
  )
}
