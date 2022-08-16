import moment from 'moment'
import { Asset } from '../data/types/Asset'
import { Facility } from '../data/types/Facility'
import AxiosHttpService from './AxiosHttpService'

export const TaskListService = {
  fetchRecentRegisteredFacilities: (): Promise<Facility[]> => {
    return AxiosHttpService.Get(`asset/measurement-item-sets/recents`)
  },
  fetchTaskList: (powerPlantId: string, assetTaskGroupId: string): Promise<any[]> => {
    const url =
      `tasks` +
      `?power-plant-id=${powerPlantId}` +
      `&asset-task-group-id=${assetTaskGroupId}`
    return AxiosHttpService.Get(url)
  },
}
