import React from 'react'
import { OptionType } from '../../data/types/OptionType'
import { CommonService } from '../../services/CommonService'

/**
 * usePowerPlantOptions
 * Fetch powerPlantOptions from API, set array of optionType<label, value> into powerPlantOptions
 * @returns Object<powerPlantOptions, fetchPowerPlantOptions>
 */
export const usePowerPlantOptions = (): {
  powerPlantOptions: OptionType[]
  fetchPowerPlantOptions: () => Promise<void>
} => {
  const [powerPlantOptions, setPowerPlantOptions] = React.useState<
    OptionType[]
  >([])
  const fetchPowerPlantOptions = async () => {
    return await CommonService.fetchPowerPlantOptions().then((res: any) => {
      const options: OptionType[] = res.data.map((obj: any) => {
        return {
          value: obj['power-plant-id'],
          label: obj['power-plant-text'],
        }
      })
      setPowerPlantOptions(options)
    })
  }
  return {
    powerPlantOptions,
    fetchPowerPlantOptions,
  }
}
