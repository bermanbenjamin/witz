import { Button } from '@/components/ui/button'

export default function FiltersUser() {
  return (
    <aside className="w-full max-w-56 border-r border-r-card-foreground pl-2 pr-3">
      <div className="flex items-center justify-between">
        <h2>Filtros</h2>
        <Button variant="link">Aplicar</Button>
      </div>
    </aside>
  )
}
