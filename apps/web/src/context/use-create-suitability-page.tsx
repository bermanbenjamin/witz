'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createContext, type ReactNode, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  type CreateSuitabilityRequest,
  createSuitabilityService,
} from '@/http/suitability/create-suitability'
import { appRoutes } from '@/lib/constants'

interface CreateSuitabilityPageProviderProps {
  children: ReactNode
}

const formSchema = z.record(z.string(), z.array(z.number()))

type CreateSuitabilityFormValues = z.infer<typeof formSchema>

interface CreateSuitabilityPageContextProps {
  step: number
  onStepClick: (index: number) => void
  onNextStepClick: () => void
  form: ReturnType<typeof useForm>
  onSubmit: (values: CreateSuitabilityFormValues) => void
  isCheckedTerms: boolean
  onCheckTerms: () => void
  isPending: boolean
  assignTerms: () => void
}

const CreateSuitabilityPageContext =
  createContext<CreateSuitabilityPageContextProps>(
    {} as CreateSuitabilityPageContextProps,
  )

export function CreateSuitabilityPageProvider({
  children,
}: CreateSuitabilityPageProviderProps) {
  const router = useRouter()

  const form = useForm<CreateSuitabilityFormValues>({
    resolver: zodResolver(formSchema),
  })

  const [step, setStep] = useState(0)
  const [isCheckedTerms, setIsCheckedTerms] = useState(false)

  const { mutate: createSuitability, isPending } = useMutation({
    mutationKey: ['createSuitability'],
    mutationFn: async (questions: CreateSuitabilityRequest) =>
      await createSuitabilityService(questions),
    onSuccess: () => {
      toast.success('Suitability criado com sucesso!')
      router.push(appRoutes.suitability)
    },
  })

  function onSubmit(values: CreateSuitabilityFormValues) {
    if (!isCheckedTerms) {
      toast.error(`Por favor, aceite os termos e condições para continuar.`)
      return
    }

    const parsedValues = Object.entries(values).map(
      ([, choosedAlternativesId], index) => ({
        questionId: index + 1,
        choosedAlternativesId,
      }),
    )

    createSuitability({ questions: parsedValues })
  }

  function onCheckTerms() {
    setIsCheckedTerms((prev) => !prev)
  }

  function onStepClick(index: number) {
    setStep(index)
  }

  function onNextStepClick() {
    setStep((prev) => prev + 1)
  }

  function assignTerms() {
    for (const [, value] of Object.entries(form.getValues()) as Array<
      [string, number[]]
    >) {
      if (value.length === 0) {
        toast.error(`Por favor, responda todas as perguntas para continuar.`)
        return
      }
    }

    onNextStepClick()
  }

  return (
    <CreateSuitabilityPageContext.Provider
      value={{
        step,
        onStepClick,
        onNextStepClick,
        form,
        onSubmit,
        isCheckedTerms,
        onCheckTerms,
        isPending,
        assignTerms,
      }}
    >
      {children}
    </CreateSuitabilityPageContext.Provider>
  )
}

export function useCreateSuitabilityPageContext() {
  const context = useContext(CreateSuitabilityPageContext)

  if (!context) {
    throw new Error(
      'useCreateSuitabilityPageContext must be used within a CreateSuitabilityPageProvider',
    )
  }

  return context
}
