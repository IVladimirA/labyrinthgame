import React from "react";
function Leaders({ leaders }) {
  return (
    <div className="bg-white rounded-3 p-4 mb-4">
      <h5 className="">Лидеры</h5>
      <div className="leaders">
        {leaders.map((leader, index) => (
          <div className="leader d-flex align-items-center" key={index}>
            <img
              style={{
                background: `url(${"https://via.placeholder.com/150"})`,
              }}
              alt=""
              className="me-2 rounded-circle user__avatar"
              width="50"
              height="50"
            />
            <div className="leader__info">
              <div className="leader__name">{leader.fullName}</div>
              <div className="leader__score">{`очков ${leader.score}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Leaders;
