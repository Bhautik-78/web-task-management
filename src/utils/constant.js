export const getTaskName = (status) => {
  let text = ""

  if(Number(status) === 1) {
    text = '新規登録'
  } else if(Number(status) === 2) {
    text = '未着手'
  } else if(Number(status) === 3) {
    text = '待機中'
  } else if(Number(status) === 4) {
    text = '実施中'
  } else if(Number(status) === 5) {
    text = '完了'
  } else if(Number(status) === 6) {
    text = '引継済'
  }else if(Number(status) === 7) {
    text = '無効'
  }

  return text
}

