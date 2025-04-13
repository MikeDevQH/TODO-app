"use client"

import { useState } from "react"
import { useTasks } from "@/components/tasks-provider"
import { TaskCard } from "@/components/task-card"
import { TaskForm } from "@/components/task-form"
import { CongratulationsModal } from "@/components/congratulations-modal"
import { Button } from "@/components/ui/button"
import { Plus, ListChecks } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TasksArea() {
  const { categories, activeCategory, showCongratulations, setShowCongratulations } = useTasks()
  const [isAddingTask, setIsAddingTask] = useState(false)

  const activeCategories = categories.find((category) => category.id === activeCategory)

  // Calculate completed and total tasks
  const totalTasks = activeCategories?.tasks.length || 0
  const completedTasks = activeCategories?.tasks.filter((task) => task.completed).length || 0

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {activeCategory ? (
        <>
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-500/5 to-blue-600/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeCategories?.color || "#3b82f6" }} />
              <h2 className="text-xl font-semibold gradient-text">{activeCategories?.name || "Tasks"}</h2>

              {/* Task counter */}
              <div className="ml-2 px-2 py-1 bg-blue-500/10 rounded-md text-xs font-medium text-blue-500">
                {completedTasks}/{totalTasks} completed
              </div>
            </div>
            <Button
              onClick={() => setIsAddingTask(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all button-transition"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Task
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCategories?.tasks.map((task) => (
                <TaskCard key={task.id} task={task} categoryId={activeCategory} />
              ))}
              {activeCategories?.tasks.length === 0 && !isAddingTask && (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <ListChecks className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="mb-4">No tasks yet. Create your first task!</p>
                  <Button
                    onClick={() => setIsAddingTask(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all button-transition"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
          {isAddingTask && <TaskForm categoryId={activeCategory} onClose={() => setIsAddingTask(false)} />}
          <CongratulationsModal isOpen={showCongratulations} onClose={() => setShowCongratulations(false)} />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4">
            <ListChecks className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 gradient-text">No category selected</h2>
          <p className="mb-4">Create a category or select one to start adding tasks.</p>
        </div>
      )}
    </div>
  )
}
