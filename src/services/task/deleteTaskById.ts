export const deleteTaskById = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/task/${id}`, {
    method: 'DELETE',
    mode: 'cors',
  })
}
