"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useBackendlessData } from "./hooks/use-backendless"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Plus, Pencil, Trash2, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useVisualNotification } from "./visual-notification-provider"

interface Task {
  objectId?: string
  title: string
  description?: string
  completed?: boolean
  created?: string
  updated?: string
}

export function BackendlessData() {
  const { data: tasks, isLoading, error, fetchData, create, update, remove } = useBackendlessData<Task>("Tasks")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()
  const { success, error: showError } = useVisualNotification()

  // Refs for focus management
  const titleInputRef = useRef<HTMLInputElement>(null)
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const refreshButtonRef = useRef<HTMLButtonElement>(null)
  const dialogCloseButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Show error as visual notification if present
  useEffect(() => {
    if (error) {
      showError({
        title: "Data Error",
        message: error,
        duration: 8000,
      })
    }
  }, [error, showError])

  // Focus management for dialog
  useEffect(() => {
    if (isDialogOpen && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus()
      }, 100)
    }
  }, [isDialogOpen])

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setCurrentTask(task)
      setTitle(task.title)
      setDescription(task.description || "")
    } else {
      setCurrentTask(null)
      setTitle("")
      setDescription("")
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setCurrentTask(null)
    setTitle("")
    setDescription("")
    // Return focus to the appropriate button
    setTimeout(() => {
      if (currentTask) {
        // Find the edit button for this task and focus it
        document.querySelector(`[data-task-id="${currentTask.objectId}"][data-action="edit"]`)?.focus()
      } else {
        // Focus the add button
        addButtonRef.current?.focus()
      }
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    setIsSubmitting(true)
    try {
      const taskData: Task = {
        title,
        description: description || undefined,
        completed: false,
      }

      if (currentTask?.objectId) {
        await update(currentTask.objectId, taskData)
        success({
          title: "Task updated",
          message: "The task has been updated successfully.",
        })
      } else {
        await create(taskData)
        success({
          title: "Task created",
          message: "A new task has been created successfully.",
        })
      }

      await fetchData()
      handleCloseDialog()
    } catch (error: any) {
      showError({
        title: currentTask ? "Failed to update task" : "Failed to create task",
        message: error.message || "An error occurred.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      await remove(taskId)
      success({
        title: "Task deleted",
        message: "The task has been deleted successfully.",
      })
      await fetchData()
    } catch (error: any) {
      showError({
        title: "Failed to delete task",
        message: error.message || "An error occurred.",
      })
    }
  }

  const handleRefresh = () => {
    fetchData()
  }

  // Keyboard navigation for tasks
  const handleTaskKeyDown = (e: React.KeyboardEvent, taskId: string, action: "edit" | "delete") => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (action === "edit") {
        const task = tasks.find((t) => t.objectId === taskId)
        if (task) handleOpenDialog(task)
      } else if (action === "delete") {
        handleDelete(taskId)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage your tasks with Backendless</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              ref={refreshButtonRef}
              aria-label="Refresh tasks"
              aria-busy={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Refresh</span>
            </Button>
            <Button size="sm" onClick={() => handleOpenDialog()} ref={addButtonRef} aria-label="Add new task">
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8" aria-live="polite">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
              <p>Loading tasks...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 p-4 rounded-md text-destructive" role="alert">
            <p>{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground" aria-live="polite">
            <p>No tasks found. Create your first task by clicking the "Add Task" button.</p>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table aria-label="Tasks list">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.objectId}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.description || "-"}</TableCell>
                    <TableCell>
                      {task.completed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(task)}
                          data-task-id={task.objectId}
                          data-action="edit"
                          aria-label={`Edit task: ${task.title}`}
                          onKeyDown={(e) => task.objectId && handleTaskKeyDown(e, task.objectId, "edit")}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => task.objectId && handleDelete(task.objectId)}
                          data-task-id={task.objectId}
                          data-action="delete"
                          aria-label={`Delete task: ${task.title}`}
                          onKeyDown={(e) => task.objectId && handleTaskKeyDown(e, task.objectId, "delete")}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle id="dialog-title">{currentTask ? "Edit Task" : "Create Task"}</DialogTitle>
            <DialogDescription id="dialog-description">
              {currentTask ? "Edit the details of your task below." : "Fill in the details to create a new task."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                ref={titleInputRef}
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description (optional)"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog} ref={dialogCloseButtonRef}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>{currentTask ? "Updating..." : "Creating..."}</span>
                  </>
                ) : currentTask ? (
                  "Update Task"
                ) : (
                  "Create Task"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
