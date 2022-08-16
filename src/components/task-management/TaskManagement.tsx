import { Facility } from '../../data/types/Facility'
import { useSearchAssetState } from '../../hooks/assets/useSearchAssetState'
import { useTaskManagementState } from '../../hooks/taskmanagement/useTaskManagementState'
import { SearchBox } from './SearchBox'
import React from 'react'
import Pagination from 'react-js-pagination'
import { Trans } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../common/ErrorMessage'
import moment from 'moment';
import ReactApexChart from "react-apexcharts";

/**
 * FacilityItem component
 * Individual facility item to show asset name, measurementItemSetName, and measurmentDate
 * @param facility
 * @returns
 */
const TaskList: React.FC<{
  task: any,
  newTaskTransition: () => void
}> = ({task, newTaskTransition}) => {
  const [
    isChecked,
    setIsChecked,
  ] = React.useState<boolean>(false)

  const [
    selectedId,
    setSelectedId,
  ] = React.useState<any>(false)

  const handleCheckClick = (taskID: any) => {
    setSelectedId(taskID)
  }
  const { t } = useTranslation()
  // console.log(task,);
  let assigneesList = task['assignees'].map((assignee, index) => {
    return assignee['user-name'];
  })
  assigneesList = [...new Set(assigneesList)]; //remove duplicates
  let assigneesListString = assigneesList.join();
  return (
    <tr>
      <td>
        <div className="custom_checkbox custom_checkbox_no_label">
          <input type="checkbox" id={'task_item_checkbox_'+task['task-id']} name="checkbox" value="checkbox_1" onChange={() => setIsChecked(!isChecked)} />
          <label for={'task_item_checkbox_'+task['task-id']}></label>
        </div>
        {/*<div className="custom_checkbox custom_checkbox_no_label">
          <label >
            <input type="checkbox" id="checkbox_1" name="checkbox" value="checkbox_1" onChange={() => setIsChecked(!isChecked)} />
          </label>
        </div>*/}
      </td>
      <td className="window_icon" onClick={newTaskTransition} ><a href={`/task-detail/${task['task-id']}`}>{task['task-id']}</a></td>
      <td>{task['task-priority-name']}</td>
      <td className="text-elipsis">{task['task-name']}</td>
      <td>{task['task-type-name']}</td>
      <td>{task['task-category-name']}</td>
      <td className="text-elipsis">
        {
          assigneesListString
        }
      </td>
      <td>
      {
        t('TASK_MANAGEMENT_LIST.STATUS.'+task['statusName'])
      }
      </td>
      <td className={task['implementation-schedule-excess-indication'] ? 'danger-cell':''}>
        {
          task['planned-date-time']!='' ? moment(task['planned-date-time']).format('M/D HH:MM'): ''
        }
      </td>
      <td className={task['overdue-indication'] ? 'danger-cell':''}>
        {
          task['due-date-time']!='' ? moment(task['due-date-time']).format('M/D HH:MM'): ''
        }
      </td>
      <td>{task['takeover-team-name']}</td>
      <td>
        <a href="javascript:void(0);" className={'btn_table_action' + (task['is-chain-memo-available']==false ? ' btn_table_add_icon':'')}>
        {
          task['is-chain-memo-available']==false ?
          t('TASK_MANAGEMENT_LIST.BUTTONS.ADD_TO') :
          t('TASK_MANAGEMENT_LIST.BUTTONS.BROWSE_EDIT')
        }
        </a>
      </td>
    </tr>
  )
}




/**
 * SearchAsset Component
 * - Search Input to search assets
 * - Display Recent Registered facilities with pagination
 */

