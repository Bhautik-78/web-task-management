import {
  Margin,
  Input,
  Label,
  NavSection,
  Section,
  Text,
  Button,
  Icon,
} from 'jera-design-ui'
import React from 'react'
import {EditTaskForm} from '../../../data/EditTaskForm'

const WithLabel: React.FC<{ label: string, }> = ({ label, children }) => (
  <div>
    <Label>{ label }</Label>
    { children }
  </div>
)

export const Edit: React.FC<{
  backButtonHref: string
  form: EditTaskForm
}> = ({
  backButtonHref,
  form: {
    editedTaskState,
    saveButtonClickHandler,
  }
}) => (
  <>
    <NavSection>
      <>
        <Button.Icon href={backButtonHref}><Icon name="chevron-left"/></Button.Icon>
        <Text.Title>Edit a task</Text.Title>
      </>
      <></>
      <Button.Middle onClick={saveButtonClickHandler}>Save</Button.Middle>
    </NavSection>
    <Section>
      <form className="uk-form-stacked">
        <WithLabel label="Id">
          <Input.Integer
            classString="uk-form-width-small"
            value={editedTaskState.id}
            disabled
          />
        </WithLabel>
        <Margin.Bottom20px />
        <WithLabel label="Title">
          <Input.Text
            classString="uk-form-width-large"
            {...editedTaskState.title}
          />
        </WithLabel>
        <Margin.Bottom20px />
        <WithLabel label="Description">
          <Input.Text
            classString="uk-form-width-large"
            {...editedTaskState.description}
          />
        </WithLabel>
      </form>
    </Section>
  </>
)
