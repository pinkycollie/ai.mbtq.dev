"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { VisualAlert, type VisualAlertProps } from "./visual-alert"

type NotificationType = "success" | "error" | "warning" | "info" | "default"

interface NotificationOptions {
  title: string
  message?: string
  duration?: number
  position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" | "top" | "bottom"
  showIcon?: boolean
  politeAnnounce?: boolean
}

interface NotificationContextType {
  notify: (type: NotificationType, options: NotificationOptions) => void
  success: (options: NotificationOptions) => void
  error: (options: NotificationOptions) => void
  warning: (options: NotificationOptions) => void
  info: (options: NotificationOptions) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface Notification extends VisualAlertProps {
  id: string
}

export function VisualNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const notify = useCallback((type: NotificationType, options: NotificationOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [
      ...prev,
      {
        id,
        title: options.title,
        message: options.message,
        variant: type,
        position: options.position || "topRight",
        duration: options.duration || 5000,
        showIcon: options.showIcon !== undefined ? options.showIcon : true,
        politeAnnounce: options.politeAnnounce !== undefined ? options.politeAnnounce : true,
      },
    ])
  }, [])

  const success = useCallback(
    (options: NotificationOptions) => {
      notify("success", options)
    },
    [notify],
  )

  const error = useCallback(
    (options: NotificationOptions) => {
      notify("error", options)
    },
    [notify],
  )

  const warning = useCallback(
    (options: NotificationOptions) => {
      notify("warning", options)
    },
    [notify],
  )

  const info = useCallback(
    (options: NotificationOptions) => {
      notify("info", options)
    },
    [notify],
  )

  const handleClose = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notify, success, error, warning, info }}>
      {children}
      {notifications.map((notification) => (
        <VisualAlert
          key={notification.id}
          title={notification.title}
          message={notification.message}
          variant={notification.variant}
          position={notification.position}
          duration={notification.duration}
          showIcon={notification.showIcon}
          politeAnnounce={notification.politeAnnounce}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}

export const useVisualNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useVisualNotification must be used within a VisualNotificationProvider")
  }
  return context
}
