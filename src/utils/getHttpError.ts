export const getHttpError = (error: any) => {
  switch (error.response.status) {
    case 400:
      return 'HTTP_ERRORS.MR_IR_004'
    case 401:
      return 'HTTP_ERRORS.MR_IR_005'
    case 404:
      return 'HTTP_ERRORS.MR_IR_006'
    case 409:
      return 'HTTP_ERRORS.MR_IR_007'
  }
}
