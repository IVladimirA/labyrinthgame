import React from "react";
import style from "./Login.module.scss";
import { Container, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuth,
  selectAuthStatus,
  fetchAuthMe,
} from "../../redux/slices/auth";
import { Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Не верный формат логина")
    .required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});
function Login() {
  let [isLoginSuccess, setIsLoginSuccess] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const data = await dispatch(fetchAuth(values));
    if (!!!data.payload) {
      setIsLoginSuccess(false);
      setIsLoading(false);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  const handleGuestButtonClick = async () => {
    setIsLoading(true);
    const data = await dispatch(
      fetchAuth({ email: "test@mail.com", password: "123456789" })
    );
    if (!!!data.payload) {
      setIsLoginSuccess(false);
      setIsLoading(false);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (authStatus === "loaded") {
    dispatch(fetchAuthMe());
    return <Navigate to="/" />;
  }
  return (
    <Container fluid className={`${style.container}`}>
      <div className="bg-white rounded-4 px-3 px-md-5 py-3 my-4">
        <h1 className="fs-4 pb-1">Войдите</h1>
        <Formik
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Form.Group as={Col} sm={24} controlId="validationFormikEmail">
                  <Form.Label className="m-0">Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  as={Col}
                  sm={24}
                  controlId="validationFormik06"
                  className="mb-3"
                >
                  <Form.Label className="m-0">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                {!isLoginSuccess && (
                  <p className="text-danger mt-0 mb-1">
                    Не верный логин или пароль
                  </p>
                )}
                <Col className="d-grid mt-0">
                  <Button type="submit" className={style.reg__button}>
                    {isLoading ? "Загрузка..." : "Войти"}
                  </Button>
                  <p className="text-center my-2">Или</p>
                  <Button
                    onClick={handleGuestButtonClick}
                    className={style.reg__button}
                  >
                    {isLoading ? "Загрузка..." : "Зайти гостем"}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <p role="button" className="text-primary pt-2 m-0">
          <Link className="text-decoration-none" to="/register">
            Еще нет аккаунта? Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </Container>
  );
}
export default Login;