const TaskManagement: React.FC = () => {
  const {
    errorMessage,
    activePage,
    hasSearchError,
    searchText,
    facilities,
    handleEnterKeyPress,
    handleSearchInputChange,
    handlePageChange,
  } = useSearchAssetState()
  const {
    fetchCurrentDate,
    currentDate,
    tasks,
    assignees,
    taskAssignees,
    taskStatus,
    chartOptions,
    chartSeries,
    allCountForCategoryOne,
    allCountForCategoryTwo,
    allCountForCategoryThree,
    completedCountForCategoryOne,
    completedCountForCategoryTwo,
    completedCountForCategoryThree,
    newTaskTransition
  } = useTaskManagementState()
  //convert assets array to current page assets
  const pageAssets = tasks != null ? tasks.slice((activePage - 1) * 10, activePage * 10): []
  //convert facilities array to current page facilities
  const pageFacilities = facilities.slice(
    (activePage - 1) * 10,
    activePage * 10
  )
  // console.log(chartOptions,allCountForCategoryOne,allCountForCategoryTwo);
  let categoryOnePercentage = completedCountForCategoryOne && allCountForCategoryOne && ((completedCountForCategoryOne.length / allCountForCategoryOne.length) * 100);
  if(isNaN(categoryOnePercentage)){ categoryOnePercentage = null }
  let categoryTwoPercentage = completedCountForCategoryTwo && allCountForCategoryTwo && ((completedCountForCategoryTwo.length / allCountForCategoryTwo.length) * 100);
  if(isNaN(categoryTwoPercentage)){ categoryTwoPercentage = null }
  let categoryThreePercentage = completedCountForCategoryThree && allCountForCategoryThree && ((completedCountForCategoryThree.length / allCountForCategoryThree.length) * 100);
  if(isNaN(categoryThreePercentage)){ categoryThreePercentage = null }
    return (
    <div id="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="task_info_box">
              <div className="task_update_info">
                <h5 className="date">{currentDate}</h5>
                <h3 className="title">タスク管理</h3>
              </div>
              <div className="d-flex">
                <button className="btn btn-outline-primary btn_signup btn_download_icon">インポート</button>
                <button className="btn btn-outline-primary btn_signup btn_upload_icon ml-5">エクスポート</button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="chart_wrapper">
              <div className="chart_list">
                <div className="chart_box">
                  <div className="chart_set test">{
                    chartOptions && categoryOnePercentage && (
                      <ReactApexChart options={chartOptions} series={[categoryOnePercentage]} type="radialBar" height={228} />
                    )
                  }
                  </div>
                  {
                    completedCountForCategoryOne && allCountForCategoryOne && (
                      <div className="chart_details">
                        <div className="chart_info">
                          <h3>{completedCountForCategoryOne.length}</h3>
                          <p>実績</p>
                        </div>
                        <div className="chart_info">
                          <h3>{allCountForCategoryOne.length}</h3>
                          <p>計画</p>
                        </div>
                      </div>
                    )}
                </div>
                <h4 className="chart_title">収集</h4>
              </div>
              <div className="chart_list">
                <div className="chart_box">
                  <div className="chart_set">
                    {
                      chartOptions && categoryTwoPercentage && (
                        <ReactApexChart options={chartOptions} series={[categoryTwoPercentage]} type="radialBar" height={228} />
                      )
                    }
                  </div>
                  {
                    completedCountForCategoryTwo && allCountForCategoryTwo && (
                      <div className="chart_details">
                        <div className="chart_info">
                          <h3>{completedCountForCategoryTwo.length}</h3>
                          <p>実績</p>
                        </div>
                        <div className="chart_info">
                          <h3>{allCountForCategoryTwo.length}</h3>
                          <p>計画</p>
                        </div>
                      </div>
                    )
                  }
                </div>
                <h4 className="chart_title">分析</h4>
              </div>
              <div className="chart_list">
                <div className="chart_box">
                  <div className="chart_set">
                    {
                      chartOptions && categoryThreePercentage && (
                        <ReactApexChart options={chartOptions} series={[categoryThreePercentage]} type="radialBar" height={228} />
                      )
                    }
                  </div>
                  {
                    completedCountForCategoryThree && allCountForCategoryThree && (
                      <div className="chart_details">
                        <div className="chart_info">
                          <h3>{completedCountForCategoryThree.length}</h3>
                          <p>実績</p>
                        </div>
                        <div className="chart_info">
                          <h3>{allCountForCategoryThree.length}</h3>
                          <p>計画</p>
                        </div>
                      </div>
                    )
                  }
                </div>
                <h4 className="chart_title">活用</h4>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="data_table_box">
              <div className="filter_box">
                <h5 className="filter_title">検索条件</h5>
                <div className="filter_half">
                  <div className="filter_form_group form-group form_group_input">
                    <label className="col-form-label">タスク名</label>
                    <div className="form_group_field">
                      <input type="text" className="form_control_input" id="task-name" placeholder="入力" />
                    </div>
                  </div>
                  <div className="filter_status form_group_input">
                    <label className="col-form-label" >ステータス</label>
                    <div className="custom_checkbox custom_checkbox_lable_change">
                      <input type="checkbox" id="not-started" name="checkbox" value="not-started" />
                      <label>未着手</label>
                    </div>
                    <div className="custom_checkbox custom_checkbox_lable_change">
                      <input type="checkbox" id="standby" name="checkbox" value="standby" />
                      <label >待機中</label>
                    </div>
                    <div className="custom_checkbox custom_checkbox_lable_change">
                      <input type="checkbox" id="in-practice" name="checkbox" value="in-practice" />
                      <label >実施中</label>
                    </div>
                    <div className="custom_checkbox custom_checkbox_lable_change">
                      <input type="checkbox" id="over" name="checkbox" value="over" />
                      <label >完了</label>
                    </div>
                  </div>
                </div>
                <div className="filter_half">
                  <div className="scheduled_implementation_box">
                    <div className="scheduled_implementation_label">
                      <div className="filter_form_group form-group form_group_input">
                        <label className="col-form-label" >実施予定</label>
                      </div>
                    </div>
                    <div className="scheduled_implementation_field">
                      <div className="scheduled_implementation_input">
                        <div className="scheduled_implementation_form_group">
                          <div className="form_group_field date_input">
                            <input type="date" className="form_control_input" id="" />
                            <label className="calender_icon">
                              <img src="images/calender.svg" alt="" />
                            </label>
                            <span className="info_block">以降</span>
                          </div>
                          <div className="form_group_field time_input">
                            <input type="time" className="form_control_input" id="" />
                          </div>
                        </div>
                        <div className="scheduled_implementation_form_group">
                          <div className="form_group_field date_input">
                            <input type="date" className="form_control_input" id="" />
                            <label className="calender_icon">
                              <img src="images/calender.svg" alt="" />
                            </label>
                            <span className="info_block mr-0">以降</span>
                          </div>
                          <div className="form_group_field time_input">
                            <input type="time" className="form_control_input" id="" />
                          </div>
                        </div>
                      </div>
                      <div className="custom_checkbox custom_checkbox_lable_change w-100">
                        <input type="checkbox" id="including-blank" name="checkbox" value="including-blank" />
                        <label >ブランクを含む</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear_button_set">
                <button className="btn btn-outline-default btn_signup">条件クリア</button>
                <button className="btn btn-outline-primary btn_signup ml-4">検索</button>
              </div>




              <div className="table-responsive">
                <table className="table table-bordered task-list-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="custom_checkbox custom_checkbox_no_label">
                          <input type="checkbox" id="main-checkbox" name="checkbox" value="main-checkbox" />
                          <label></label>
                        </div>
                      </th>
                      <th>タスクID<span className="order ascending"></span></th>
                      <th>優先度<span className="order ascending"></span></th>
                      <th>タスク名<span className="order ascending"></span></th>
                      <th>タスクタイプ<span className="order ascending"></span></th>
                      <th>タスクカテゴリ<span className="order ascending"></span></th>
                      <th>担当者<span className="order ascending"></span></th>
                      <th>ステータス<span className="order ascending"></span></th>
                      <th>実施予定<span className="order ascending"></span></th>
                      <th>期限<span className="order ascending"></span></th>
                      <th>引継ぎ先<span className="order ascending"></span></th>
                      <th>ChainMemo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // console.log("vvvv",tasks)
                      pageAssets && pageAssets.map((task: any, key: number) => {
                        let assignees = taskAssignees[task['task-id']] != undefined ? taskAssignees[task['task-id']]:[];
                        task.assignees = assignees;
                        task.statusName = taskStatus[task['status']];
                        return <TaskList key={key}  task={task} newTaskTransition={newTaskTransition}/>
                      })
                    }
                    {/* <tr>
                      <td>
                        <div className="custom_checkbox custom_checkbox_no_label">
                          <input type="checkbox" id="checkbox_1" name="checkbox" value="checkbox_1" />
                          <label ></label>
                        </div>
                      </td>
                      <td className="window_icon">0000000002</td>
                      <td>緊急</td>
                      <td >手順書作成 (アイソレ)</td>
                      <td >作業環境設定・復旧</td>
                      <td>活用</td>
                      <td>田中 太郎</td>
                      <td>完了</td>
                      <td>3/17 15:00</td>
                      <td>3/20 15:00</td>
                      <td>Team C</td>
                      <td>
                        <a href="javascript:void(0);" className="btn_table_action">参照 / 編集</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom_checkbox custom_checkbox_no_label">
                          <input type="checkbox" id="checkbox_2" name="checkbox" value="checkbox_2" />
                          <label ></label>
                        </div>
                      </td>
                      <td className="window_icon">0000000002</td>
                      <td>緊急</td>
                      <td >手順書作成 (アイソレ)</td>
                      <td >作業環境設定・復旧</td>
                      <td>活用</td>
                      <td>田中 太郎</td>
                      <td>完了</td>
                      <td>3/17 15:00</td>
                      <td>3/20 15:00</td>
                      <td>Team C</td>
                      <td>
                        <a href="javascript:void(0);" className="btn_table_action btn_table_add_icon">追加</a>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>

              {tasks != null && tasks.length > 0 && (
              <div className="custom_pagination mt-3">
                 <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={tasks.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
              </div>
              }
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-outline-primary btn_signup">+ イベント対応</button>
                <button onClick={newTaskTransition} className="btn btn-outline-primary btn_signup ml-5">+ 新規タスク</button>
                <button className="btn btn-outline-primary btn_signup ml-5">引継ぎ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TaskManagement }
