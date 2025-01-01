import React from "react";
import { Link } from "react-router-dom";

const FeedTable = (props) => {
  const { data } = props;
  return (
    <>
      <div class="d-flex align-items-center mt-10">
        <span class="bullet bullet-bar bg-danger align-self-stretch"></span>

        <label class="checkbox checkbox-lg checkbox-light-danger checkbox-inline flex-shrink-0 m-0 mx-4">
          <input type="checkbox" value="1" />
          <span></span>
        </label>
        <div class="d-flex flex-column flex-grow-1">
          <Link to="" class="text-dark-75 text-hover-primary font-weight-bold font-size-lg mb-1">{data.content}</Link>
          <span class="text-muted font-weight-bold">{data.created_at}</span>
        </div>
        <div class="dropdown dropdown-inline ml-2" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
          <Link to="" class="btn btn-hover-light-primary btn-sm btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ki ki-bold-more-hor"></i>
          </Link>
          <div class="dropdown-menu p-0 m-0 dropdown-menu-md dropdown-menu-right">
            <ul class="navi navi-hover">
              <li class="navi-header font-weight-bold py-4">
                <span class="font-size-lg">Choose Label:</span>
                <i class="flaticon2-information icon-md text-muted" data-toggle="tooltip" data-placement="right" title="" data-original-title="Click to learn more..."></i>
              </li>
              <li class="navi-separator mb-3 opacity-70"></li>
              <li class="navi-item">
                <Link to="" class="navi-link">
                  <span class="navi-text">
                    <span class="label label-xl label-inline label-light-success">Customer</span>
                  </span>
                </Link>
              </li>
              <li class="navi-item">
                <Link to="" class="navi-link">
                  <span class="navi-text">
                    <span class="label label-xl label-inline label-light-danger">Partner</span>
                  </span>
                </Link>
              </li>
              <li class="navi-item">
                <Link to="" class="navi-link">
                  <span class="navi-text">
                    <span class="label label-xl label-inline label-light-warning">Suplier</span>
                  </span>
                </Link>
              </li>
              <li class="navi-item">
                <Link to="" class="navi-link">
                  <span class="navi-text">
                    <span class="label label-xl label-inline label-light-primary">Member</span>
                  </span>
                </Link>
              </li>
              <li class="navi-item">
                <Link to="" class="navi-link">
                  <span class="navi-text">
                    <span class="label label-xl label-inline label-light-dark">Staff</span>
                  </span>
                </Link>
              </li>
              <li class="navi-separator mt-3 opacity-70"></li>
              <li class="navi-footer py-4">
                <Link to="" class="btn btn-clean font-weight-bold btn-sm" href="#">
                  <i class="ki ki-plus icon-sm"></i>Add new</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedTable;
