"use client"

import { useState } from "react"
import { type Task, useTasks } from "@/components/tasks-provider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { TaskForm } from "@/components/task-form"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
  categoryId: string
}

export function TaskCard({ task, categoryId }: TaskCardProps) {
  const { toggleTaskCompletion, deleteTask } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
  }

  const priorityBgColors = {
    low: "bg-green-500/10",
    medium: "bg-yellow-500/10",
    high: "bg-red-500/10",
  }

  if (isEditing) {
    return <TaskForm categoryId={categoryId} task={task} onClose={() => setIsEditing(false)} />
  }

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 overflow-hidden card-hover",
        task.completed ? (isHovered ? "opacity-60" : "opacity-40") : "",
      )}
      style={{ borderLeftWidth: "4px", borderLeftColor: task.color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(categoryId, task.id)}
            className="mt-1 transition-all duration-300 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
          />
          <div>
            <h3
              className={cn(
                "font-medium text-base transition-all",
                task.completed ? "line-through text-muted-foreground" : "",
              )}
            >
              {task.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(task.date), "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
            onClick={() => deleteTask(categoryId, task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className={cn("text-sm text-muted-foreground", task.completed ? "line-through" : "")}>{task.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
              priorityColors[task.priority],
              priorityBgColors[task.priority],
            )}
          >
            <Clock className="h-3 w-3" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
