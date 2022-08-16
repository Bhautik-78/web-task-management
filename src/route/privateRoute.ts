import { Matcher, redirect, route, map } from 'navi'

export const privateRoute = (props: any): Matcher<any, any> => {
  return map((request, context) =>
    context.isLoggedIn ? route({ view: props.view }) : redirect('/login')
  )
}
