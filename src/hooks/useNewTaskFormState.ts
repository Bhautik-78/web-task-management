import { NewTaskForm } from '../data/NewTaskForm'
import { Task } from '../data/Task'
import { createTask } from '../services/task/createTask'
import { useToast } from 'jera-design-ui'
import React from 'react'
import { useNavigation } from 'react-navi'

const useInputText = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue)

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  }
}

export const useNewTaskFormState = (): NewTaskForm => {
  const { showToast } = useToast()
  const [id, setId] = React.useState<React.ReactText>('')
  const title = useInputText('')
  const description = useInputText('')
  const newTaskState = {
    id: { value: id, setValue: setId },
    title,
    description,
  }
  const navigation = useNavigation()

  // TODO: Add better validations here
  const buildNewTask = async (): Promise<Task> => {
    const { id, title, description } = newTaskState

    if (id.value === '') throw new Error('"id" is empty!')

    if (title.value === '') throw new Error('"title" is empty!')

    if (description.value === '') throw new Error('"description" empty!')

    return {
      id: Number(id.value),
      title: title.value,
      description: description.value,
    }
  }

  const saveButtonClickHandler = () => {
    ;(async () => {
      const newTask = await buildNewTask()
      await createTask(newTask)
      showToast({
        position: 'bottom-right',
        style: 'success',
        message: 'Successfully created!',
      })
      navigation.navigate('/apps/todo/list')
    })().catch((e) => {
      showToast({
        position: 'bottom-right',
        style: 'danger',
        message: String(e),
      })
    })
  }

  return {
    newTaskState,
    saveButtonClickHandler,
  }
}
