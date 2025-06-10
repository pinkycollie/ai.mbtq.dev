"use client"

import { useRef, useEffect, useState } from "react"
import * as monaco from "monaco-editor"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
  defaultLanguage?: string
  defaultValue?: string
  height?: string
  theme?: "vs-dark" | "light"
  onChange?: (value: string) => void
  readOnly?: boolean
}

export function CodeEditor({
  defaultLanguage = "javascript",
  defaultValue = '// Start coding here\n\nconsole.log("Hello, world!");',
  height = "70vh",
  theme = "vs-dark",
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!editorRef.current) return

    const editorInstance = monaco.editor.create(editorRef.current, {
      value: defaultValue,
      language: defaultLanguage,
      theme: theme,
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      readOnly: readOnly,
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: true,
      scrollbar: {
        useShadows: false,
        verticalHasArrows: true,
        horizontalHasArrows: true,
        vertical: "visible",
        horizontal: "visible",
        verticalScrollbarSize: 12,
        horizontalScrollbarSize: 12,
      },
    })

    setEditor(editorInstance)
    setIsLoading(false)

    return () => {
      editorInstance.dispose()
    }
  }, [defaultLanguage, defaultValue, theme, readOnly])

  useEffect(() => {
    if (!editor) return

    const handleChange = () => {
      const value = editor.getValue()
      onChange?.(value)
    }

    const disposable = editor.onDidChangeModelContent(handleChange)

    return () => {
      disposable.dispose()
    }
  }, [editor, onChange])

  return (
    <div className="relative rounded-md border overflow-hidden" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <div ref={editorRef} className="h-full w-full" />
    </div>
  )
}
