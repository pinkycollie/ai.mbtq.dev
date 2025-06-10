"use client"

import { useState, useCallback } from "react"
import apiClient from "../api-client"

interface BackendlessUser {
  id: string
  email: string
  name?: string
  created?: string
  updated?: string
  [key: string]: any
}

interface BackendlessAuthState {
  user: BackendlessUser | null
  isLoading: boolean
  error: string | null
}

interface BackendlessDataOptions {
  whereClause?: string
  pageSize?: number
  offset?: number
  sortBy?: string
  related?: string[]
}

export function useBackendlessData<T>(tableName: string) {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(
    async (options: BackendlessDataOptions = {}) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await apiClient.get(`/api/backendless/data/${tableName}`, {
          params: options,
        })
        setData(response.data)
      } catch (error: any) {
        setError(error.message || "Failed to fetch data")
      } finally {
        setIsLoading(false)
      }
    },
    [tableName],
  )

  const create = useCallback(
    async (item: Omit<T, "objectId">) => {
      try {
        await apiClient.post(`/api/backendless/data/${tableName}`, item)
        await fetchData() // Refresh data after create
      } catch (error: any) {
        setError(error.message || "Failed to create item")
        throw error
      }
    },
    [tableName, fetchData],
  )

  const update = useCallback(
    async (objectId: string, item: Partial<T>) => {
      try {
        await apiClient.put(`/api/backendless/data/${tableName}/${objectId}`, item)
        await fetchData() // Refresh data after update
      } catch (error: any) {
        setError(error.message || "Failed to update item")
        throw error
      }
    },
    [tableName, fetchData],
  )

  const remove = useCallback(
    async (objectId: string) => {
      try {
        await apiClient.delete(`/api/backendless/data/${tableName}/${objectId}`)
        await fetchData() // Refresh data after delete
      } catch (error: any) {
        setError(error.message || "Failed to delete item")
        throw error
      }
    },
    [tableName, fetchData],
  )

  return {
    data,
    isLoading,
    error,
    fetchData,
    create,
    update,
    remove,
  }
}

export function useBackendlessFile() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(async (file: File, folder?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      if (folder) {
        formData.append("folder", folder)
      }

      const response = await apiClient.post("/api/backendless/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (error: any) {
      setError(error.message || "Failed to upload file")
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteFile = useCallback(async (filePath: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await apiClient.delete(`/api/backendless/files/${filePath}`)
      return true
    } catch (error: any) {
      setError(error.message || "Failed to delete file")
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    uploadFile,
    deleteFile,
  }
}
