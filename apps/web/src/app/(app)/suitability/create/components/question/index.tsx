import type { QuestionType } from '@witz/api/src/constants/question'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function Question({ name, alternatives }: QuestionType) {
  return (
    <div >
      <h2 className="text-xl font-semibold mb-6">{name}</h2>

      <Checkbox
        checked={field.value?.includes(item.id)}
        onCheckedChange={(checked) => {
          return checked
            ? field.onChange([...field.value, item.id])
            : field.onChange(
              field.value?.filter(
                (value) => value !== item.id
              )
            )
        }}
      />

      <RadioGroup defaultValue="comfortable">
        {
          alternatives.map(altern =>
            <div key={altern.alternativeNumber} className="flex items-center space-x-3 mb-1">
              <RadioGroupItem value={altern.text} id={altern.text} />
              <Label className='leading-relaxed' htmlFor={altern.text}>{altern.text}</Label>
            </div>
          )
        }

      </RadioGroup>
    </div>
  )
}
