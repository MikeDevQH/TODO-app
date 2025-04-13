import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TasksProvider } from "@/components/tasks-provider"
import { TasksArea } from "@/components/tasks-area"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <TasksProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <AnimatedBackground />
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <TasksArea />
        </div>
      </div>
    </TasksProvider>
  )
}
