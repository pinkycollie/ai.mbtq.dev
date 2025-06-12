"use client"

import { useState, useEffect } from "react"
import { Splash, type SplashStatus } from "./components/splash"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, Zap, DollarSign, Smartphone, Laptop, Monitor } from 'lucide-react'
import "../styles/splash-safe-areas.css"

export default function SplashDemo() {
  const [status, setStatus] = useState<SplashStatus>("needs-funding")
  const [position, setPosition] = useState("top-right")
  const [size, setSize] = useState("responsive")
  const [color, setColor] = useState("")
  const [text, setText] = useState("")
  const [animated, setAnimated] = useState(true)
  const [dismissible, setDismissible] = useState(false)
  const [pulse, setPulse] = useState(true)
  const [rotate, setRotate] = useState(false)
  const [showDelay, setShowDelay] = useState(0)
  const [show, setShow] = useState(true)
  const [selectedIcon, setSelectedIcon] = useState("default")
  const [clickCount, setClickCount] = useState(0)
  const [relative, setRelative] = useState(false)
  const [useSafeArea, setUseSafeArea] = useState(true)
  const [adaptiveSize, setAdaptiveSize] = useState(true)
  const [currentDevice, setCurrentDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      
      if (window.innerWidth < 640) {
        setCurrentDevice("mobile")
      } else if (window.innerWidth < 1024) {
        setCurrentDevice("tablet")
      } else {
        setCurrentDevice("desktop")
      }
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSplashClick = () => {
    setClickCount((prev) => prev + 1)
  }

  const getIcon = () => {
    switch (selectedIcon) {
      case "heart":
        return <Heart className="h-4 w-4" />
      case "star":
        return <Star className="h-4 w-4" />
      case "zap":
        return <Zap className="h-4 w-4" />
      case "dollar":
        return <DollarSign className="h-4 w-4" />
      default:
        return undefined
    }
  }

  const resetSplash = () => {
    setShow(false)
    setTimeout(() => setShow(true), 100)
  }

  const resetToDefaults = () => {
    setStatus("needs-funding")
    setPosition("top-right")
    setSize("responsive")
    setColor("")
    setText("")
    setAnimated(true)
    setDismissible(false)
    setPulse(true)
    setRotate(false)
    setShowDelay(0)
    setShow(true)
    setSelectedIcon("default")
    setClickCount(0)
    setRelative(false)
    setUseSafeArea(true)
    setAdaptiveSize(true)
  }

  const getCurrentDeviceIcon = () => {
    switch (currentDevice) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      case "tablet":
        return <Laptop className="h-5 w-5" />
      case "desktop":
        return <Monitor className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">SPLASH! Component Demo</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getCurrentDeviceIcon()}
          <span className="hidden md:inline">Current view:</span> {currentDevice}
        </div>
      </div>

      <div className={relative ? "relative h-64 border rounded-lg mb-6" : ""}>
        <Splash
          status={status}
          position={position as any}
          size={size as any}
          color={color || undefined}
          text={text || undefined}
          animated={animated}
          dismissible={dismissible}
          icon={getIcon()}
          onClick={handleSplashClick}
          pulse={pulse}
          rotate={rotate}
          showDelay={showDelay}
          show={show}
          relative={relative}
          useSafeArea={useSafeArea}
          adaptiveSize={adaptiveSize}
        />
        {relative && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Container for relative positioning
          </div>
        )}
      </div>

      <Tabs defaultValue="playground">
        <TabsList className="mb-4 w-full md:w-auto">
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        </TabsList>

        <TabsContent value="playground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Customize your SPLASH! component</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as SplashStatus)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funded">Funded</SelectItem>
                      <SelectItem value="not-funded">Not Funded</SelectItem>
                      <SelectItem value="needs-funding">Needs Funding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="responsive">Responsive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color (Tailwind class or leave empty for default)</Label>
                  <Input
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. bg-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Custom Text (leave empty for default)</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. OPEN SOURCE"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                    <SelectTrigger id="icon">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (based on status)</SelectItem>
                      <SelectItem value="heart">Heart</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="zap">Zap</SelectItem>
                      <SelectItem value="dollar">Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delay">Show Delay (ms)</Label>
                  <Input
                    id="delay"
                    type="number"
                    value={showDelay}
                    onChange={(e) => setShowDelay(Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behavior</CardTitle>
                <CardDescription>Configure how the SPLASH! component behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animated">Animated</Label>
                  <Switch id="animated" checked={animated} onCheckedChange={setAnimated} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dismissible">Dismissible</Label>
                  <Switch id="dismissible" checked={dismissible} onCheckedChange={setDismissible} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="pulse">Pulse Effect</Label>
                  <Switch id="pulse" checked={pulse} onCheckedChange={setPulse} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="rotate">Rotate Animation</Label>
                  <Switch id="rotate" checked={rotate} onCheckedChange={setRotate} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="relative">Relative Positioning</Label>
                  <Switch id="relative" checked={relative} onCheckedChange={setRelative} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="useSafeArea">Use Safe Area (Mobile)</Label>
                  <Switch id="useSafeArea" checked={useSafeArea} onCheckedChange={setUseSafeArea} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="adaptiveSize">Adaptive Size</Label>
                  <Switch id="adaptiveSize" checked={adaptiveSize} onCheckedChange={setAdaptiveSize} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show">Show</Label>
                  <Switch id="show" checked={show} onCheckedChange={setShow} />
                </div>

                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Interaction</p>
                  <p className="text-sm text-muted-foreground">
                    Click count: <span className="font-bold">{clickCount}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={resetSplash} className="w-full sm:w-auto">
                  Reset Splash
                </Button>
                <Button onClick={resetToDefaults} className="w-full sm:w-auto">
                  Reset All
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Code Preview</CardTitle>
              <CardDescription>Copy this code to use in your project</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                <code>{`<Splash
  status="${status}"
  position="${position}"
  size="${size}"${color ? `\n  color="${color}"` : ""}${text ? `\n  text="${text}"` : ""}
  animated={${animated}}
  dismissible={${dismissible}}${selectedIcon !== "default" ? `\n  icon={<${selectedIcon === "heart" ? "Heart" : selectedIcon === "star" ? "Star" : selectedIcon === "zap" ? "Zap" : "DollarSign"} className="h-4 w-4" />}` : ""}
  pulse={${pulse}}
  rotate={${rotate}}${showDelay > 0 ? `\n  showDelay={${showDelay}}` : ""}
  show={${show}}${relative ? `\n  relative={${relative}}` : ""}${!useSafeArea ? `\n  useSafeArea={${useSafeArea}}` : ""}${!adaptiveSize ? `\n  adaptiveSize={${adaptiveSize}}` : ""}${clickCount > 0 ? `\n  onClick={() => console.log('Splash clicked!')}` : ""}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funded Project</CardTitle>
                <CardDescription>Green success indicator</CardDescription>
              </CardHeader>
              <CardContent className="h-40 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                  <Splash status="funded" position="top-right" size="medium" animated={true} pulse={false} />
                  <p className="text-center text-muted-foreground">Project Dashboard</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setStatus("funded")
                    setPosition("top-right")
                    setSize("medium")
                    setColor("")
                    setText("")
                    setAnimated(true)
                    setPulse(false)
                    setDismissible(false)
                    setSelectedIcon("default")
                    resetSplash()
                  }}
                >
                  Apply This Style
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Needs Funding</CardTitle>
                <CardDescription>Animated attention grabber</CardDescription>
              </CardHeader>
              <CardContent className="h-40 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                  <Splash
                    status="needs-funding"
                    position="bottom-left"
                    size="large"
                    animated={true}
                    pulse={true}
                    rotate={true}
                  />
                  <p className="text-center text-muted-foreground">Project Dashboard</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setStatus("needs-funding")
                    setPosition("bottom-left")
                    setSize("large")
                    setColor("")
                    setText("")
                    setAnimated(true)
                    setPulse(true)
                    setRotate(true)
                    setDismissible(false)
                    setSelectedIcon("default")
                    resetSplash()
                  }}
                >
                  Apply This Style
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Optimized</CardTitle>
                <CardDescription>Responsive with safe areas</CardDescription>
              </CardHeader>
              <CardContent className="h-40 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                  <Splash
                    text="RESPONSIVE"
                    position="top-right"
                    size="responsive"
                    color="bg-purple-600"
                    animated={true}
                    icon={<Smartphone className="h-4 w-4" />}
                    useSafeArea={true}
                    adaptiveSize={true}
                  />
                  <p className="text-center text-muted-foreground">Mobile View</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setStatus("needs-funding")
                    setPosition("top-right")
                    setSize("responsive")
                    setColor("bg-purple-600")
                    setText("RESPONSIVE")
                    setAnimated(true)
                    setPulse(false)
                    setRotate(false)
                    setDismissible(false)
                    setSelectedIcon("default")
                    setUseSafeArea(true)
                    setAdaptiveSize(true)
                    resetSplash()
                  }}
                >
                  Apply This Style
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>SPLASH! Component Documentation</CardTitle>
              <CardDescription>How to use the SPLASH! component in your projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Installation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Copy the component file into your project and make sure you have the required dependencies:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`npm install framer-motion`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Mobile Optimization</h3>
                <p className="text-sm text-muted-foreground mb-2">
                
                  The SPLASH! component is optimized for mobile devices with:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                  <li>Safe area insets for notches and home indicators</li>
                  <li>Responsive sizing based on screen width</li>
                  <li>Touch event handling</li>
                  <li>Proper positioning on all screen sizes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Usage</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Import and use the component in your React application:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`import { Splash } from './components/splash'

export default function MyPage() {
  return (
    <div>
      <Splash 
        status="funded" 
        size="responsive"
        adaptiveSize={true}
        useSafeArea={true}
      />
      {/* Your page content */}
    </div>
  )
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Mobile-Specific Props</h3>
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-3 p-2 font-medium">
                    <div>Prop</div>
                    <div>Type</div>
                    <div>Description</div>
                  </div>
                  <div className="grid grid-cols-3 p-2">
                    <div className="font-medium">useSafeArea</div>
                    <div className="text-sm">boolean</div>
                    <div className="text-sm">Whether to respect safe area insets on mobile devices</div>
                  </div>
                  <div className="grid grid-cols-3 p-2">
                    <div className="font-medium">adaptiveSize</div>
                    <div className="text-sm">boolean</div>
                    <div className="text-sm">Whether to adapt size based on screen size</div>
                  </div>
                  <div className="grid grid-cols-3 p-2">
                    <div className="font-medium">size</div>
                    <div className="text-sm">'responsive'</div>
                    <div className="text-sm">Use 'responsive' for automatic sizing based on screen</div>
                  </div>
                  <div className="grid grid-cols-3 p-2">
                    <div className="font-medium">relative</div>
                    <div className="text-sm">boolean</div>
                    <div className="text-sm">Whether the splash is relative to its container</div>
                  </div>
                  <div className="grid grid-cols-3 p-2">
                    <div className="font-medium">offset</div>
                    <div className="text-sm">string</div>
                    <div className="text-sm">Custom margin/offset from the edge</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>React / Next.js</CardTitle>
                <CardDescription>Using SPLASH! in React-based projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The SPLASH! component works out of the box with React and Next.js projects.
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                  <code>{`// pages/index.js or app/page.js
import { Splash } from '../components/splash'

export default function Home() {
  return (
    <main>
      <Splash status="funded" />
      <h1>My Project</h1>
    </main>
  )
}`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vue.js</CardTitle>
                <CardDescription>Adapting SPLASH! for Vue projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  To use SPLASH! in Vue.js, you'll need to convert it to a Vue component:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                  <code>{`<!-- Splash.vue -->
<template>
  <Transition name="splash">
    <div
      v-if="isVisible"
      :class="[
        'fixed rounded-full shadow-lg font-bold flex items-center gap-1.5',
        colorClass,
        sizeClasses[size],
        positionClasses[position],
        { 'animate-pulse': pulse },
        'text-white',
        className
      ]"
      @click="handleClick"
    >
      <component :is="iconComponent" v-if="icon" />
      <span v-else v-html="defaultIcon"></span>
      <span>{{ displayText }}</span>
      <button
        v-if="dismissible"
        @click.stop="handleDismiss"
        class="ml-1 rounded-full hover:bg-white/20 p-0.5"
        aria-label="Dismiss"
      >
        <span class="h-3 w-3">×</span>
      </button>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Splash',
  props: {
    status: {
      type: String,
      default: 'needs-funding',
      validator: (value) => ['funded', 'not-funded', 'needs-funding'].includes(value)
    },
    text: String,
    position: {
      type: String,
      default: 'top-right',
      validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'].includes(value)
    },
    // ... other props
  },
  data() {
    return {
      isVisible: false
    }
  },
  // ... computed properties and methods
}
</script>

<style>
.splash-enter-active,
.splash-leave-active {
  transition: all 0.3s ease;
}
.splash-enter-from,
.splash-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Svelte</CardTitle>
                <CardDescription>Adapting SPLASH! for Svelte projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  To use SPLASH! in Svelte, convert it to a Svelte component:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                  <code>{`<!-- Splash.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  
  export let status = 'needs-funding';
  export let text = undefined;
  export let position = 'top-right';
  // ... other props
  
  let isVisible = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = show;
    }, showDelay);
  });
  
  function handleDismiss() {
    isVisible = false;
  }
  
  // ... other functions
</script>

{#if isVisible}
  <div
    class="fixed rounded-full shadow-lg font-bold flex items-center gap-1.5 {getColorClass()} {getSizeClass()} {getPositionClass()} {pulse ? 'animate-pulse' : ''} text-white {className || ''}"
    on:click={onClick}
    transition:scale={{
      duration: 300,
      start: 0.8,
      opacity: 0
    }}
    style="z-index: {zIndex};"
  >
    {#if icon}
      <svelte:component this={icon} />
    {:else}
      {@html getDefaultIcon()}
    {/if}
    <span>{text || getDefaultText()}</span>
    {#if dismissible}
      <button
        on:click|stopPropagation={handleDismiss}
        class="ml-1 rounded-full hover:bg-white/20 p-0.5"
        aria-label="Dismiss"
      >
        <span class="h-3 w-3">×</span>
      </button>
    {/if}
  </div>
{/if}`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Angular</CardTitle>
                <CardDescription>Adapting SPLASH! for Angular projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  To use SPLASH! in Angular, convert it to an Angular component:
                </p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs md:text-sm">
                  <code>{`// splash.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  animations: [
    trigger('splashAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class SplashComponent implements OnInit {
  @Input() status: 'funded' | 'not-funded' | 'needs-funding' = 'needs-funding';
  @Input() text?: string;
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' = 'top-right';
  // ... other inputs
  
  isVisible = false;
  
  ngOnInit() {
    setTimeout(() => {
      this.isVisible = this.show;
    }, this.showDelay);
  }
  
  // ... methods
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
