import * as Template from '../../templates/Todo/Create'
import React from 'react'
import {useNewTaskFormState} from '../../../hooks/useNewTaskFormState'

export const Create: React.FC = () => {
  const { newTaskState, saveButtonClickHandler } = useNewTaskFormState()
  const backButtonHref = "/apps/todo/list"

  return <Template.Create {...{ backButtonHref, form: { newTaskState, saveButtonClickHandler }}} />
}
