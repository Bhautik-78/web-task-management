import { AssetGroup } from '../data/types/AssetGroup'
import { PowerPlant } from '../data/types/PowerPlant'
import AxiosHttpService from './AxiosHttpService'

export const CommonService = {
  fetchAssetGroupOptions: (powerPlantId: string): Promise<AssetGroup[]> => {
    return AxiosHttpService.Get(`asset/asset-task-groups?power-plant-id=${powerPlantId}`)
  },
  fetchPowerPlantOptions: (): Promise<PowerPlant[]> => {
    return AxiosHttpService.Get(`power-plants`)
  },
}
