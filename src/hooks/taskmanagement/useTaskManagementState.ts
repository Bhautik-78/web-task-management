import React, { useContext, useState } from 'react'
import { useNavigation } from 'react-navi'
import AppContext from '../../components/AppContext'
import { Facility } from '../../data/types/Facility'
import { useTaskList } from './useTaskList'
import { TaskStatus } from '../../data/TaskStatus';
import ApexCharts from 'apexcharts';


/**
 * Search Asset State Object Type
 */
export type TaskManagementState = {
    fetchCurrentDate: () => void
    currentDate: any
    tasks: any
    assignees: any,
    taskAssignees: any,
    taskStatus: any,
    activePage: any,
    chartOptions: any
    chartSeries: any
    allCountForCategoryOne: any 
    allCountForCategoryTwo: any
    allCountForCategoryThree: any
    completedCountForCategoryOne: any
    completedCountForCategoryTwo: any
    completedCountForCategoryThree: any
    newTaskTransition:() => void
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
export const useTaskManagementState = (): TaskManagementState => {
    const navigation = useNavigation()
    //   const { errorMessage, setMessage } = useContext(AppContext).errorMessageState
    //hook to have set state for currentDate
    const [currentDate, setCurrentDate] = useState<any>('');
    const [activePage, setActivePage] = useState<number>(1);
    const taskStatus = TaskStatus;
    const [chartOptions, setChartOptions] = useState<any>('')
    const [chartSeries, setChartSeries] = useState<any>('')
    //   //hook to have set state for hasSearchError
    //   const [hasSearchError, setHasSearchError] = useState<boolean>(false)
    //   // hook to fetch facilities and set facilites
    //   const { facilities, fetchFacilities } = useFacilities()
    //   //hoot to set state for active page for pagination
    //   const [activePage, setActivePage] = useState<number>(1)

    //handler function for search input
    //set hasSerachError flag on valid/invalid input
    //   const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.value === '') {
    //       setHasSearchError(true)
    //     } else {
    //       setHasSearchError(false)
    //     }
    //     setSeachText(e.target.value)
    //   }

    //Enter key event handler on search input
    //If input is valid, search assets
    //   const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.which == 13) {
    //       if (searchText == '') {
    //         setHasSearchError(true)
    //       } else {
    //         handleSearchAssets()
    //       }
    //     }
    //   }

    //   //Page change event handler
    //   //Update active page numner

    const {
        tasks,
        assignees,
        fetchTaskList,
        taskAssignees,
        allCountForCategoryOne, 
        allCountForCategoryTwo,
        allCountForCategoryThree,
        completedCountForCategoryOne,
        completedCountForCategoryTwo,
        completedCountForCategoryThree,
    } = useTaskList();

    //Page change event handler
    //Update active page numner
    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber)
    }

    const fetchCurrentDate = () => {
        let date: any = new Date(),
            month: any = '' + (date.getMonth() + 1),
            day: any = '' + date.getDate(),
            year: any = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        setCurrentDate([year, month, day].join('-'))
    }

    const fetchTaskDetails = () => {
        const userSetting: UserSetting = JSON.parse(
            localStorage.getItem('userSetting')
          )
          if (userSetting) {
            fetchTaskList(userSetting['power-plant-id'], userSetting['asset-task-group-id'])
          }
        fetchTaskList
    }

    //redirect user to task-detail screen 
    const newTaskTransition = () =>{
        navigation.navigate('/task-detail');
    }

    const renderChart = () => {
        setChartOptions({
            chart: {
                height: 228,
                type: 'radialBar',
            },
            colors: ["#C1C8CB"],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '64%',
                    },
                    dataLabels: {
                        show: false
                    },
                    track: {
                        background: '#455054'
                    }
                },
            },
            stroke: {
                lineCap: 'round',
            },
        }
        )

        if(allCountForCategoryOne && completedCountForCategoryOne){
            let data:any = (completedCountForCategoryOne / allCountForCategoryOne) * 100;
            setChartSeries([data])
        }
    }

    //Search Assets handler
    // redirect user to search asset result page with the search term and query params
    //   const handleSearchAssets = () => {
    //     navigation.navigate('/search-asset-result?searchText=' + searchText)
    //   }

    // On initial load fetch recent registered facilities
    React.useEffect(() => {
        ; (async () => {
            await fetchCurrentDate()
            await fetchTaskDetails()
            await renderChart()
        })()
    }, [])

    return {
        fetchCurrentDate,
        currentDate,
        tasks,
        assignees,
        taskAssignees,
        taskStatus,
        activePage,
        chartOptions,
        chartSeries,
        allCountForCategoryOne, 
        allCountForCategoryTwo,
        allCountForCategoryThree,
        completedCountForCategoryOne,
        completedCountForCategoryTwo,
        completedCountForCategoryThree,
        newTaskTransition
    }
}