import { Task } from '../../data/Task'
import { fetchAsJSON } from '../../utils/fetchAsJSON'

// TODO: add a validation.
export const fetchAllTasks = (): Promise<Task[]> => {
  return fetchAsJSON('http://localhost:3000/tasks', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
  })
}
