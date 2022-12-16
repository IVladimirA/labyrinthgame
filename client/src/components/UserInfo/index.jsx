import React from "react";
import styles from "./UserInfo.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function UserInfo({ _id, fullName, email, isLoading, score }) {
  return (
    <div className="userInfo-paper w-100 bg-white rounded-4 p-4 mb-4">
      <div className={`${styles.border__grey} border-bottom pb-2`}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              style={{
                background: `url(${"https://via.placeholder.com/150"})`,
              }}
              alt=""
              className="me-2 rounded-circle user__avatar"
              width="60"
              height="60"
            />
            <div>
              <h5 className="mt-2 mb-0">
                {isLoading ? (
                  <Skeleton style={{ width: "130px" }} count={1} />
                ) : (
                  `${fullName}`
                )}
              </h5>
              <div className="text-muted m-0">
                {isLoading ? (
                  <div className="d-flex">
                    <Skeleton style={{ width: "15px" }} count={1} />
                    <span className="ms-2">очков</span>
                  </div>
                ) : (
                  <div>
                    <p>{score} очков</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center"></div>
        </div>
      </div>
      <div
        className={`${styles.border__grey} border-bottom pb-2 secondary-info mt-2`}
      >
        <div className="location py-2">
          <i className="fa-regular fa-envelope fa-lg ms-1 pe-3 text-muted"></i>
          <p className="text-muted d-inline">
            {isLoading ? (
              <Skeleton style={{ width: "150px" }} count={1} />
            ) : (
              email
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
