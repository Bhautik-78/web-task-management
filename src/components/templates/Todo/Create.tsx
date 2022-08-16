import { NewTaskForm } from '../../../data/NewTaskForm'
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

const WithLabel: React.FC<{ label: string }> = ({ label, children }) => (
  <div>
    <Label>{label}</Label>
    {children}
  </div>
)

export const Create: React.FC<{
  backButtonHref: string
  form: NewTaskForm
}> = ({ backButtonHref, form: { newTaskState, saveButtonClickHandler } }) => (
  <>
    <NavSection>
      <>
        <Button.Icon href={backButtonHref}>
          <Icon name="chevron-left" />
        </Button.Icon>
        <Text.Title>Create a task</Text.Title>
      </>
      <></>
      <Button.Middle onClick={saveButtonClickHandler}>Save</Button.Middle>
    </NavSection>
    <Section>
      <form className="uk-form-stacked">
        <WithLabel label="Id">
          <Input.Integer
            classString="uk-form-width-small"
            {...newTaskState.id}
          />
        </WithLabel>
        <Margin.Bottom20px />
        <WithLabel label="Title">
          <Input.Text
            classString="uk-form-width-large"
            {...newTaskState.title}
          />
        </WithLabel>
        <Margin.Bottom20px />
        <WithLabel label="Description">
          <Input.Text
            classString="uk-form-width-large"
            {...newTaskState.description}
          />
        </WithLabel>
      </form>
    </Section>
  </>
)
