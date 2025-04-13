"use client"

import type React from "react"

import { useState } from "react"
import { type Task, type Priority, useTasks } from "@/components/tasks-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TaskFormProps {
  categoryId: string
  task?: Task
  onClose: () => void
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#6366f1", // indigo
]

export function TaskForm({ categoryId, task, onClose }: TaskFormProps) {
  const { addTask, updateTask } = useTasks()
  const [name, setName] = useState(task?.name || "")
  const [description, setDescription] = useState(task?.description || "")
  const [date, setDate] = useState<Date | undefined>(task?.date ? new Date(task.date) : new Date())
  const [priority, setPriority] = useState<Priority>(task?.priority || "medium")
  const [color, setColor] = useState(task?.color || COLORS[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !date) return

    const taskData = {
      name,
      description,
      date: date.toISOString(),
      priority,
      color,
    }

    if (task) {
      updateTask(categoryId, { ...taskData, id: task.id, completed: task.completed })
    } else {
      addTask(categoryId, taskData)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="w-full max-w-md modern-shadow border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none rounded-lg" />
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="gradient-text">{task ? "Edit Task" : "Add Task"}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-red-500/10 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter task name"
                  className="focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                  className="resize-none focus:ring-2 focus:ring-blue-500 transition-all"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all hover:bg-blue-500/10 hover:border-blue-500/50",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <RadioGroup value={priority} onValueChange={(value) => setPriority(value as Priority)} className="flex">
                  <div className="flex items-center space-x-2 mr-4">
                    <RadioGroupItem
                      value="low"
                      id="low"
                      className="text-green-500 border-green-500 focus:ring-green-500"
                    />
                    <Label htmlFor="low" className="text-green-500 font-medium">
                      Low
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mr-4">
                    <RadioGroupItem
                      value="medium"
                      id="medium"
                      className="text-yellow-500 border-yellow-500 focus:ring-yellow-500"
                    />
                    <Label htmlFor="medium" className="text-yellow-500 font-medium">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" className="text-red-500 border-red-500 focus:ring-red-500" />
                    <Label htmlFor="high" className="text-red-500 font-medium">
                      High
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={cn(
                        "w-8 h-8 rounded-full transition-all hover:scale-110",
                        color === c ? "ring-2 ring-offset-2 ring-blue-600" : "",
                      )}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all button-transition"
              >
                {task ? "Update Task" : "Add Task"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
