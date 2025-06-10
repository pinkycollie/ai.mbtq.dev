"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Terminal as XTerm } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { WebLinksAddon } from "xterm-addon-web-links"
import "xterm/css/xterm.css"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, X, Copy, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VercelTerminalProps {
  defaultCommand?: string
  height?: string
  fullscreen?: boolean
  onToggleFullscreen?: () => void
  onClose?: () => void
  ariaLabel?: string
}

export function VercelTerminal({
  defaultCommand = "",
  height = "300px",
  fullscreen = false,
  onToggleFullscreen,
  onClose,
  ariaLabel = "Vercel Terminal",
}: VercelTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerm | null>(null)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState<string[]>([])
  const [visualOutput, setVisualOutput] = useState<string[]>([])
  const [hasAlert, setHasAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const fitAddonRef = useRef<FitAddon | null>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Debounced fit function to prevent ResizeObserver errors
  const debouncedFit = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      try {
        if (fitAddonRef.current && terminalRef.current) {
          fitAddonRef.current.fit()
        }
      } catch (error) {
        console.warn("Error fitting terminal:", error)
      }
    }, 100)
  }, [])

  // Function to show visual alert for important terminal messages
  const showVisualAlert = (message: string) => {
    setHasAlert(true)
    setAlertMessage(message)

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setHasAlert(false)
      setAlertMessage("")
    }, 5000)
  }

  const executeCommand = useCallback(
    (command: string) => {
      if (!terminal) return

      // Add to history
      if (command.trim()) {
        setCommandHistory((prev) => [...prev, command])
        setOutput((prev) => [...prev, `$ ${command}`])
        setVisualOutput((prev) => [...prev, `$ ${command}`])
      }

      terminal.writeln("")

      // Mock responses for common commands
      if (command.startsWith("vercel") || command.startsWith("vc")) {
        terminal.writeln(`Executing: ${command}`)
        setVisualOutput((prev) => [...prev, `Executing: ${command}`])

        // Instead of using setTimeout, directly write the output
        if (command.includes("login")) {
          terminal.writeln("Vercel CLI 32.5.0")
          terminal.writeln("> Log in to Vercel")
          terminal.writeln("> Success! Email authenticated")
          terminal.writeln("> Ready for deployment")
          setOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Log in to Vercel",
            "> Success! Email authenticated",
            "> Ready for deployment",
          ])
          setVisualOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Log in to Vercel",
            "> Success! Email authenticated",
            "> Ready for deployment",
          ])
          // Show visual alert for successful login
          showVisualAlert("Successfully logged in to Vercel")
          terminal.writeln("")
          terminal.write("$ ")
        } else if (command.includes("deploy")) {
          terminal.writeln("Vercel CLI 32.5.0")
          terminal.writeln("> Verifying project settings")
          terminal.writeln("> Building project...")
          terminal.writeln("> Build completed")
          terminal.writeln("> Deploying build outputs...")
          terminal.writeln("> ✅ Deployment complete!")
          terminal.writeln("> Production: https://your-project.vercel.app [34s]")
          setOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Verifying project settings",
            "> Building project...",
            "> Build completed",
            "> Deploying build outputs...",
            "> ✅ Deployment complete!",
            "> Production: https://your-project.vercel.app [34s]",
          ])
          setVisualOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Verifying project settings",
            "> Building project...",
            "> Build completed",
            "> Deploying build outputs...",
            "> ✅ Deployment complete!",
            "> Production: https://your-project.vercel.app [34s]",
          ])
          // Show visual alert for successful deployment
          showVisualAlert("Deployment completed successfully!")
          terminal.writeln("")
          terminal.write("$ ")
        } else if (command.includes("list") || command.includes("ls")) {
          terminal.writeln("Vercel CLI 32.5.0")
          terminal.writeln("> Projects:")
          terminal.writeln("  • e-commerce-platform")
          terminal.writeln("  • marketing-website")
          terminal.writeln("  • admin-dashboard")
          terminal.writeln("  • mobile-app-backend")
          setOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Projects:",
            "  • e-commerce-platform",
            "  • marketing-website",
            "  • admin-dashboard",
            "  • mobile-app-backend",
          ])
          setVisualOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Projects:",
            "  • e-commerce-platform",
            "  • marketing-website",
            "  • admin-dashboard",
            "  • mobile-app-backend",
          ])
          terminal.writeln("")
          terminal.write("$ ")
        } else if (command.includes("init")) {
          terminal.writeln("Vercel CLI 32.5.0")
          terminal.writeln("> Initializing project")
          terminal.writeln("> Link to existing project? [y/N]")
          terminal.writeln("> Looking up project...")
          terminal.writeln("> Project linked")
          terminal.writeln("> Ready for deployment")
          setOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Initializing project",
            "> Link to existing project? [y/N]",
            "> Looking up project...",
            "> Project linked",
            "> Ready for deployment",
          ])
          setVisualOutput((prev) => [
            ...prev,
            "Vercel CLI 32.5.0",
            "> Initializing project",
            "> Link to existing project? [y/N]",
            "> Looking up project...",
            "> Project linked",
            "> Ready for deployment",
          ])
          // Show visual alert for successful initialization
          showVisualAlert("Project initialized and linked successfully")
          terminal.writeln("")
          terminal.write("$ ")
        } else {
          terminal.writeln(`Command executed: ${command}`)
          setVisualOutput((prev) => [...prev, `Command executed: ${command}`])
          terminal.writeln("")
          terminal.write("$ ")
        }
      } else if (command.includes("npm") || command.includes("yarn") || command.includes("pnpm")) {
        terminal.writeln(`Executing: ${command}`)
        setVisualOutput((prev) => [...prev, `Executing: ${command}`])

        // Directly write the output without setTimeout
        if (command.includes("install")) {
          terminal.writeln("Installing packages...")
          terminal.writeln("✅ Packages installed successfully")
          setOutput((prev) => [...prev, "Installing packages...", "✅ Packages installed successfully"])
          setVisualOutput((prev) => [...prev, "Installing packages...", "✅ Packages installed successfully"])
          // Show visual alert for successful installation
          showVisualAlert("Packages installed successfully")
          terminal.writeln("")
          terminal.write("$ ")
        } else if (command.includes("build")) {
          terminal.writeln("Building project...")
          terminal.writeln("✅ Build completed successfully")
          setOutput((prev) => [...prev, "Building project...", "✅ Build completed successfully"])
          setVisualOutput((prev) => [...prev, "Building project...", "✅ Build completed successfully"])
          // Show visual alert for successful build
          showVisualAlert("Build completed successfully")
          terminal.writeln("")
          terminal.write("$ ")
        } else if (command.includes("dev") || command.includes("start")) {
          terminal.writeln("Starting development server...")
          terminal.writeln("ready - started server on 0.0.0.0:3000")
          terminal.writeln("event - compiled client and server successfully")
          setOutput((prev) => [
            ...prev,
            "Starting development server...",
            "ready - started server on 0.0.0.0:3000",
            "event - compiled client and server successfully",
          ])
          setVisualOutput((prev) => [
            ...prev,
            "Starting development server...",
            "ready - started server on 0.0.0.0:3000",
            "event - compiled client and server successfully",
          ])
          // Show visual alert for server started
          showVisualAlert("Development server started successfully")
          terminal.writeln("")
          terminal.write("$ ")
        } else {
          terminal.writeln(`Command executed: ${command}`)
          setVisualOutput((prev) => [...prev, `Command executed: ${command}`])
          terminal.writeln("")
          terminal.write("$ ")
        }
      } else if (command.includes("ls")) {
        terminal.writeln("app/")
        terminal.writeln("components/")
        terminal.writeln("public/")
        terminal.writeln("styles/")
        terminal.writeln("package.json")
        terminal.writeln("tsconfig.json")
        setOutput((prev) => [...prev, "app/", "components/", "public/", "styles/", "package.json", "tsconfig.json"])
        setVisualOutput((prev) => [
          ...prev,
          "app/",
          "components/",
          "public/",
          "styles/",
          "package.json",
          "tsconfig.json",
        ])
        terminal.writeln("")
        terminal.write("$ ")
      } else if (command.includes("cd")) {
        terminal.writeln(`Changed directory to ${command.split(" ")[1]}`)
        setOutput((prev) => [...prev, `Changed directory to ${command.split(" ")[1]}`])
        setVisualOutput((prev) => [...prev, `Changed directory to ${command.split(" ")[1]}`])
        terminal.writeln("")
        terminal.write("$ ")
      } else if (command.includes("clear")) {
        terminal.clear()
        setOutput([])
        setVisualOutput([])
        terminal.write("$ ")
      } else if (command.includes("help")) {
        terminal.writeln("Available commands:")
        terminal.writeln("  vercel deploy - Deploy your project")
        terminal.writeln("  vercel login - Log in to Vercel")
        terminal.writeln("  vercel list - List your projects")
        terminal.writeln("  vercel init - Initialize a new project")
        terminal.writeln("  npm/yarn/pnpm commands - Package management")
        terminal.writeln("  ls - List files")
        terminal.writeln("  cd - Change directory")
        terminal.writeln("  clear - Clear terminal")
        setOutput((prev) => [
          ...prev,
          "Available commands:",
          "  vercel deploy - Deploy your project",
          "  vercel login - Log in to Vercel",
          "  vercel list - List your projects",
          "  vercel init - Initialize a new project",
          "  npm/yarn/pnpm commands - Package management",
          "  ls - List files",
          "  cd - Change directory",
          "  clear - Clear terminal",
        ])
        setVisualOutput((prev) => [
          ...prev,
          "Available commands:",
          "  vercel deploy - Deploy your project",
          "  vercel login - Log in to Vercel",
          "  vercel list - List your projects",
          "  vercel init - Initialize a new project",
          "  npm/yarn/pnpm commands - Package management",
          "  ls - List files",
          "  cd - Change directory",
          "  clear - Clear terminal",
        ])
        terminal.writeln("")
        terminal.write("$ ")
      } else if (command.trim() === "") {
        terminal.write("$ ")
      } else {
        terminal.writeln(`Command not found: ${command}`)
        setOutput((prev) => [...prev, `Command not found: ${command}`])
        setVisualOutput((prev) => [...prev, `Command not found: ${command}`])
        // Show visual alert for command not found
        showVisualAlert(`Command not found: ${command}`)
        terminal.writeln("")
        terminal.write("$ ")
      }

      setCurrentCommand("")
      setHistoryIndex(-1)

      // Scroll the visual output to the bottom
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    },
    [terminal],
  )

  const copyToClipboard = () => {
    const text = output.join("\n")
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Terminal output has been copied to clipboard",
    })
    // Show visual alert for copy action
    showVisualAlert("Terminal output copied to clipboard")
  }

  // Initialize terminal
  useEffect(() => {
    if (!terminalRef.current) return

    let isMounted = true
    let term: XTerm | null = null
    let fitAddon: FitAddon | null = null

    // Delay terminal initialization to avoid ResizeObserver errors
    const initTimeout = setTimeout(() => {
      try {
        if (!terminalRef.current || !isMounted) return

        term = new XTerm({
          cursorBlink: true,
          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
          fontSize: 14,
          theme: {
            background: "#000000",
            foreground: "#FFFFFF",
            cursor: "#FFFFFF",
            black: "#000000",
            red: "#FF3B30",
            green: "#34C759",
            yellow: "#FFCC00",
            blue: "#007AFF",
            magenta: "#AF52DE",
            cyan: "#5AC8FA",
            white: "#FFFFFF",
            brightBlack: "#8E8E93",
            brightRed: "#FF3B30",
            brightGreen: "#34C759",
            brightYellow: "#FFCC00",
            brightBlue: "#007AFF",
            brightMagenta: "#AF52DE",
            brightCyan: "#5AC8FA",
            brightWhite: "#FFFFFF",
          },
        })

        // Create addons
        fitAddon = new FitAddon()
        const webLinksAddon = new WebLinksAddon()

        // Load addons
        term.loadAddon(fitAddon)
        term.loadAddon(webLinksAddon)

        // Open terminal
        term.open(terminalRef.current)

        // Store fitAddon reference
        fitAddonRef.current = fitAddon

        // Delay the initial fit to avoid ResizeObserver errors
        setTimeout(() => {
          if (isMounted && fitAddon && terminalRef.current) {
            try {
              fitAddon.fit()
            } catch (error) {
              console.warn("Error fitting terminal:", error)
            }
          }
        }, 100)

        // Initial prompt
        term.writeln("Vercel Developer Platform Terminal")
        term.writeln("Type 'help' for available commands")
        term.writeln("")
        term.write("$ ")

        setOutput(["Vercel Developer Platform Terminal", "Type 'help' for available commands"])
        setVisualOutput(["Vercel Developer Platform Terminal", "Type 'help' for available commands"])

        // Set terminal state
        if (isMounted) {
          setTerminal(term)
        }

        // Execute default command if provided
        if (defaultCommand && term) {
          term.writeln(`$ ${defaultCommand}`)

          // Delay command execution to ensure terminal is ready
          setTimeout(() => {
            if (isMounted && term) {
              executeCommand(defaultCommand)
            }
          }, 100)
        }
      } catch (error) {
        console.error("Error initializing terminal:", error)
        showVisualAlert("Error initializing terminal. Please try again.")
      }
    }, 300) // Increased delay to ensure DOM is ready

    return () => {
      isMounted = false
      clearTimeout(initTimeout)

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      if (term) {
        try {
          term.dispose()
        } catch (error) {
          console.warn("Error disposing terminal:", error)
        }
      }
    }
  }, [defaultCommand, executeCommand])

  // Set up key handlers after terminal is initialized
  useEffect(() => {
    if (!terminal) return

    const handleKey = ({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

      if (domEvent.keyCode === 13) {
        // Enter
        executeCommand(currentCommand)
      } else if (domEvent.keyCode === 8) {
        // Backspace
        if (currentCommand.length > 0) {
          terminal.write("\b \b")
          setCurrentCommand(currentCommand.slice(0, -1))
        }
      } else if (domEvent.keyCode === 38) {
        // Up arrow
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]

          // Clear current command
          for (let i = 0; i < currentCommand.length; i++) {
            terminal.write("\b \b")
          }

          // Write history command
          terminal.write(historyCommand)
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
            terminal.write("\b \b")
          }

          // Write history command
          terminal.write(historyCommand)
          setCurrentCommand(historyCommand)
          setHistoryIndex(newIndex)
        } else if (historyIndex === 0) {
          // Clear current command
          for (let i = 0; i < currentCommand.length; i++) {
            terminal.write("\b \b")
          }

          setCurrentCommand("")
          setHistoryIndex(-1)
        }
      } else if (printable) {
        terminal.write(key)
        setCurrentCommand(currentCommand + key)
      }
    }

    // Add key handler
    const disposable = terminal.onKey(handleKey)

    return () => {
      disposable.dispose()
    }
  }, [terminal, currentCommand, commandHistory, historyIndex, executeCommand])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      debouncedFit()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [debouncedFit])

  // Handle fullscreen changes
  useEffect(() => {
    if (terminal && fitAddonRef.current && terminalRef.current) {
      // Delay the fit to ensure the component has rendered
      setTimeout(() => {
        try {
          debouncedFit()
        } catch (error) {
          console.warn("Error handling fullscreen change:", error)
        }
      }, 200)
    }
  }, [fullscreen, terminal, debouncedFit])

  return (
    <div
      className={`${fullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""} flex flex-col`}
      style={{ height: fullscreen ? "100vh" : height }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true"></div>
          <div className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true"></div>
          <span className="sr-only">Terminal control buttons</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy terminal output to clipboard">
            <Copy className="h-4 w-4" />
            <VisuallyHidden>Copy output</VisuallyHidden>
          </Button>
          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              aria-label={fullscreen ? "Exit fullscreen mode" : "Enter fullscreen mode"}
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              <VisuallyHidden>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</VisuallyHidden>
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close terminal">
              <X className="h-4 w-4" />
              <VisuallyHidden>Close</VisuallyHidden>
            </Button>
          )}
        </div>
      </div>

      {/* Visual alert for important terminal messages */}
      {hasAlert && (
        <Alert variant="default" className="mb-2 animate-pulse">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Terminal Alert</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      {/* Main terminal container with ARIA attributes */}
      <div className="flex flex-1 flex-col rounded-md overflow-hidden border bg-black">
        {/* Hidden but accessible terminal output for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {visualOutput.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Visual terminal output for keyboard navigation */}
        <div
          className="flex-1 overflow-auto p-4 font-mono text-sm text-white bg-black"
          ref={outputRef}
          tabIndex={0}
          aria-label={`${ariaLabel} output`}
          role="log"
          style={{ display: "none" }}
        >
          {visualOutput.map((line, i) => (
            <div key={i} className={line.startsWith("$") ? "text-green-400" : ""}>
              {line}
            </div>
          ))}
        </div>

        {/* Actual terminal component */}
        <div
          ref={terminalRef}
          className="flex-1"
          aria-hidden="false"
          tabIndex={0}
          role="application"
          aria-label={ariaLabel}
        />

        {/* Keyboard shortcut instructions */}
        <div className="p-2 bg-gray-900 text-xs text-gray-400 border-t border-gray-800">
          <span className="mr-3">
            Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Tab</kbd> to autocomplete
          </span>
          <span className="mr-3">
            Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">↑</kbd>
            <kbd className="px-1 py-0.5 bg-gray-800 rounded">↓</kbd> for command history
          </span>
          <span>
            Type <kbd className="px-1 py-0.5 bg-gray-800 rounded">help</kbd> for available commands
          </span>
        </div>
      </div>
    </div>
  )
}
