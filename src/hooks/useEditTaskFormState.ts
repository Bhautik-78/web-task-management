import { EditTaskForm } from '../data/EditTaskForm'
import { editTask } from '../services/task/editTask'
import { fetchTaskById } from '../services/task/fetchTaskById'
import { useToast } from 'jera-design-ui'
import React from 'react'
import { useNavigation } from 'react-navi'

const useInputText = (initialValue: string) => {
  const [formValue, setFormValue] = React.useState(initialValue)
  const [value, setValue] = React.useState(initialValue)
  const [placeholder, setPlaceholder] = React.useState(initialValue)
  const [textColor, setTextColor] = React.useState<string | undefined>(
    undefined
  )

  React.useEffect(() => {
    // If value was changed display warning color.
    setTextColor(value !== placeholder ? 'uk-text-warning' : undefined)

    // If value was empty placeholder will be submitted.
    setFormValue(value || placeholder)
  }, [value, placeholder])

  return {
    formValue,
    domAttributes: {
      value,
      placeholder,
      textColor,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    },
    setters: {
      setValue,
      setPlaceholder,
      setTextColor,
    },
  }
}

export const useEditTaskFormState = (id: number): EditTaskForm => {
  const { showToast } = useToast()
  const title = useInputText('')
  const description = useInputText('')
  const editedTaskState = {
    id,
    title: title.domAttributes,
    description: description.domAttributes,
  }
  const editedTask = {
    id,
    title: title.formValue,
    description: description.formValue,
  }
  const navigation = useNavigation()

  const initWithFetchedValue = (
    obj: {
      setValue: React.Dispatch<React.SetStateAction<string>>
      setPlaceholder: React.Dispatch<React.SetStateAction<string>>
    },
    value: string
  ) => {
    obj.setValue(value)
    obj.setPlaceholder(value)
  }

  React.useEffect(() => {
    ;(async () => {
      const targetTask = await fetchTaskById(id)
      initWithFetchedValue(title.setters, targetTask.title)
      initWithFetchedValue(description.setters, targetTask.description)
    })()
  }, [])

  const saveButtonClickHandler = () => {
    ;(async () => {
      await editTask(editedTask)
      showToast({
        position: 'bottom-right',
        style: 'success',
        message: 'Successfully updated!',
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
    editedTaskState,
    saveButtonClickHandler,
  }
}
