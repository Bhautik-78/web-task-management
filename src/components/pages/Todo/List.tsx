import * as Template from '../../templates/Todo/List'
import React from 'react'
import {useTaskListState} from '../../../hooks/useTaskListState'

export const List: React.FC = () => {
  const { tasks, useTrashButtonProps } = useTaskListState()
  const newTaskButtonHref = "/apps/todo/create"
  const editButtonHrefBase = "/apps/todo/edit"

  return <Template.List {...{ editButtonHrefBase, newTaskButtonHref, tasks, useTrashButtonProps }} />
}
