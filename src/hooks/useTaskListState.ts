import { Task } from '../data/Task'
import { deleteTaskById } from '../services/task/deleteTaskById'
import { modalConfirm } from '../utils/UIkitWrappers/modalConfirm'
import { useAllTasks } from './useAllTasks'
import React from 'react'

export type UseTaskListStateReturnType = {
  tasks: Task[]
  useTrashButtonProps: (
    id: number
  ) => { disabled: boolean; onClick: () => void }
}

export const useTaskListState = (): UseTaskListStateReturnType => {
  const { tasks, fetchAllTasks } = useAllTasks()

  // Props of a trash button in each rows.
  const useTrashButtonProps = (
    id: number
  ): { disabled: boolean; onClick: () => void } => {
    const [disabled, setDisable] = React.useState(false)

    const onClick = () => {
      ;(async () => {
        setDisable(true)
        await modalConfirm(`Are you sure you want to delete task${id}?`)
        await deleteTaskById(id)
        await fetchAllTasks()
      })().catch((e) => {
        console.log(e)
        setDisable(false)
      })
    }

    return {
      disabled,
      onClick,
    }
  }

  // Fetch all tasks once this hook was called.
  React.useEffect(() => {
    ;(async () => {
      await fetchAllTasks()
    })()
  }, [])

  return {
    tasks,
    useTrashButtonProps,
  }
}
