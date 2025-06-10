"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KeyboardNavigation } from "./keyboard-navigation"
import { useVisualNotification } from "./visual-notification-provider"
import { Settings, Keyboard, Eye, Type } from "lucide-react"

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  textZoom: number
  keyboardMode: "standard" | "enhanced"
  notificationDuration: number
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  textZoom: 100,
  keyboardMode: "standard",
  notificationDuration: 5000,
}

export function AccessibilityHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const { info } = useVisualNotification()

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
        applySettings(parsedSettings)
      } catch (e) {
        console.error("Failed to parse accessibility settings", e)
      }
    }
  }, [])

  // Apply settings whenever they change
  useEffect(() => {
    applySettings(settings)
    // Save settings to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }, [settings])

  const applySettings = (settings: AccessibilitySettings) => {
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Apply large text
    if (settings.largeText) {
      document.documentElement.classList.add("large-text")
    } else {
      document.documentElement.classList.remove("large-text")
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    } else {
      document.documentElement.classList.remove("reduced-motion")
    }

    // Apply text zoom
    document.documentElement.style.fontSize = `${settings.textZoom}%`
  }

  const toggleSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: "a",
      modifier: "ctrl" as const,
      description: "Toggle accessibility panel",
      action: () => setIsOpen((prev) => !prev),
    },
    {
      key: "c",
      modifier: "ctrl" as const,
      description: "Toggle high contrast mode",
      action: () => toggleSetting("highContrast", !settings.highContrast),
    },
    {
      key: "t",
      modifier: "ctrl" as const,
      description: "Toggle large text mode",
      action: () => toggleSetting("largeText", !settings.largeText),
    },
    {
      key: "m",
      modifier: "ctrl" as const,
      description: "Toggle reduced motion",
      action: () => toggleSetting("reducedMotion", !settings.reducedMotion),
    },
  ]

  // Show accessibility tip on mount
  useEffect(() => {
    const hasShownTip = localStorage.getItem("accessibility-tip-shown")
    if (!hasShownTip) {
      setTimeout(() => {
        info({
          title: "Accessibility Features Available",
          message: "Press Ctrl+A to open the accessibility panel or click the accessibility icon in the corner.",
          duration: 10000,
        })
        localStorage.setItem("accessibility-tip-shown", "true")
      }, 2000)
    }
  }, [info])

  return (
    <>
      <KeyboardNavigation shortcuts={shortcuts} showHelpOnStart={false} />

      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility settings"
      >
        <Settings className="h-6 w-6" aria-hidden="true" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle id="accessibility-title" className="flex items-center gap-2">
                <Settings className="h-5 w-5" aria-hidden="true" />
                Accessibility Settings
              </CardTitle>
              <CardDescription>Customize your experience to meet your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visual">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="visual" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span>Visual</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <Type className="h-4 w-4" aria-hidden="true" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="interaction" className="flex items-center gap-2">
                    <Keyboard className="h-4 w-4" aria-hidden="true" />
                    <span>Interaction</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="visual" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-contrast">High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => toggleSetting("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => toggleSetting("reducedMotion", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-duration">Notification Duration (seconds)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="notification-duration"
                        min={3000}
                        max={15000}
                        step={1000}
                        value={[settings.notificationDuration]}
                        onValueChange={(value) => toggleSetting("notificationDuration", value[0])}
                        aria-valuetext={`${settings.notificationDuration / 1000} seconds`}
                      />
                      <span className="w-12 text-center">{settings.notificationDuration / 1000}s</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      How long notifications stay on screen before disappearing
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="large-text">Large Text</Label>
                      <p className="text-sm text-muted-foreground">Increase text size throughout the application</p>
                    </div>
                    <Switch
                      id="large-text"
                      checked={settings.largeText}
                      onCheckedChange={(checked) => toggleSetting("largeText", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-zoom">Text Zoom</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="text-zoom"
                        min={80}
                        max={150}
                        step={5}
                        value={[settings.textZoom]}
                        onValueChange={(value) => toggleSetting("textZoom", value[0])}
                        aria-valuetext={`${settings.textZoom}%`}
                      />
                      <span className="w-12 text-center">{settings.textZoom}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
                  </div>
                </TabsContent>

                <TabsContent value="interaction" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyboard-mode">Keyboard Navigation Mode</Label>
                    <Select
                      value={settings.keyboardMode}
                      onValueChange={(value) => toggleSetting("keyboardMode", value)}
                    >
                      <SelectTrigger id="keyboard-mode">
                        <SelectValue placeholder="Select keyboard mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="enhanced">Enhanced (Tab through all elements)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Enhanced mode allows tabbing through all interactive elements
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        info({
                          title: "Keyboard Shortcuts",
                          message: "Press '?' to view all available keyboard shortcuts",
                          duration: settings.notificationDuration,
                        })
                      }}
                    >
                      <Keyboard className="mr-2 h-4 w-4" aria-hidden="true" />
                      View Keyboard Shortcuts
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetSettings}>
                Reset to Defaults
              </Button>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
