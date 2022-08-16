import React from 'react'
import { OptionType } from '../../data/types/OptionType'
import { CommonService } from '../../services/CommonService'

/**
 * useAssetGroupOptions
 * Fetch assetGroupOptions from API based on selection of PowerPlantID, set array of
 * optionType<label, value> into assetGroupOptions
 *
 * @returns Object<powerPlantOptions, fetchPowerPlantOptions>
 */
export const useAssetGroupOptions = (): {
  assetGroupOptions: OptionType[]
  teamOptions: OptionType[]
  fetchAssetGroupOptions: (powerPlantId: string) => Promise<void>
  fetchTeamOptions: (unitId: string) => void
  resetAssetGroupOptions: () => void
  resetTeamGroupOptions: () => void
} => {
  const [assetGroupOptions, setAssetGroupOptions] = React.useState<
    OptionType[]
  >([])
  const [teamOptions, setTeamOptions] = React.useState<
    OptionType[]
  >([])
  const [unitApiResponse, setUnitApiResponse] = React.useState<
    any
  >([])
  const fetchAssetGroupOptions = async (powerPlantId: string) => {
    return await CommonService.fetchAssetGroupOptions(powerPlantId).then(
      (res: any) => {
        setUnitApiResponse(res);
        const options: OptionType[] = res.data.map((obj: any) => {
          return {
            value: obj['asset-task-group-id'],
            label: obj['asset-task-group-name'],
          }
        })

        setAssetGroupOptions(options)

      }
    )
  }

  const resetAssetGroupOptions = () => {
    setAssetGroupOptions([])
  }

  const resetTeamGroupOptions = () => {
    setTeamOptions([])
  }

  const fetchTeamOptions = (unitId: string) => {
    console.log("??????",unitId);
    console.log("??????",unitApiResponse);
    if (unitApiResponse.data) {
      const teamsdata: any = unitApiResponse.data.map((obj: any) => {
        if (obj['asset-task-group-id'] === unitId) {
          console.log("??------");
          return obj['teams'].map((team: any) => {
            return {
              value: team['team-id'],
              label: team['team-name'],
            }
          })
        }
      })
      const obj = Object.assign([], ...teamsdata);

      setTeamOptions(obj)
    }


  }
  return {
    assetGroupOptions,
    teamOptions,
    fetchAssetGroupOptions,
    fetchTeamOptions,
    resetAssetGroupOptions,
    resetTeamGroupOptions
  }
}
