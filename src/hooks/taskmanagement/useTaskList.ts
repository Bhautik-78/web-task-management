import React, { useContext } from 'react'
import { UserSetting } from '../../data/types/UserSetting'
import { getHttpError } from '../../utils/getHttpError'
import AppContext from '../../components/AppContext'
// import { useLogoutState } from './useLogoutState'
import { TaskListService } from '../../services/TaskListService'
import { useNavigation } from 'react-navi'
import { useTranslation } from 'react-i18next'
import { compose, map, mount, redirect, withStatus, withView } from 'navi'
import moment from 'moment';

/**
 * useCustomUserSetting
 *
 * fetch userSettings using userPrincipalName
 * If received set customUserSetting obejct {object<power-plant-id,asset-group-id>}
 * else set HTTP errorMessage
 * @returns {object<customUserSetting, fetchCustomUserSettings>}
 */
export const useTaskList = (): {
    taskAssignees: any,
    tasks: any,
    assignees:any,
    allCountForCategoryOne: any 
    allCountForCategoryTwo: any
    allCountForCategoryThree: any
    completedCountForCategoryOne: any
    completedCountForCategoryTwo: any
    completedCountForCategoryThree: any
  fetchTaskList: (powerPlantId: string, assetTaskGroupId: string) => Promise<void>
} => {
  const { errorMessageState } = useContext(AppContext)
//   const { handleLogout } = useLogoutState()
  const { t } = useTranslation()
//   const navigation = useNavigation()

  const [
    assignees,
    setAssignees,
  ] = React.useState<any>(null)
  
  const [
    taskAssignees,
    setTaskAssignees,
  ] = React.useState<any>(null)

  const [
    tasks,
    setTasks,
  ] = React.useState<any>(null)

  const [
      allCountForCategoryOne,
      setAllCountForCategoryOne,
  ] = React.useState<any>(null)

  const [
      allCountForCategoryTwo,
      setAllCountForCategoryTwo,
  ] = React.useState<any>(null)

  const [
      allCountForCategoryThree,
      setAllCountForCategoryThree,
  ] = React.useState<any>(null)

  const [
      completedCountForCategoryOne,
      setCompletedCountForCategoryOne,
  ] = React.useState<any>(null)

  const [
      completedCountForCategoryTwo,
      setCompletedCountForCategoryTwo,
  ] = React.useState<any>(null)

  const [
      completedCountForCategoryThree,
      setCompletedCountForCategoryThree,
  ] = React.useState<any>(null)

  const fetchTaskList = async (powerPlantId: string, assetTaskGroupId: string) => {
        const userSetting: any = await JSON.parse(
            localStorage.getItem('userSetting')
        )
        let now: any = new Date();
        let currentDate: any = now.setHours(0, 0, 0, 0);
    return await TaskListService.fetchTaskList(powerPlantId,assetTaskGroupId)
      .then((res: any) => {

        let response: any = res.data.tasks;
        const completedCountDataForCategoryOne: any = [];
        const completedCountDataForCategoryTwo: any = [];
        const completedCountDataForCategoryThree: any = [];
        const allCountDataForCategoryOne: any = [];
        const allCountDataForCategoryTwo: any = [];
        const allCountDataForCategoryThree: any = [];
        response.map((item: any) => {
            const date: any = new Date(item['planned-date-time']);
            const PlannedDate: any = date.setHours(0, 0, 0, 0);
            if ((item.hasOwnProperty('takeover-team-id') === false || item['takeover-team-id'] === userSetting['team-id']) && (PlannedDate <= currentDate || item['planned-date-time'] === '')) {
                if (item['status'] === 5) {
                    if (item['task-category-id'] == 1) {
                        completedCountDataForCategoryOne.push(item);
                    }
                    else if (item['task-category-id'] == 2) {
                        completedCountDataForCategoryTwo.push(item);
                    }
                    else {
                        completedCountDataForCategoryThree.push(item);
                    }
                }
                else if (item['status'] !== 6 && item['status'] !== 7) {
                   
                    if (item['task-category-id'] == 1) {
                        
                        allCountDataForCategoryOne.push(item);
                    }
                    else if (item['task-category-id'] == 2) {
                        allCountDataForCategoryTwo.push(item);
                    }
                    else {
                        allCountDataForCategoryThree.push(item);
                    }
                }
            }   
        })
        setAllCountForCategoryOne(allCountDataForCategoryOne);
        setAllCountForCategoryTwo(allCountDataForCategoryTwo);
        setAllCountForCategoryThree(allCountDataForCategoryThree);
        setCompletedCountForCategoryOne(completedCountDataForCategoryOne);
        setCompletedCountForCategoryTwo(completedCountDataForCategoryTwo);
        setCompletedCountForCategoryThree(completedCountDataForCategoryThree);
        let groupAssigneesByTaskId = {};
        for(let i=0;i<=res.data.assignees.length-1;i++){
          if(groupAssigneesByTaskId[res.data.assignees[i]['task-id']]){
          }else{
             groupAssigneesByTaskId[res.data.assignees[i]['task-id']]=[];
          }
          groupAssigneesByTaskId[res.data.assignees[i]['task-id']].push(res.data.assignees[i])
        }
        let filteredTasks = applyFilter(res.data.tasks);
        let sortedTasks = applySorting(filteredTasks);

        setTaskAssignees(groupAssigneesByTaskId);
        setTasks(sortedTasks);
        setAssignees(res.data.assignees);
        
        
        // localStorage.setItem('userSetting', JSON.stringify(res.data[0]));
        // // redirect('/')
        // // navigation.setContext({ path: "/"});
        // navigation.navigate('/')
        
      })
      .catch((err) => {
        if (err.response) {
        //   if (err.response.status === 404) {
        //     // redirect('/user-registration')
        //     // navigation.setContext({ path: "/user-registration"});
        //     navigation.navigate('/user-registration')
        //   } else {
            const httpError = getHttpError(err)
            if (httpError) {
              errorMessageState.setMessage(t(httpError))
            } else {
              console.log(err)
            }
            // handleLogout()
        //   }
        } else {
        //   handleLogout()
          errorMessageState.setMessage(err.message)
        }
      })
  }

  const applyFilter = (list) => {
    let now = new Date();
    let newList = list.filter(item => {
      if(item['planned-date-time'] != "" && now > new Date(item['planned-date-time']) && (item['status'] == 2 || item['status'] == 1 || item['status'] == 3)){
        item['implementation-schedule-excess-indication']=true;
      }else{
        item['implementation-schedule-excess-indication']=false;
      }
      if(item['due-date-time'] != "" && now > new Date(item['planned-date-time']) && (item['status'] != 6 && item['status'] != 7)){
        item['overdue-indication'] = true;
      }else{
        item['overdue-indication'] = false;
      }
      return (item.status >= 2 && item.status <= 5) && (item['planned-date-time']=='' || moment(item['planned-date-time']).unix() < moment().unix());
    })
    // console.log('newList',newList);

    return newList;
  }

  const applySorting = (list) => {
    list.sort(function(a,b){
      //sort by task priority id desc Emergency → High → Medium → Low → Blank
      let taskPrioritySort = 0;
      let aValue = a['task-priority-id'];
      let bValue = b['task-priority-id'];
        if(aValue === "" || aValue === null || aValue === 0){
          return taskPrioritySort = 1;
        }
        if(bValue === "" || bValue === null || bValue === 0) {
          return taskPrioritySort = -1;
        }
        if(aValue === bValue){
          taskPrioritySort = 0;
        }else{
          taskPrioritySort = aValue < bValue ? -1 : 1;
          return taskPrioritySort;
        }
      let plannedDateSort = 0;
      if(taskPrioritySort == 0) {
        //sort by planned Date ascending order
        let plannedDateA = a['planned-date-time'] != "" ? new Date(a['planned-date-time']) : "";
        let plannedDateB = b['planned-date-time'] != "" ? new Date(b['planned-date-time']) : "";
        
        if(plannedDateA === "" || plannedDateA === null) return 1;
        if(plannedDateB === "" || plannedDateB === null) return -1;
        if(plannedDateA > plannedDateB == false && plannedDateA < plannedDateB == false){
          plannedDateSort = 0;
        }else{
          return plannedDateSort = plannedDateA < plannedDateB ? -1 : 1;
        }
      }
      if(plannedDateSort == 0){
        //sort by task id Descending
        let taskIdSort = 0;
        if(a['task-id'] === "" || a['task-id'] === null) return 1;
        if(b['task-id'] === "" || b['task-id'] === null) return -1;
        if(a['task-id'] === b['task-id']){
          return taskIdSort = 0;
        }else{
          return taskIdSort = a['task-id'] < b['task-id'] ? -1 : 1;
        }
      }
    })

    return list;
  }

  return {
    taskAssignees,
    tasks,
    assignees,
    fetchTaskList,
    allCountForCategoryOne, 
    allCountForCategoryTwo,
    allCountForCategoryThree,
    completedCountForCategoryOne,
    completedCountForCategoryTwo,
    completedCountForCategoryThree,
  }
}