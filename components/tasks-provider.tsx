"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { v4 as uuidv4 } from "uuid"

export type Priority = "low" | "medium" | "high"

export interface Task {
  id: string
  name: string
  description: string
  date: string
  priority: Priority
  color: string
  completed: boolean
}

export interface Category {
  id: string
  name: string
  color: string
  tasks: Task[]
}

interface TasksContextType {
  categories: Category[]
  activeCategory: string | null
  setActiveCategory: (id: string | null) => void
  addCategory: (name: string, color: string) => void
  updateCategory: (id: string, name: string, color: string) => void
  deleteCategory: (id: string) => void
  addTask: (categoryId: string, task: Omit<Task, "id" | "completed">) => void
  updateTask: (categoryId: string, task: Task) => void
  deleteTask: (categoryId: string, taskId: string) => void
  toggleTaskCompletion: (categoryId: string, taskId: string) => void
  showCongratulations: boolean
  setShowCongratulations: (show: boolean) => void
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showCongratulations, setShowCongratulations] = useState(false)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories")
    const savedActiveCategory = localStorage.getItem("activeCategory")

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }

    if (savedActiveCategory) {
      setActiveCategory(savedActiveCategory)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    if (activeCategory) {
      localStorage.setItem("activeCategory", activeCategory)
    }
  }, [activeCategory])

  const addCategory = (name: string, color: string) => {
    const newCategory = {
      id: uuidv4(),
      name,
      color,
      tasks: [],
    }
    setCategories([...categories, newCategory])
    setActiveCategory(newCategory.id)
  }

  const updateCategory = (id: string, name: string, color: string) => {
    setCategories(categories.map((category) => (category.id === id ? { ...category, name, color } : category)))
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
    if (activeCategory === id) {
      const remainingCategories = categories.filter((category) => category.id !== id)
      setActiveCategory(remainingCategories.length > 0 ? remainingCategories[0].id : null)
    }
  }

  const addTask = (categoryId: string, task: Omit<Task, "id" | "completed">) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: [...category.tasks, { ...task, id: uuidv4(), completed: false }],
          }
        }
        return category
      }),
    )
  }

  const updateTask = (categoryId: string, updatedTask: Task) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          }
        }
        return category
      }),
    )
  }

  const deleteTask = (categoryId: string, taskId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.filter((task) => task.id !== taskId),
          }
        }
        return category
      }),
    )
  }

  const toggleTaskCompletion = (categoryId: string, taskId: string) => {
    let allCompleted = false

    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          const updatedTasks = category.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )

          // Check if all tasks are completed after the update
          allCompleted = updatedTasks.length > 0 && updatedTasks.every((task) => task.completed)

          return {
            ...category,
            tasks: updatedTasks,
          }
        }
        return category
      }),
    )

    // Show congratulations modal if all tasks are completed
    if (allCompleted) {
      setShowCongratulations(true)
    }
  }

  return (
    <TasksContext.Provider
      value={{
        categories,
        activeCategory,
        setActiveCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        showCongratulations,
        setShowCongratulations,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
