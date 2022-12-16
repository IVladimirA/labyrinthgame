import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthData, selectAuthStatus } from "../../redux/slices/auth";
import {
  fetchLeaders,
  selectLeadersStatus,
  selectLeadersData,
} from "../../redux/slices/leaders";
import {
  fetchComments,
  selectComments,
  selectCommentsStatus,
} from "../../redux/slices/comments";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { UserInfo, Game, Leaders, Comments } from "../../components";
import axios from "../../axios";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector(selectAuthData);
  const authStatus = useSelector(selectAuthStatus);
  const leaders = useSelector(selectLeadersData);
  const leadersStatus = useSelector(selectLeadersStatus);
  const comments = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);
  const onCommentSubmit = (text) => {
    axios.post("/comment", { text }).then(() => {
      dispatch(fetchComments());
    });
  };
  const onLose = (scoreChange) => {
    axios
      .post("/me/scorechange", { scoreChange })
      .then(() => {
        dispatch(fetchLeaders());
      })
      .catch((e) => {
        console.log("error");
        console.log(scoreChange);
      });
  };
  React.useEffect(() => {
    if (authStatus === "error") {
      navigate("/login");
    }
  }, [authStatus]);

  React.useEffect(() => {
    dispatch(fetchLeaders());
    dispatch(fetchComments());
  }, []);
  return (
    <div className="my-4">
      <Container>
        <Row>
          <Col lg={{ span: 7, order: 1 }} xs={{ order: 1 }}>
            {<UserInfo isLoading={authStatus !== "loaded"} {...authData} />}
            {
              <Comments
                comments={comments}
                isLoading={commentsStatus !== "loaded"}
                onSubmit={onCommentSubmit}
              />
            }
          </Col>
          <Col lg={{ span: 10, order: 2 }} xs={{ order: 3 }}>
            {authStatus === "loaded" ? <Game onLose={onLose} /> : ""}
          </Col>
          <Col lg={{ span: 7, order: 3 }} xs={{ order: 2 }}>
            {leadersStatus === "loaded" && <Leaders leaders={leaders} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
