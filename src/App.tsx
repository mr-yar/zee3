import { ChangeBackground } from './components/change-background'
import { Button } from './components/ui/button'
import { useBackgroundStore } from './stores/useBackgroundStore'

function App() {
  const setOpen = useBackgroundStore((s) => s.setOpen)

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={() => setOpen(true)} className="bg-black text-white rounded-full px-6 h-11 hover:bg-black/90">
        Change background
      </Button>
      <ChangeBackground />
    </div>
  )
}

export default App
