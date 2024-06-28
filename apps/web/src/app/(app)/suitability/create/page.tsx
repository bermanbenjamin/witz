'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  CreateSuitabilityPageProvider,
  useCreateSuitabilityPageContext,
} from '@/context/use-create-suitability-page'

import { SuitabilityForm } from './components/suitability-form'

interface BreadcrumbItemType {
  name: string
}

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: 'Passo 1',
  },
  {
    name: 'Passo 2',
  },
  {
    name: 'Termos e Condicoes',
  },
]

function CreateSuitabilityPageContent() {
  const { step, onStepClick, assignTerms } = useCreateSuitabilityPageContext()

  return (
    <div className="flex flex-col h-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <span
              key={index}
              className="flex items-baseline font-semibold cursor-pointer"
            >
              {step !== index ? (
                <BreadcrumbItem
                  onClick={() => {
                    if (index === 2) {
                      assignTerms()
                      return
                    }

                    onStepClick(index)
                  }}
                >
                  {item.name}
                </BreadcrumbItem>
              ) : (
                <BreadcrumbPage
                  className="text-primary font-bold"
                  onClick={() => onStepClick(index)}
                >
                  {item.name}
                </BreadcrumbPage>
              )}
              {index !== breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator className="ml-2" />
              )}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <SuitabilityForm />
    </div>
  )
}

export default function CreateSuitabilityPage() {
  return (
    <CreateSuitabilityPageProvider>
      <CreateSuitabilityPageContent />
    </CreateSuitabilityPageProvider>
  )
}
