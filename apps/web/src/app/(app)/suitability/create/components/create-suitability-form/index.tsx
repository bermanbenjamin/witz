'use client'

import { questions } from '@witz/api/src/constants/question'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useFormCreateSuitability } from './use-form-create-suitability'

export function CheckboxReactHookFormMultiple() {
  const { form, onSubmit } = useFormCreateSuitability()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((question) => (
          <FormItem key={question.questionNumber}>
            <div className="mb-4">
              <FormLabel className="text-base">{question.name}</FormLabel>
            </div>
            {
              question.alternatives.map((alternative) => {

                return (<FormField
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
                              return field.onChange([...field.value, alternative.alternativeNumber]);
                            }
                            if (checked) {
                              return field.onChange([alternative.alternativeNumber]);
                            }
                            if (!question.isMultipleChoices) {
                              return field.onChange(field.value.filter(value => value !== alternative.alternativeNumber));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {alternative.text}
                      </FormLabel>
                    </FormItem>
                  )}
                />)
              })}
            <FormMessage />
          </FormItem>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
