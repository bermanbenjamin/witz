'use client'

import { useState } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

import { CheckboxReactHookFormMultiple } from './components/create-suitability-form'

interface BreadcrumbItemType {
  name: string
}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: "Passo 1",
  },
  {
    name: "Passo 2",
  },
  {
    name: "Termos e Condicoes",
  }
]

export default function CreateSuitabilityPage() {
  const [step, setStep] = useState(0)

  function handleStepClick(index: number) {
    setStep(index)
  }

  function handleNextStepClick() {
    if (step !== breadcrumbItems.length - 1) {
      setStep(step + 1)
    }
  }


  return (
    <div className='flex flex-col h-full'>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <span key={index} className='flex items-baseline font-semibold cursor-pointer'>
              {step !== index ? (
                <BreadcrumbItem onClick={() => handleStepClick(index)}>
                  {item.name}
                </BreadcrumbItem>
              ) : (
                <BreadcrumbPage className='text-primary font-bold' onClick={() => handleStepClick(index)}>
                  {item.name}
                </BreadcrumbPage>
              )}
              {index !== breadcrumbItems.length - 1 && <BreadcrumbSeparator className='ml-2' />}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <CheckboxReactHookFormMultiple />


      {step === breadcrumbItems.length - 1 ?
        <Button onClick={() => { handleNextStepClick() }} className='self-center'>Finalizar Suitability</Button> :
        <Button onClick={() => { handleNextStepClick() }} className='self-center'>Próximo passo</Button>}
    </div>
  )
}
