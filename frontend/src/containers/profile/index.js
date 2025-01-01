import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllFeeds, fetchAsyncFeeds } from '../../services/feeds/feedSlice';
import { getUser, fetchAsyncUser } from '../../services/users/userSlice';
import FeedTable from './FeedTable';
import UserInfoPanel from './UserInfoPanel';
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(getAllFeeds);
  const userInfo = useSelector(getUser);

  useEffect(() => {
    dispatch(fetchAsyncFeeds());
    dispatch(fetchAsyncUser());
  }, [dispatch]);

  let renderFeeds, renderUser = "";
  renderUser =
    userInfo && userInfo.user ? (
      <UserInfoPanel data={userInfo.user} />
    ) : (
      <div className="feeds-error">
      </div>
    );

  renderFeeds =
    feeds.Response === "True" ? (
      feeds.Search.map((feed, index) => (
        <FeedTable key={index} data={feed} />
      ))
    ) : (
      <div className="feeds-error">
        <h3>{feeds.Error}</h3>
      </div>
    );

  return (
    <>
      <div className="content d-flex flex-column flex-column-fluid bg-light">
        <div className="d-flex flex-column-fluid">
          <div className="container">
            <div className="card card-custom gutter-b">
              <div className="card-body">
                <div className="d-flex mb-9">
                  <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
                    <div className="symbol symbol-50 symbol-lg-120">
                      <img src="assets/media/users/300_1.jpg" alt="" />
                    </div>
                    <div className="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
                      <span className="font-size-h3 symbol-label font-weight-boldest">JM</span>
                    </div>
                  </div>
                  {renderUser}
                </div>
                <div className="separator separator-solid"></div>
                <div className="d-flex justify-content-start flex-wrap mt-8">
                  <div className="d-flex align-items-center bd-highlight mr-10 mb-2">
                    <span className="mr-2">
                      <i className="flaticon-pie-chart display-4 text-muted font-weight-bold"></i>
                    </span>
                    <div className="d-flex flex-column text-dark-75">
                      <span className="font-weight-bolder font-size-sm">Net</span>
                      <span className="font-weight-bolder font-size-h5">
                        <span className="text-dark-50 font-weight-bold">$</span>782,300</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center bd-highlight mr-10 mb-2">
                    <span className="mr-2">
                      <i className="flaticon-file-2 display-4 text-muted font-weight-bold"></i>
                    </span>
                    <div className="d-flex flex-column flex-lg-fill">
                      <span className="text-dark-75 font-weight-bolder font-size-sm">73 Tasks</span>
                      <Link to="" className="text-primary font-weight-bolder">View</Link>
                    </div>
                  </div>
                  <div className="d-flex align-items-center bd-highlight mr-10 mb-2">
                    <span className="mr-2">
                      <i className="flaticon-chat-1 display-4 text-muted font-weight-bold"></i>
                    </span>
                    <div className="d-flex flex-column">
                      <span className="text-dark-75 font-weight-bolder font-size-sm">648 Comments</span>
                      <Link to="" className="text-primary font-weight-bolder">View</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="card card-custom card-stretch gutter-b">
                  <div className="card-header border-0 pt-5">
                    <h3 className="card-title align-items-start flex-column">
                      <span className="card-label font-weight-bolder text-dark">New Arrivals</span>
                      <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span>
                    </h3>
                    <div className="card-toolbar">
                      <ul className="nav nav-pills nav-pills-sm nav-dark-75">
                        <li className="nav-item">
                          <Link to="" className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_1">Month</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="" className="nav-link py-2 px-4" data-toggle="tab" href="#kt_tab_pane_11_2">Week</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="" className="nav-link py-2 px-4 active" data-toggle="tab" href="#kt_tab_pane_11_3">Day</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card-body pt-2 pb-0 mt-n3">
                    {renderFeeds}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card card-custom card-stretch gutter-b">
                  <div className="card-header border-0 pt-5">
                    <h3 className="card-title font-weight-bolder">Action Needed</h3>
                    <div className="card-toolbar">
                      <div className="dropdown dropdown-inline">
                        <Link to="" className="btn btn-clean btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="ki ki-bold-more-hor"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
                          <ul className="navi navi-hover py-5">
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-drop"></i>
                                </span>
                                <span className="navi-text">New Group</span>
                              </Link>
                            </li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-list-3"></i>
                                </span>
                                <span className="navi-text">Contacts</span>
                              </Link>
                            </li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-rocket-1"></i>
                                </span>
                                <span className="navi-text">Groups</span>
                                <span className="navi-link-badge">
                                  <span className="label label-light-primary label-inline font-weight-bold">new</span>
                                </span>
                              </Link>
                            </li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-bell-2"></i>
                                </span>
                                <span className="navi-text">Calls</span>
                              </Link>
                            </li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-gear"></i>
                                </span>
                                <span className="navi-text">Settings</span>
                              </Link>
                            </li>
                            <li className="navi-separator my-3"></li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-magnifier-tool"></i>
                                </span>
                                <span className="navi-text">Help</span>
                              </Link>
                            </li>
                            <li className="navi-item">
                              <Link to="" className="navi-link">
                                <span className="navi-icon">
                                  <i className="flaticon2-bell-2"></i>
                                </span>
                                <span className="navi-text">Privacy</span>
                                <span className="navi-link-badge">
                                  <span className="label label-light-danger label-rounded font-weight-bold">5</span>
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="flex-grow-1" style={{ position: "relative" }}>
                      <div id="kt_mixed_widget_14_chart" style={{ height: "200px", minHeight: "178.7px" }}>

                      </div>
                      <div className="resize-triggers"><div className="expand-trigger"><div style={{ width: "289px", height: "241px" }}></div></div><div className="contract-trigger"></div></div></div>
                    <div className="pt-5">
                      <p className="text-center font-weight-normal font-size-lg pb-7">Notes: Current sprint requires stakeholders
                        <br />to approve newly amended policies</p>
                      <Link to="" className="btn btn-success btn-shadow-hover font-weight-bolder w-100 py-3">Generate Report</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;