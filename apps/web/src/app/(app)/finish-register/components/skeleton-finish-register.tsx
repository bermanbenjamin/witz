import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonFinishRegister() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-semibold text-xl">Finalizar Cadastro</h1>
      <div className="max-w-[600px] w-full flex flex-col">
        <Skeleton className="w-full h-8 mt-6" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-8" />
          ))}
        </div>
      </div>
    </div>
  )
}
