import { Task } from '../../data/Task'

const readByStatusCode = async (response: Response): Promise<void> => {
  const statusCode = response.status
  if (statusCode == 204) return
  else throw new Error(await response.text())
}

export const editTask = async (task: Task): Promise<void> => {
  const response = await fetch('http://localhost:3000/task', {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  await readByStatusCode(response)
}
