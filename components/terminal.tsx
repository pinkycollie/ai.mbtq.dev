"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal as XTerm } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, X } from "lucide-react"

interface TerminalProps {
  defaultCommand?: string
  height?: string
  fullscreen?: boolean
  onToggleFullscreen?: () => void
  onClose?: () => void
}

export function Terminal({
  defaultCommand = "",
  height = "300px",
  fullscreen = false,
  onToggleFullscreen,
  onClose,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerm | null>(null)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Mock command execution
  const executeCommand = (command: string) => {
    if (!terminal) return

    // Add to history
    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command])
    }

    terminal.writeln("")

    // Mock responses for common commands
    if (command.includes("npm") || command.includes("yarn") || command.includes("pnpm")) {
      terminal.writeln(`Executing: ${command}`)

      setTimeout(() => {
        if (command.includes("install")) {
          terminal.writeln("Installing packages...")
          setTimeout(() => {
            terminal.writeln("✅ Packages installed successfully")
            terminal.writeln("")
            terminal.write("$ ")
          }, 1500)
        } else if (command.includes("build")) {
          terminal.writeln("Building project...")
          setTimeout(() => {
            terminal.writeln("✅ Build completed successfully")
            terminal.writeln("")
            terminal.write("$ ")
          }, 2000)
        } else if (command.includes("dev") || command.includes("start")) {
          terminal.writeln("Starting development server...")
          setTimeout(() => {
            terminal.writeln("ready - started server on 0.0.0.0:3000")
            terminal.writeln("event - compiled client and server successfully")
            terminal.writeln("")
            terminal.write("$ ")
          }, 1000)
        } else {
          terminal.writeln(`Command executed: ${command}`)
          terminal.writeln("")
          terminal.write("$ ")
        }
      }, 500)
    } else if (command.includes("ls")) {
      terminal.writeln("app/")
      terminal.writeln("components/")
      terminal.writeln("public/")
      terminal.writeln("styles/")
      terminal.writeln("package.json")
      terminal.writeln("tsconfig.json")
      terminal.writeln("")
      terminal.write("$ ")
    } else if (command.includes("cd")) {
      terminal.writeln(`Changed directory to ${command.split(" ")[1]}`)
      terminal.writeln("")
      terminal.write("$ ")
    } else if (command.includes("clear")) {
      terminal.clear()
      terminal.write("$ ")
    } else if (command.trim() === "") {
      terminal.write("$ ")
    } else {
      terminal.writeln(`Command not found: ${command}`)
      terminal.writeln("")
      terminal.write("$ ")
    }

    setCurrentCommand("")
    setHistoryIndex(-1)
  }

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new XTerm({
      cursorBlink: true,
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      theme: {
        background: "#1E1E1E",
        foreground: "#EEEEEE",
        cursor: "#FFFFFF",
      },
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(terminalRef.current)
    fitAddon.fit()

    // Initial prompt
    term.writeln("Super Developer Terminal")
    term.writeln("Type 'help' for available commands")
    term.writeln("")
    term.write("$ ")

    // Handle input
    term.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

      if (domEvent.keyCode === 13) {
        // Enter
        executeCommand(currentCommand)
      } else if (domEvent.keyCode === 8) {
        // Backspace
        if (currentCommand.length > 0) {
          term.write("\b \b")
          setCurrentCommand(currentCommand.slice(0, -1))
        }
      } else if (domEvent.keyCode === 38) {
        // Up arrow
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]

          // Clear current command
          for (let i = 0; i < currentCommand.length; i++) {
            term.write("\b \b")
          }

          // Write history command
          term.write(historyCommand)
          setCurrentCommand(historyCommand)
          setHistoryIndex(newIndex)
        }
      } else if (domEvent.keyCode === 40) {
        // Down arrow
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]

          // Clear current command
          for (let i = 0; i < currentCommand.length; i++) {
            term.write("\b \b")
          }

          // Write history command
          term.write(historyCommand)
          setCurrentCommand(historyCommand)
          setHistoryIndex(newIndex)
        } else if (historyIndex === 0) {
          // Clear current command
          for (let i = 0; i < currentCommand.length; i++) {
            term.write("\b \b")
          }

          setCurrentCommand("")
          setHistoryIndex(-1)
        }
      } else if (printable) {
        term.write(key)
        setCurrentCommand(currentCommand + key)
      }
    })

    // Execute default command if provided
    if (defaultCommand) {
      term.writeln(`$ ${defaultCommand}`)
      executeCommand(defaultCommand)
    }

    setTerminal(term)

    // Handle resize
    const handleResize = () => {
      fitAddon.fit()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      term.dispose()
      window.removeEventListener("resize", handleResize)
    }
  }, [defaultCommand])

  // Refit terminal when fullscreen changes
  useEffect(() => {
    if (terminal) {
      setTimeout(() => {
        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)
        fitAddon.fit()
      }, 100)
    }
  }, [fullscreen, terminal])

  return (
    <div
      className={`${fullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""} flex flex-col`}
      style={{ height: fullscreen ? "100vh" : height }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2">
          {onToggleFullscreen && (
            <Button variant="ghost" size="icon" onClick={onToggleFullscreen}>
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div ref={terminalRef} className="flex-1 rounded-md overflow-hidden border border-gray-800 bg-[#1E1E1E]" />
    </div>
  )
}
