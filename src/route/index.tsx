import React from 'react'
import { mount, route, redirect, map, compose, withView } from 'navi'

//Components
import { Login } from '../components/auth/Login'
import { UserRegistration } from '../components/auth/UserRegistration'
import { TaskManagement } from '../components/task-management/TaskManagement'
import { TaskDetail } from '../components/task-detail/TaskDetail'
import { SearchAssetResult } from '../components/task-management/SearchAssetResult'
import { MeasurementRecordList } from '../components/measurement-records/MeasurementRecordList'
import { privateRoute } from './privateRoute'

const routes = compose(
  mount({
    '/login': map(async (request, context) => {
      return !context.isLoggedIn ? route({ view: <Login /> }) : redirect('/')
    }),
    '/user-registration': privateRoute({
      view: <UserRegistration />,
      type: 'private',
    }),
    '/task-detail': privateRoute({
      view: <TaskDetail />,
      type: 'private',
    }),
    '/task-detail/:taskId': privateRoute({
      view: <TaskDetail />,
      type: 'private',
    }),
    '/search-asset-result': privateRoute({
      view: <TaskDetail />,
      type: 'private',
    }),
    '/measurement-record-list/:assetId': privateRoute({
      view: <MeasurementRecordList />,
      type: 'private',
    }),
    '/': privateRoute({ view: <TaskManagement />, type: 'private' }),
  })
)

export { routes }
