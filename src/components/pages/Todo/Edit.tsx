import * as Template from '../../templates/Todo/Edit'
import React from 'react'
import {useEditTaskFormState} from '../../../hooks/useEditTaskFormState'

export const Edit: React.FC<{ taskId: number }> = ({ taskId }) => {
  const { editedTaskState, saveButtonClickHandler } = useEditTaskFormState(taskId)
  const backButtonHref = "/apps/todo/list"

  return <Template.Edit {...{ backButtonHref, form: { editedTaskState, saveButtonClickHandler }}} />
}
