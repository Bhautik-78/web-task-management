import { Task } from '../../data/Task'
import { fetchAsJSON } from '../../utils/fetchAsJSON'

export const fetchTaskById = (id: number): Promise<Task> => {
  return fetchAsJSON(`http://localhost:3000/task/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
  })
}
