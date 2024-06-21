'use client'

import { Form } from '@/components/ui/form'
import { useCreateSuitabilityPageContext } from '@/context/use-create-suitability-page'

import SuitabilityFirstStep from './suitability-first-step'
import SuitabilitySecondStep from './suitability-second-step'
import SuitabilityTerms from './suitability-terms'

export function SuitabilityForm() {
  const { step, form, onSubmit } = useCreateSuitabilityPageContext()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        {step === 0 && <SuitabilityFirstStep />}
        {step === 1 && <SuitabilitySecondStep />}
        {step === 2 && <SuitabilityTerms />}
      </form>
    </Form>
  )
}
