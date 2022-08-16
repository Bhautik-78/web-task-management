import { Task } from '../../data/Task'

const readByStatusCode = async (response: Response): Promise<Task> => {
  const statusCode = response.status
  if (statusCode == 201) return response.json()
  else throw new Error(await response.text())
}

export const createTask = async (task: Task): Promise<Task> => {
  const response = await fetch('http://localhost:3000/task', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return readByStatusCode(response)
}
