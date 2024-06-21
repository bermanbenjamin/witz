import { questions } from '@witz/api/src/constants/question'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreateSuitabilityPageContext } from '@/context/use-create-suitability-page'

export default function SuitabilitySecondStep() {
  const { form, assignTerms } = useCreateSuitabilityPageContext()

  return (
    <div className='w-full'>
    <div className='grid grid-cols-2 gap-x-20 gap-y-8'>
      {questions.slice(6).map((question) => (
        <FormItem key={question.questionNumber}>
          <div className="mb-4">
            <FormLabel className="text-base">{question.name}</FormLabel>
          </div>
          {question.alternatives.map((alternative) => {
            return (
              <FormField
                key={alternative.alternativeNumber}
                control={form.control}
                name={`${question.name}`}
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                          checked={field.value?.includes(alternative.alternativeNumber)}
                          onCheckedChange={(checked) => {
                            if (checked && question.isMultipleChoices) {
                              return field.onChange([...field.value, alternative.alternativeNumber])
                            }
                            if (checked) {
                              return field.onChange([alternative.alternativeNumber])
                            }
                            if (!question.isMultipleChoices) {
                              return field.onChange(
                                field.value.filter(
                                  (value: number) => value !== alternative.alternativeNumber
                                )
                              )
                            }
                          }}
                        />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{alternative.text}</FormLabel>
                  </FormItem>
                )}
              />
            )
          })}
          <FormMessage />
        </FormItem>
      ))}

    </div>

    <div className='flex w-full mt-8 justify-end'>
      <Button onClick={assignTerms}>Assinar termos</Button>
    </div>
    
    </div>
  )
}
