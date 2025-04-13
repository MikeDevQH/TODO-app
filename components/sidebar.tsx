"use client"

import { useState, useEffect } from "react"
import { Plus, Folder, Trash2, Edit, Check, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTasks } from "@/components/tasks-provider"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function Sidebar() {
  const { categories, activeCategory, setActiveCategory, addCategory, deleteCategory, updateCategory } = useTasks()
  const [newCategory, setNewCategory] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingColor, setEditingColor] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

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

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }

  const SidebarContent = () => (
    <div
      className={cn("w-full h-full flex flex-col bg-background/95 backdrop-blur", isMobile ? "border-r-0" : "border-r")}
    >
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
                className="flex-1 hover:bg-red-500/10 hover:text-red-500 transition-colors hover-scale"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAddCategory}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all hover-scale"
              >
                <Check className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all hover-scale"
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
                      className="flex-1 hover:bg-red-500/10 hover:text-red-500 transition-colors hover-scale"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleUpdateCategory}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all hover-scale"
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
                  onClick={() => handleCategoryClick(category.id)}
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
                      className="h-7 w-7 hover:bg-white/20 transition-colors hover-scale"
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
                      className="h-7 w-7 hover:bg-white/20 transition-colors hover-scale"
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

  // Mobile sidebar with Sheet component
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-3 bottom-3 z-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white shadow-lg hover-scale"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="p-0 w-[260px] sm:w-[320px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block w-64 h-[calc(100vh-4rem)] shadow-md">
      <SidebarContent />
    </div>
  )
}
