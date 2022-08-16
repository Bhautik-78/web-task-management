import { Task } from '../data/Task'
import * as service from '../services/task/fetchAllTasks'
import React from 'react'

export const useAllTasks = (): {
  tasks: Task[]
  fetchAllTasks: () => Promise<void>
} => {
  const [tasks, setTasks] = React.useState<Task[]>([])
  const fetchAllTasks = async () => {
    const response: Task[] = await service.fetchAllTasks()
    setTasks(response)
  }

  return {
    tasks,
    fetchAllTasks,
  }
}
