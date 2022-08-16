import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import TimeField from 'react-simple-timefield'
import moment, { invalid } from 'moment'
import { Trans } from 'react-i18next'
import { getTaskName } from '../../utils/constant'
import CalenderIcon from '../../assets/images/calender.svg'
import './popup.scss'
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage } from '../common/ErrorMessage'
import SearchPopUp from './SearchEquipment'


const getLocalId = (type) => {
  const localData = JSON.parse(localStorage.getItem('userSetting'))
  if (localData) {
    return (localData || {})[type]
  } else {
    1
  }
}

const TaskDetail: React.FC = (props) => {
  const [searchModal, setSearchModal] = useState(false)
  const [errorMessage, setMessage] = useState("")
  const [status, setStatus] = useState(1)
  const [inCharge, setInCharge] = useState([{1 : 1}])
  const [taskTypeList, setTaskTypeList] = useState([])
  const [priorityList, setPriorityList] = useState([])
  const [assetList, setAssetList] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [responseObject, setResponseObject] = useState({
    assetId : "",
    taskId : "",
    selectedTaskName: '',
    taskTypeId: '',
    categoryName: '',
    taskCategoryId: '',
    taskName: '',
    taskPriority: '',
    taskPriorityId: '',
    takeoverTeam: '',
    takeoverTeamId: '',
    remarks: '',
    assetTaskGroupId: '',
    startDateTime: '',
    endDateTime: '',
    workingHours: '',
    notificationFlag : '',
    assignedFlag: ''
  })
  const [empty, setEmpty] = useState(false)

  useEffect( () => {
    const pathArray = window.location.pathname.split('/')
    if ((pathArray || []).length > 2) {
      editTaskDetail()
    }
    fetchData()
    fetchAssetData()
  }, [assetList])

  const editTaskDetail = async () => {
    const pathArray = window.location.pathname.split('/')
    const [response, response1, resoponse2] = await Promise.all([
      axios.get(`https://demo2722559.mockable.io/tasks/masters`),
      axios.get(`https://demo5917814.mockable.io/task/${pathArray[2]}`),
      axios.get(`https://demo2722559.mockable.io/asset/asset-task-groups%3Fpower-plant-id=1`)
    ])
    console.log('response', response)
    console.log('response1', response1)
    console.log('resoponse2', resoponse2)
    const matchedOverTeam = resoponse2.data.filter(item => item['asset-task-group-id'] === response1.data['asset-task-group-id'])
    const matchedTeamId = matchedOverTeam[0].teams.filter(item => item['team-id'] === response1.data['takeover-team-id'])
    const matcedPriority = response.data['task-priority'].filter(item => item['task-priority-id'] === response1.data['task-priority-id'])
    const matchedObject = response.data['task-type'].filter(item => item['task-type-id'] === response1.data['task-type-id'])

    const startDateAndTime = response1.data['planned-date-time'].split('T')
    const startTime = startDateAndTime[1].slice(0, 5)
    const startDate = startDateAndTime[0]
    const localStartDate = startDate + 'T' + startTime + ':00.000Z'
    const finalStartDate = moment(localStartDate).local().toDate()

    const endDateAndTime = response1.data['due-date-time'].split('T')
    const endTime = endDateAndTime[1].slice(0, 5)
    const endDate = endDateAndTime[0]
    const localEndDate = endDate + 'T' + endTime + ':00.000Z'
    const finalEndDate = moment(localEndDate).local().toDate()

    setStatus(response1.data.status),
      setStartDate(finalStartDate),
      setEndDate(finalEndDate),
    setResponseObject({
      ...responseObject,
      selectedTaskName: {
        'task-type-name': matchedObject[0]['task-type-name'],
        'task-type-id': matchedObject[0]['task-type-id'],
        label: matchedObject[0]['task-type-name'],
        value: matchedObject[0]['task-type-name']
      },
      assetId : response1.data['asset-id'],
      taskId: response1.data['task-id'],
      taskTypeId: response1.data['task-type-id'],
      categoryName: response1.data['task-category-name'],
      taskCategoryId: response1.data['task-category-id'],
      taskName: response1.data['task-name'],
      taskPriority: {
        'task-priority-id': matcedPriority[0]['task-priority-id'],
        'task-priority-name': matcedPriority[0]['task-priority-name'],
        'rank': matcedPriority[0]['rank'],
        'value': matcedPriority[0]['task-priority-name'],
        'label': matcedPriority[0]['task-priority-name']
      },
      taskPriorityId: response1.data['task-priority-id'],
      takeoverTeam: {
        'team-id': matchedTeamId[0]['team-id'],
        'team-name': matchedTeamId[0]['team-name'],
        label: matchedTeamId[0]['team-name'],
        value: matchedTeamId[0]['team-name']
      },
      takeoverTeamId: response1.data['takeover-team-id'],
      remarks: response1.data.remarks,
      assetTaskGroupId: response1.data['asset-task-group-id'],
      startDateTime: startTime ,
      endDateTime: endTime,
      assignedFlag: response1.data["assigned-flag"],
      notificationFlag: response1.data["notification-flag"]
      // 'working-hours': '',
    })
  }

  const fetchAssetData = async () => {
    const response = await axios.get(
      `https://demo2722559.mockable.io/asset/asset-task-groups%3Fpower-plant-id=1`
    )
    const a = response.data.find((item) => item['asset-task-group-id'] === 1)
    if (response.status === 200) {
      setAssetList(a.teams)
    } else {
      setAssetList([])
    }
  }

  const fetchData = async () => {
    const response = await axios.get(`https://demo2722559.mockable.io/tasks/masters`)

    if (response.status === 200) {
      setTaskTypeList(response.data['task-type'] || [])
      setPriorityList(response.data['task-priority'] || [])
    } else {
      setTaskTypeList([])
      setPriorityList([])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'selectedTaskName') {
      const matchedObject = (taskTypeList || []).find(
        (x) => x['task-type-name'] === value.value
      )

      if (matchedObject && Object.keys(matchedObject || {}).length) {
        setResponseObject({
          ...responseObject,
          [name]: value,
          taskTypeId: matchedObject['task-type-id'] || '',
          taskCategoryId: matchedObject['task-category-id'] || '',
          categoryName: matchedObject['task-category-name' || ''],
        })
      }
    } else if (name === 'taskPriority') {
      const matchedObject = (priorityList || []).find(
        (x) => x['task-priority-name'] === value.value
      )

      if (matchedObject && Object.keys(matchedObject || {}).length) {
        setResponseObject({
          ...responseObject,
          taskPriority: value,
          taskPriorityId: matchedObject['task-priority-id'] || '',
        })
      }
    } else if (name === 'takeoverTeam') {
      const matchedObject = (assetList || []).find(
        (x) => x['team-name'] === value.value
      )

      if (matchedObject && Object.keys(matchedObject || {}).length) {
        setResponseObject({
          ...responseObject,
          [name]: value,
          takeoverTeam: value,
          takeoverTeamId: matchedObject['team-id'] || '',
        })
      }
    } else {
      setResponseObject({ ...responseObject, [name]: value })
    }
  }

  const startDateTime = () => {
    if(startDate !== null){
      const date = moment(startDate).format("YYYY-MM-DDTHH:MM:SS.SSSZ").split("T")
      const mergeTime = date[0]
      const time = (responseObject.startDateTime).slice(0,5)
      const mergeDateTime = mergeTime + "T" + time + ":00.330Z"
      if(mergeDateTime){
        return mergeDateTime
      }
    }
  }

  const endDateTime = () => {
    if(endDate !== null){
      const date = moment(endDate).format("YYYY-MM-DDTHH:MM:SS.SSSZ").split("T")
      const mergeTime = date[0]
      const time = (responseObject.endDateTime).slice(0,5)
      const mergeDateTime = mergeTime + "T" + time + ":00.330Z"
      if(mergeDateTime){
        return mergeDateTime
      }
    }
  }

  const onCreateTask = async () => {
    if (
      !(responseObject.selectedTaskName && responseObject.taskName) ||
      (!(responseObject.startDateTime && startDate) && empty && startDate) ||
      (!(responseObject.endDateTime && endDate) && empty && endDate)
    ) {
      if(!(responseObject.selectedTaskName && responseObject.taskName)){
        setMessage("タスクタイプ、およびタスク名を入力してください")
      }
      setEmpty(true)
      return
    }
    setEmpty(true)
    setMessage("")

    const body = {
      'task-type-id': responseObject.taskTypeId || '',
      'task-category-id': responseObject.taskCategoryId || '',
      'task-name': responseObject.taskName || '',
      'task-priority-id': responseObject.taskPriorityId || '',
      'asset-task-group-id': getLocalId('asset-task-group-id'),
      'power-plant-id': parseInt(getLocalId('power-plant-id')),
      'asset-id': responseObject.assetId || '',
      'planned-date-time': startDateTime() || '',
      'due-date-time': endDateTime() || '',
      'working-hours': '',
      'takeover-team-id': responseObject.takeoverTeamId || '',
      'notification-flag': responseObject.notificationFlag || '',
      'assigned-flag': responseObject.assignedFlag || '',
      'remarks': responseObject.remarks || ''
    }

    Object.keys(body).map((key, index) => {
      if (!body[key]) {
        delete body[key]
      }
    })

    console.log(body)
    // const response = await axios.post(`http://demo5917814.mockable.io/tasks`,body);
    // if(response.status === 201) {
    //   window.location.href = "/"
    // }

    console.log("length",inCharge.length)
    if (inCharge.length > 0) {

      const body = [
          {
            "task-id": "string",
            "notification-flag": true,
            "assignees": [
              {
                "user-id": "string"
              }
            ]
          }
        ]

      console.log('call')
      const response = await axios.post(`http://demo5917814.mockable.io/tasks/assignees`,body);
      if(response.status === 200) {
        console.log("hello")
      }
    }
  }

  const onModalChange = () => setSearchModal(!searchModal)

  const onReturn = () => {
    window.location.href = '/'
  }

  return (
    <div id="wrapper">
      { searchModal ? <SearchPopUp /> : null }
      <div className="container custom_container">
        <div className="row">
          <div className="col-12">
            <div className="task_info_box task_info_list_box">
              <div className="task_update_info">
                <button
                  onClick={onReturn}
                  className="btn btn-outline-primary btn_back"
                >
                  戻る
                </button>
                <h3 className="title">タスク管理</h3>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="task_management_list_container">
              <div className="task_list_required">
                <label className="col-form-label text-right fs_14 required">
                  * 必須入力
                </label>
              </div>
              {errorMessage && (
                <ErrorMessage
                  classStr="custom_alert custom_alert_position_set errorMessage"
                  message={errorMessage}
                />
              )}
              <div className="task_list">
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">タスクID</label>
                  <div className="form_group_field">
                    <input
                      disabled={status === 1}
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext fs_18"
                      value={responseObject.taskId || ''}
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">起票日時</label>
                  <div className="form_group_field">
                    <input
                      disabled={status === 1}
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext fs_18"
                      // value="2021-03-15 12:00"
                    />
                  </div>
                </div>
                <div
                  className={`task_list_form_group form-group form_group_select ${
                    empty && !responseObject.selectedTaskName && 'has_error'
                  }`}
                >
                  <label htmlFor="task-type" className="col-form-label">
                    タスクタイプ <span className="required">*</span>
                  </label>

                  <div className="form_select_input">
                    <Select
                      isDisabled={![1,2,3,4].includes(status)}
                      value={responseObject.selectedTaskName || ''}
                      name="selectedTaskName"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={(taskTypeList || []).map((x) => ({
                        ...x,
                        label: x['task-type-name'],
                        value: x[['task-type-name']],
                      }))}
                      onChange={(value) =>
                        handleChange({
                          target: { name: 'selectedTaskName', value: value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">タスクカテゴリ</label>
                  <div className="form_group_field">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext"
                      value={responseObject.categoryName || ''}
                    />
                  </div>
                </div>
                <div
                  className={`task_list_form_group form-group form_group_input ${
                    empty && !responseObject.taskName && 'has_error'
                  }`}
                >
                  <label className="col-form-label" htmlFor="task-name">
                    タスク名 <span className="required">*</span>
                  </label>
                  <div className="form_group_field">
                    <input
                      disabled={![1,2,3,4].includes(status)}
                      type="text"
                      className="form_control_input"
                      id="task-name"
                      placeholder="入力"
                      name={'taskName'}
                      value={responseObject.taskName || ''}
                      onChange={handleChange}
                      maxLength={100}
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label" htmlFor="facility">
                    設備
                  </label>
                  <div
                    onChange={handleChange}
                    className="form_group_field"
                  >
                    <input
                      name="equipment"
                      disabled={![1,2,3,4,5,6].includes(status)}
                      type="text"
                      className="form_control_input"
                      id="facility"
                      placeholder="選択..."
                    />
                    <button
                      disabled={![1,2,3,4,5,6].includes(status)}
                      onClick={onModalChange}
                      className="btn_search"
                      data-toggle="modal"
                      data-target="#equipmentSearch"
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">KKSコード</label>
                  <div className="form_group_field">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext"
                      value="{自動入力}"
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label
                    className="col-form-label"
                    htmlFor="scheduled-implementation-date"
                  >
                    実施予定日
                  </label>

                  <div
                    className={`form_group_field date_input ${
                      responseObject.startDateTime && startDate
                        ? ''
                        : empty && responseObject.startDateTime && 'has_error'
                    }`}
                  >
                    <DatePicker
                      disabled={![1,2,3,4].includes(status)}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="form_control_input"
                      placeholderText="YYYY-MM-DD"
                      dateFormat="yyyy/MM/dd"
                    />
                    <label
                      htmlFor="scheduled-implementation-date"
                      className="calender_icon"
                    >
                      <img src={CalenderIcon} alt="" />
                    </label>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label
                    className="col-form-label"
                    htmlFor="scheduled-implementation-time"
                  >
                    実施予定時刻
                  </label>
                  <div
                    onChange={handleChange}
                    className={`form_group_field ${
                      responseObject.startDateTime && startDate
                        ? ''
                        : empty && startDate && 'has_error'
                    } `}
                  >
                    <TimeField
                      value={responseObject.startDateTime || ''}
                      disabled={![1,2,3,4].includes(status)}
                      name="startDateTime"
                      type="text"
                      className="form_control_input"
                      id="scheduled-implementation-time"
                      placeholder="入力"
                      style={{width : "100%"}}
                    />
                    <p className="help_block">
                      Eg. <strong>00:00</strong> (24 hour format)
                    </p>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label" htmlFor="deadline">
                    期限日
                  </label>
                  <div
                    className={`form_group_field date_input ${
                      responseObject.endDateTime && endDate
                        ? ''
                        : empty && responseObject.endDateTime && 'has_error'
                    }`}
                  >
                    <DatePicker
                      disabled={![1,2,3,4].includes(status)}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="form_control_input"
                      placeholderText="YYYY-MM-DD"
                      dateFormat="yyyy/MM/dd"
                    />
                    <label htmlFor="deadline" className="calender_icon">
                      <img src={CalenderIcon} alt="" />
                    </label>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label" htmlFor="deadline-time">
                    実施予定時刻
                  </label>
                  <div
                    onChange={handleChange}
                    className={`form_group_field ${
                      responseObject.endDateTime && endDate
                        ? ''
                        : empty && endDate && 'has_error'
                    }`}
                  >
                    <TimeField
                      value={responseObject.endDateTime || ''}
                      disabled={![1,2,3,4].includes(status)}
                      name="endDateTime"
                      type="text"
                      className="form_control_input"
                      id="deadline-time"
                      placeholder="入力"
                      style={{width : "100%"}}
                    />
                    <p className="help_block">
                      Eg. <strong>00:00</strong> (24 hour format)
                    </p>
                  </div>
                </div>
              </div>
              <div className="task_list">
                <div className="task_list_form_group form-group form_group_select">
                  <label htmlFor="priority" className="col-form-label">
                    優先度
                  </label>
                  <div className="form_select_input">
                    <Select
                      isDisabled={![1,2,3,4].includes(status)}
                      value={responseObject.taskPriority || ''}
                      name="taskPriority"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={(priorityList || []).map((x) => ({
                        ...x,
                        label: x['task-priority-name'],
                        value: x[['task-priority-name']],
                      }))}
                      onChange={(value) =>
                        handleChange({
                          target: { name: 'taskPriority', value: value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">担当者</label>
                  <div className="form_group_field">
                    <button
                      disabled={![1,2,3].includes(status)}
                      className="btn btn-outline-primary btn-sm btn_add_icon"
                      data-toggle="modal"
                      data-target="#personChargeSelection"
                    >
                      追加
                    </button>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">開始日時</label>
                  <div onChange={handleChange} className="form_group_field">
                    <input
                      disabled={status === 1}
                      name="start-date-time"
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext"
                      value="{自動入力}"
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">完了日時</label>
                  <div onChange={handleChange} className="form_group_field">
                    <input
                      disabled={status === 1}
                      name="end-date-time"
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext"
                      value="{自動入力}"
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label" htmlFor="deadline-time">
                    実施予定時刻
                  </label>
                  <div onChange={handleChange} className="form_group_field">
                    <TimeField
                      value={responseObject.workingHours}
                      disabled={![5,6].includes(status)}
                      name="workingHours"
                      type="text"
                      className="form_control_input"
                      id="deadline-time"
                      placeholder="{自動入力}"
                      style={{width : "100%"}}
                    />
                    <p className="help_block">
                      Eg. <strong>00:00</strong> (24 hour format)
                    </p>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">ステータス</label>
                  <div className="form_group_field">
                    <input
                      disabled={status === 1}
                      type="text"
                      readOnly
                      className="form-control-plaintext input_plaintext"
                      value={getTaskName(status)}
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_select">
                  <label
                    htmlFor="takeover-destination"
                    className="col-form-label"
                  >
                    引継ぎ先
                  </label>
                  <div className="form_select_input">
                    <Select
                      isDisabled={![1,2,3,4].includes(status)}
                      value={responseObject.takeoverTeam || ''}
                      name="takeoverTeam"
                      placeholder={<Trans>REGISTER.PLACE_HOLDER</Trans>}
                      isSearchable={false}
                      isClearable={false}
                      options={(assetList || []).map((x) => ({
                        ...x,
                        label: x['team-name'],
                        value: x[['team-name']],
                      }))}
                      onChange={(value) =>
                        handleChange({
                          target: { name: 'takeoverTeam', value: value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">Chain Memo</label>
                  <div className="form_group_field">
                    <button
                      disabled={![2,3,4,5,6,7].includes(status)}
                      className="btn btn-outline-primary btn-sm btn_add_icon"
                    >
                      追加
                    </button>
                  </div>
                </div>
                <div className="task_list_form_group form-group form_group_input">
                  <label className="col-form-label">備考</label>
                  <div onChange={handleChange} className="form_group_field">
                    <textarea
                      value={responseObject.remarks || ""}
                      disabled={![1,2,3,4,5,6].includes(status)}
                      name="remarks"
                      id="remarks"
                      cols={30}
                      rows={4}
                      placeholder="入力"
                      className="form_control_input"
                      maxLength={200}
                    />
                  </div>
                </div>
              </div>
              <div className="task_list_button_action">
                <button
                  style={{display : (![2,3,4,7,6,5].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-default btn_task_action">
                  コピー
                </button>
                <button
                  style={{display : (![4].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-default btn_task_action">
                  強制中断
                </button>
                <button
                  style={{display : (![5].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-danger btn_task_action">
                  完了取消
                </button>
                <button
                  style={{display : (![2,3].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-danger btn_task_action" >
                  完了
                </button>
                <button
                  style={{display : (![2,3].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-danger btn_task_action">
                  削除
                </button>
                <button
                  style={{display : (![1,2,3,4,6,5].includes(status)) ? 'none' : ""}}
                  className="btn btn-outline-primary btn_task_action btn_done_icon"
                  onClick={onCreateTask}
                >
                  更新
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TaskDetail }
