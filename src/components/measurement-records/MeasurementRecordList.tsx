import React from 'react'
import { MeasurementRecord } from '../../data/types/MeasurementRecord';
import { useMeasurementRecordListState } from '../../hooks/measurement-records/useMeasurementRecordListState';

const MeasurementRecordItem: React.FC<{
  measurementRecord: MeasurementRecord
}> = ({ measurementRecord }) => {
  return (
    <div className="search_result_list">
      <h2>{measurementRecord['asset-name']}</h2>
      <p>{measurementRecord['measurement-date']}</p>
    </div>
  )
}

const MeasurementRecordList: React.FC = (props) => {
  const {
    errorMessage
  } = useMeasurementRecordListState(props);
  return (
    <div className="container custom_container">
    <div className="row">
        <div className="col-12">
          <ul className="custom_breadcrumb">
            <li><a href="javascript:void(0);">設備検索</a></li>
            <li><a href="javascript:void(0);">Mill(A) Roller  </a></li>
          </ul>
          <h1 className="breadcrumb_after_title">Mill(A) Roller</h1>
        </div>
        <div className="col-12">
          <div className="data_show_box inspection_content_box">
            <h2 className="result_title">Component & Defect Mode</h2>
            <div className="search_result_list_box">

              <div className="search_result_list">
                <h2>Roller assembly-Corruption of Roller Bearing</h2>
                <p>2020.03.12</p>
              </div>
              <div className="search_result_list">
                <h2>Roller assembly-Wear of Roller Hub</h2>
                <p>2020.03.09</p>
              </div>
              <div className="search_result_list">
                <h2>Roller assembly-Wear of Roller Plate</h2>
                <p>-</p>
              </div>
              <div className="search_result_list">
                <h2>Roller Tire-Wear of Roller Tire</h2>
                <p>2019.03.12</p>
              </div>
              <div className="search_result_list">
                <h2>Segment-Wear of Segments</h2>
                <p>2018.01.16</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export { MeasurementRecordList }
