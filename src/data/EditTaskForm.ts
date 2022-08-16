export type EditTaskForm = {
  editedTaskState: {
    id: number
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
