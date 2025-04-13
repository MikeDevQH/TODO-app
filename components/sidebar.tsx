"use client"

import { useState } from "react"
import { Plus, Folder, Trash2, Edit, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTasks } from "@/components/tasks-provider"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { categories, activeCategory, setActiveCategory, addCategory, deleteCategory, updateCategory } = useTasks()
  const [newCategory, setNewCategory] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingColor, setEditingColor] = useState("")

  const COLORS = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#6366f1", // indigo
  ]

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim(), editingColor || COLORS[0])
      setNewCategory("")
      setEditingColor("")
      setIsAdding(false)
    }
  }

  const startEditing = (id: string, name: string, color: string) => {
    setEditingId(id)
    setEditingName(name)
    setEditingColor(color)
  }

  const handleUpdateCategory = () => {
    if (editingId && editingName.trim()) {
      updateCategory(editingId, editingName.trim(), editingColor)
      setEditingId(null)
    }
  }

  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[calc(100vh-4rem)] flex flex-col shadow-md">
      <div className="p-4 border-b bg-gradient-to-r from-blue-500/10 to-blue-600/10">
        <h2 className="text-lg font-semibold mb-2 gradient-text">Categories</h2>
        {isAdding ? (
          <div className="flex flex-col gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 modern-shadow">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="h-9 focus:ring-2 focus:ring-blue-500 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              autoFocus
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={cn(
                    "w-6 h-6 rounded-full transition-all hover:scale-110",
                    editingColor === c ? "ring-2 ring-offset-2 ring-blue-600" : "",
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => setEditingColor(c)}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAdding(false)}
                className="flex-1 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAddCategory}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all"
              >
                <Check className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all button-transition"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              {editingId === category.id ? (
                <div className="flex flex-col gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 modern-shadow">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="h-9 focus:ring-2 focus:ring-blue-500 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleUpdateCategory()}
                    autoFocus
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={cn(
                          "w-6 h-6 rounded-full transition-all hover:scale-110",
                          editingColor === c ? "ring-2 ring-offset-2 ring-blue-600" : "",
                        )}
                        style={{ backgroundColor: c }}
                        onClick={() => setEditingColor(c)}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                      className="flex-1 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleUpdateCategory}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all"
                    >
                      <Check className="h-4 w-4 mr-1" /> Update
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md cursor-pointer group card-hover",
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "hover:bg-blue-500/10 text-foreground",
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color || "#3b82f6" }} />
                    <Folder className="h-4 w-4" />
                    <span className="truncate">{category.name}</span>
                  </div>
                  <div
                    className={cn(
                      "opacity-0 group-hover:opacity-100 transition-opacity flex gap-1",
                      activeCategory === category.id ? "opacity-100" : "",
                    )}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 hover:bg-white/20 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(category.id, category.name, category.color || "#3b82f6")
                      }}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 hover:bg-white/20 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteCategory(category.id)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
