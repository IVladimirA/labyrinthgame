import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Comments({ comments, isLoading, onSubmit }) {
  const inputRef = React.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <div className="bg-white p-4 w-100 rounded-3 mb-4">
      <h5>Комментарии</h5>
      {isLoading ? (
        <div className="mb-3">
          <Skeleton count={5} />
        </div>
      ) : (
        comments.map((comment, index) => {
          return (
            <div className="mb-3" key={index}>
              <div className="d-flex">
                <img
                  style={{
                    background: `url(${"https://via.placeholder.com/150"})`,
                  }}
                  alt=""
                  className="me-2 rounded-circle user__avatar"
                  width="30"
                  height="30"
                />
                <div className="flex-fill border-bottom">
                  <div>
                    <div className="fw-bold">{comment.fullName}</div>
                  </div>
                  <div className="mb-1">{comment.text}</div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
        <textarea
          type="text"
          ref={inputRef}
          placeholder="Введите комментарий"
          rows="1"
          className="grey-200 rounded-2 border-0 px-2 w-100 me-3"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          Отправить
        </button>
      </form>
    </div>
  );
}
export default Comments;
