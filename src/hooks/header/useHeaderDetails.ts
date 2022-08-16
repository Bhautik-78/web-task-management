import React, { useContext, useState } from 'react'
import { useNavigation, useHistory } from 'react-navi'
import { usePowerPlantOptions } from '../auth/usePowerPlantOptions'
import { useAssetGroupOptions } from '../auth/useAssetGroupOptions'
import AppContext from '../AppContext'
/**
 * Search Asset State Object Type
 */
export type useHeaderDetails = {
    powerPlantOptions: any,
    powerPlant: any,
    assetGroup: any,
    team: any,
    goToRegestration: () => void,
    comparTeamValue: () => void,
    compareAssetGrouptValue: () => void,
    comparePlantValue: () => void
}

/**
 * useSearchAssetState is functional component for Search Asset Page
 * It performs actions like :
 *  - Show Recent Registered facilities
 *  - Handle input to search assets
 *  - Set hasSearchError on invalid search input
 *
 * @returns SearchAssetState
 */
export const useHeaderDetails = (): useHeaderDetails => {
    const navigation = useNavigation()
    const [powerPlant, setPowerPlant] = useState<any>('')
    const [selectedPowerPlantId, setSelectedPowerPlantId] = useState<any>('')
    const [assetGroup, setAssetGroup] = useState<any>('')
    const [selectedUnitId, setSelectedUnitId] = useState<any>('')
    const [team, setTeam] = useState<any>('')
    const [selectedTeamId, setSelectedTeamId] = useState<any>('')
    const [localData, setLocalData] = useState<any>('')
    let userSetting: any = JSON.parse(
        localStorage.getItem('userSetting')
    );
    // fetch and set powerplant options
    const { powerPlantOptions, fetchPowerPlantOptions } = usePowerPlantOptions()
    const {
        assetGroupOptions,
        teamOptions,
        fetchAssetGroupOptions,
        fetchTeamOptions
    } = useAssetGroupOptions()

    // let userSetting: any =  JSON.parse(
    //     localStorage.getItem('userSetting')
    // );
    // setLocalData(userSetting)

    //CAll Poweplant api and compare to the value of that to saved value in local storage for powerplat-id and set the matching data to header
    const comparePlantValue = async () => {
        let userSetting: any = await JSON.parse(
            localStorage.getItem('userSetting')
        );

        const options: any = powerPlantOptions.map((obj: any) => {
            if (userSetting != null && userSetting['power-plant-id'] === obj['value']) {
                return obj
            }
        })


        const obj = Object.assign([], ...options );
        if(userSetting!=undefined && userSetting['power-plant-name']==undefined && obj.label!= undefined && obj.label != ""){
            userSetting['power-plant-name'] =obj.label;
            localStorage.setItem('userSetting',JSON.stringify(userSetting));
        }
        setPowerPlant(obj.label);
        let responsedata: any = await fetchAssetGroupOptions(obj.value)
        
        setSelectedPowerPlantId(obj.value)
    }


    /*
    Call assest group api and compare that to local storage value of unit-id to get correct value of selected unit
     */
    const compareAssetGrouptValue = async () => {
        let userSetting: any = await JSON.parse(
            localStorage.getItem('userSetting')
        );
        const options: any = assetGroupOptions.map((obj: any) => {
            if (userSetting != null && userSetting['asset-task-group-id'] === obj['value']) {
                return obj
            }
        })
        const obj = Object.assign([], ...options );
        if(userSetting!=undefined && userSetting['asset-task-group-name']==undefined && obj.label!= undefined && obj.label != ""){
            userSetting['asset-task-group-name'] =obj.label;
            localStorage.setItem('userSetting',JSON.stringify(userSetting));
        }
        setAssetGroup(obj.label);
        await fetchTeamOptions(obj.value)
        setSelectedUnitId(obj.value)
    }

    //Compare team value api data to localstorage data to get required result
    const comparTeamValue = async () => {
        let userSetting: any = await JSON.parse(
            localStorage.getItem('userSetting')
        );
        const options: any = teamOptions.map((obj: any) => {
            if (userSetting != null && userSetting['team-id'] === obj['value']) {
                return obj;
            }
        })

        const obj = Object.assign([], ...options );
        if(userSetting!=undefined && userSetting['team-name']==undefined && obj.label!= undefined && obj.label != ""){
            userSetting['team-name'] =obj.label;
            localStorage.setItem('userSetting',JSON.stringify(userSetting));
        }
        setTeam(obj.label)
        
        setSelectedTeamId(obj.value)
    }

    //Redirect user to Registraion page with selected values
    const goToRegestration = () => {

        navigation.navigate('/user-registration', {
            state: {
                powerplant: {
                    label: userSetting['power-plant-name'],
                    value: userSetting['power-plant-id']
                },
                unit: {
                    label: userSetting['asset-task-group-name'],
                    value: userSetting['asset-task-group-id']
                },
                team:{
                    label: userSetting['team-name'],
                    value: userSetting['team-id']
                }
            }
        })
        // history.push('//user-registration')
    }

    const getLocalData = async () => {
        let userSetting: any = await JSON.parse(
            localStorage.getItem('userSetting')
        );
        const obj = Object.assign([], ...userSetting );
        setLocalData(obj)
    }

    // On initial load fetch recent registered facilities
    React.useEffect(() => {
        ; (async () => {
            await fetchPowerPlantOptions()
            // await getLocalData()
        })()
    }, [])
    // React.useEffect(() => {
    //     ; (async () => {
    //         await getLocalData()
    //     })()
    // }, [localData])
    React.useEffect(() => {
        ; (async () => {
            await comparePlantValue();
            await compareAssetGrouptValue();
            await comparTeamValue();
        })()
            
    }, [powerPlantOptions, selectedPowerPlantId, selectedUnitId])

    return {
        powerPlantOptions,
        powerPlant,
        assetGroup,
        team,
        goToRegestration,
        comparTeamValue,compareAssetGrouptValue,comparePlantValue
    }
}