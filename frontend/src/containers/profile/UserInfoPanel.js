import React from "react";
import { Link } from "react-router-dom";

const UserInfoPanel = (props) => {
  const { data } = props;
  return (
    <>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between flex-wrap mt-1">
          <div className="d-flex mr-3">
            <Link to="" className="text-dark-75 text-hover-primary font-size-h5 font-weight-bold mr-3">{data.first_name}</Link>
            <Link to="">
              <i className="flaticon2-correct text-success font-size-h5"></i>
            </Link>
          </div>
          <div className="my-lg-0 my-3">
            <Link to="" className="btn btn-sm btn-light-success font-weight-bolder text-uppercase mr-3">About</Link>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between mt-1">
          <div className="d-flex flex-column flex-grow-1 pr-8">
            <div className="d-flex flex-wrap mb-4">
              <Link to="" className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                <i className="flaticon2-new-email mr-2 font-size-lg">{data.email}</i></Link>
              <Link to="" className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                <i className="flaticon2-calendar-3 mr-2 font-size-lg"></i>PR Manager</Link>
              <Link to="" className="text-dark-50 text-hover-primary font-weight-bold">
                <i className="flaticon2-placeholder mr-2 font-size-lg"></i>Melbourne</Link>
            </div>
            <span className="font-weight-bold text-dark-50">I distinguish three main text objectives could be merely to inform people.</span>
            <span className="font-weight-bold text-dark-50">A second could be persuade people.You want people to bay objective</span>
          </div>
          <div className="d-flex align-items-center w-25 flex-fill float-right mt-lg-12 mt-8">
            <span className="font-weight-bold text-dark-75">Progress</span>
            <div className="progress progress-xs mx-3 w-100">
              <div className="progress-bar bg-success" role="progressbar" style={{ width: "63%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span className="font-weight-bolder text-dark">78%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoPanel;
