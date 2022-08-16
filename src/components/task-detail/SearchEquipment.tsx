import React,{useState} from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import "./popup.scss"

const SearchEquipment = (props) => {

  const { className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div>
        {/*<Button color="danger" onClick={toggle}>{buttonLabel}</Button>*/}
        <Modal isOpen={modal} toggle={toggle}  className="modal-content">
          <ModalBody >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12" style={{ padding: 'unset' }}>
                  <div className="modal_close_box">
                    <button
                      onClick={toggle}
                      className="btn btn-outline-primary btn_signup btn_cancel_icon"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      キャンセル
                    </button>
                  </div>
                  <div className="modal_search_input form-group form_group_input"/>
                  <input
                    type="text"
                    className="form_control_input search"
                    id="task-name"
                    placeholder="入力"
                  />
                  <a href="javascreipt:void(0);" className="search_icon">
                    <img src="images/search.svg" alt=""/>
                  </a>
                </div>
              </div>
              <div className="col-12" style={{ padding: 'unset' }}>
                <div className="equipment_search_show_box ">
                  <h2 className="result_title">検索結果 (287 results)</h2>
                  <div className="search_result_list_box">
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル ローラー加圧油 アキュムレーター No.1
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM001</p>
                    </div>
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル ローラー加圧油 アキュムレーター No.2
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM002</p>
                    </div>
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル ローラー加圧油 アキュムレーター No.3
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM003</p>
                    </div>
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル パイライトホッパー
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM004</p>
                    </div>
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル ローラー加圧油 タンク
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM005</p>
                    </div>
                    <div className="search_result_list">
                      <h2>
                        <a href="javascript:void(0);">
                          A-ミル 減速機潤滑油タンク
                        </a>
                      </h2>
                      <p>HE_A500 HFC110 CM006</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="custom_pagination custom_footer_pagination">
              <ul>
                <li className="previous_pagination">
                  <a href="javascript:void(0)">
                    <img src="images/pagination_arrow.svg" alt=""/>
                  </a>
                </li>
                <li className="previous_pagination">
                  <a href="javascript:void(0)">
                    <img src="images/pagination_arrow_single.svg" alt=""/>
                  </a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">1</a>
                </li>
                <li>
                  <a href="javascript:void(0)">2</a>
                </li>
                <li>
                  <a href="javascript:void(0)">3</a>
                </li>
                <li>
                  <a href="javascript:void(0)">4</a>
                </li>
                <li>
                  <a href="javascript:void(0)">5</a>
                </li>
                <li className="next_pagination">
                  <a href="javascript:void(0)">
                    <img src="images/pagination_arrow_single.svg" alt=""/>
                  </a>
                </li>
                <li className="next_pagination">
                  <a href="javascript:void(0)">
                    <img src="images/pagination_arrow.svg" alt=""/>
                  </a>
                </li>
              </ul>
            </div>
          </ModalFooter>
        </Modal>
      </div>
      {/*<div*/}
      {/*  className={props.modal?"modal fade show":"modal fade"}*/}
      {/*  id="equipmentSearch"*/}
      {/*  tabIndex={-1}*/}
      {/*  aria-labelledby="equipmentSearchLabel"*/}
      {/*  aria-hidden="true"*/}
      {/*  style={{ display: 'block', paddingRight: '17px' }}*/}
      {/*>*/}
      {/*  <div className="modal-dialog  modal-dialog-centered custom_modal">*/}
      {/*    <div className="modal-content">*/}
      {/*      <div className="modal-body">*/}
      {/*        <div className="container-fluid">*/}
      {/*          <div className="row">*/}
      {/*            <div className="col-12" style={{padding: 'unset'}}>*/}
      {/*              <div className="modal_close_box">*/}
      {/*                <button*/}
      {/*                  className="btn btn-outline-primary btn_signup btn_cancel_icon"*/}
      {/*                  data-dismiss="modal"*/}
      {/*                  aria-label="Close"*/}
      {/*                >*/}
      {/*                  キャンセル*/}
      {/*                </button>*/}
      {/*              </div>*/}
      {/*              <div className="modal_search_input form-group form_group_input" />*/}
      {/*              <input*/}
      {/*                type="text"*/}
      {/*                className="form_control_input search"*/}
      {/*                id="task-name"*/}
      {/*                placeholder="入力"*/}
      {/*              />*/}
      {/*              <a href="javascreipt:void(0);" className="search_icon">*/}
      {/*                <img src="images/search.svg" alt="" />*/}
      {/*              </a>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*          <div className="col-12" style={{padding: 'unset'}}>*/}
      {/*            <div className="equipment_search_show_box ">*/}
      {/*              <h2 className="result_title">検索結果 (287 results)</h2>*/}
      {/*              <div className="search_result_list_box">*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル ローラー加圧油 アキュムレーター No.1*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM001</p>*/}
      {/*                </div>*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル ローラー加圧油 アキュムレーター No.2*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM002</p>*/}
      {/*                </div>*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル ローラー加圧油 アキュムレーター No.3*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM003</p>*/}
      {/*                </div>*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル パイライトホッパー*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM004</p>*/}
      {/*                </div>*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル ローラー加圧油 タンク*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM005</p>*/}
      {/*                </div>*/}
      {/*                <div className="search_result_list">*/}
      {/*                  <h2>*/}
      {/*                    <a href="javascript:void(0);">*/}
      {/*                      A-ミル 減速機潤滑油タンク*/}
      {/*                    </a>*/}
      {/*                  </h2>*/}
      {/*                  <p>HE_A500 HFC110 CM006</p>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="modal-footer">*/}
      {/*        <div className="custom_pagination custom_footer_pagination">*/}
      {/*          <ul>*/}
      {/*            <li className="previous_pagination">*/}
      {/*              <a href="javascript:void(0)">*/}
      {/*                <img src="images/pagination_arrow.svg" alt="" />*/}
      {/*              </a>*/}
      {/*            </li>*/}
      {/*            <li className="previous_pagination">*/}
      {/*              <a href="javascript:void(0)">*/}
      {/*                <img src="images/pagination_arrow_single.svg" alt="" />*/}
      {/*              </a>*/}
      {/*            </li>*/}
      {/*            <li className="active">*/}
      {/*              <a href="javascript:void(0)">1</a>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <a href="javascript:void(0)">2</a>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <a href="javascript:void(0)">3</a>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <a href="javascript:void(0)">4</a>*/}
      {/*            </li>*/}
      {/*            <li>*/}
      {/*              <a href="javascript:void(0)">5</a>*/}
      {/*            </li>*/}
      {/*            <li className="next_pagination">*/}
      {/*              <a href="javascript:void(0)">*/}
      {/*                <img src="images/pagination_arrow_single.svg" alt="" />*/}
      {/*              </a>*/}
      {/*            </li>*/}
      {/*            <li className="next_pagination">*/}
      {/*              <a href="javascript:void(0)">*/}
      {/*                <img src="images/pagination_arrow.svg" alt="" />*/}
      {/*              </a>*/}
      {/*            </li>*/}
      {/*          </ul>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*</div>*/}
    </>
  )
}

export default SearchEquipment
