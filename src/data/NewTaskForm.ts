export type NewTaskForm = {
  newTaskState: {
    id: {
      value: React.ReactText
      setValue: React.Dispatch<React.SetStateAction<React.ReactText>>
    }
    title: {
      value: string
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
    description: {
      value: string
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
  }
  saveButtonClickHandler: () => void
}
