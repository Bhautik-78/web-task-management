import { Footer } from './components/organisms/Footer'
import { Header } from './components/organisms/Header'
import AppContext from './components/AppContext'

import { routes } from './route'
import React, { Suspense, useState } from 'react'
import { Router, View, useCurrentRoute, useActive } from 'react-navi'
import { useErrorState } from './hooks/useErrorState'
import { useIsLoggedInState } from './hooks/useIsLoggedInState'

const App: React.FC = () => {
  const route = useCurrentRoute()
  const globalState = {
    errorMessageState: useErrorState(),
    isLoggedInState: useIsLoggedInState(),
  }
  const [isRendered, setIsRendered] = useState<boolean>(false)
  React.useEffect(() => {
    ;(async () => {
      globalState.isLoggedInState.setIsLoggedInFlag(
        Boolean(localStorage.getItem('isLoggedIn'))
      )
      setIsRendered(true)
    })()
  })

  return (
    isRendered && (
      <AppContext.Provider value={globalState}>
        <Router
          routes={routes}
          context={{ isLoggedIn: globalState.isLoggedInState.isLoggedIn }}
        >
          <Header />
          <Suspense fallback={null}>
            <div id="wrapper">
              <View />
            </div>
          </Suspense>
          <Footer />
        </Router>
      </AppContext.Provider>
    )
  )
}
export { App }
