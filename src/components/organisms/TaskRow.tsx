import {Button, Icon} from 'jera-design-ui'
import React from 'react'
import {Task} from '../../data/Task'

export const TaskRow: React.FC<{
  task: Task
  editButtonProps: { href: string }
  trashButtonProps: { disabled: boolean; onClick: () => void }
}> = ({ task, editButtonProps, trashButtonProps }) => (
  <tr>
    <td>{task.id}</td>
    <td>{task.title}</td>
    <td>{task.description}</td>
    <td>
    <ul className="uk-iconnav">
      <li>
        <Button.Icon tooltip="edit" {...editButtonProps}>
          <Icon name="pencil" />
        </Button.Icon>
      </li>
      <li>
        <Button.Icon tooltip="delete" {...trashButtonProps}>
          <Icon name="trash" />
        </Button.Icon>
      </li>
    </ul>
    </td>
  </tr>
)
