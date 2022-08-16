import UIkit from 'uikit'

export const modalConfirm = (message: string): Promise<string> =>
  new Promise((resolve, reject) => {
    UIkit.modal
      .confirm(message)
      .then(() => {
        resolve('OK clicked!')
      })
      .catch(() => {
        reject('Cancel clicked!')
      })
  })
