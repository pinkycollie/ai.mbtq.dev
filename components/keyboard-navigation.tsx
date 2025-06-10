"use client"

import { useEffect, useState } from "react"
import { useVisualNotification } from "./visual-notification-provider"

interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
  modifier?: "ctrl" | "alt" | "shift" | "meta" | null
}

interface KeyboardNavigationProps {
  shortcuts: KeyboardShortcut[]
  showHelpOnStart?: boolean
}

export function KeyboardNavigation({ shortcuts, showHelpOnStart = false }: KeyboardNavigationProps) {
  const [showHelp, setShowHelp] = useState(showHelpOnStart)
  const { info } = useVisualNotification()

  useEffect(() => {
    if (showHelpOnStart) {
      info({
        title: "Keyboard Shortcuts Available",
        message: "Press '?' to view available keyboard shortcuts",
        duration: 8000,
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle help dialog with '?' key
      if (e.key === "?" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        setShowHelp((prev) => !prev)
        return
      }

      // Check for registered shortcuts
      for (const shortcut of shortcuts) {
        if (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ((shortcut.modifier === "ctrl" && e.ctrlKey) ||
            (shortcut.modifier === "alt" && e.altKey) ||
            (shortcut.modifier === "shift" && e.shiftKey) ||
            (shortcut.modifier === "meta" && e.metaKey) ||
            (shortcut.modifier === null && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey))
        ) {
          e.preventDefault()
          shortcut.action()
          return
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [shortcuts, showHelpOnStart, info])

  if (!showHelp) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
    >
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 id="keyboard-shortcuts-title" className="mb-4 text-xl font-bold">
          Keyboard Shortcuts
        </h2>
        <div className="mb-4 max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-2 text-left">Shortcut</th>
                <th className="pb-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 pr-4">
                  <kbd className="rounded bg-muted px-2 py-1 text-sm">?</kbd>
                </td>
                <td className="py-1">Toggle this help dialog</td>
              </tr>
              {shortcuts.map((shortcut, index) => (
                <tr key={index}>
                  <td className="py-1 pr-4">
                    {shortcut.modifier && (
                      <kbd className="mr-1 rounded bg-muted px-2 py-1 text-sm">
                        {shortcut.modifier === "ctrl"
                          ? "Ctrl"
                          : shortcut.modifier === "alt"
                            ? "Alt"
                            : shortcut.modifier === "shift"
                              ? "Shift"
                              : "⌘"}
                      </kbd>
                    )}
                    <kbd className="rounded bg-muted px-2 py-1 text-sm">{shortcut.key}</kbd>
                  </td>
                  <td className="py-1">{shortcut.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            onClick={() => setShowHelp(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
