import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { TasksProvider } from "@/components/tasks-provider"
import { TasksArea } from "@/components/tasks-area"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <TasksProvider>
      <AnimatedBackground />
      <div className="flex flex-col h-screen overflow-hidden bg-background/50 backdrop-blur-[1px]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <TasksArea />
        </div>
      </div>
    </TasksProvider>
  )
}
