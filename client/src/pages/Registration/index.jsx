import React from "react";
import style from "./Registration.module.scss";
import { Container, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  selectAuthStatus,
  fetchAuthMe,
  fetchAuth,
} from "../../redux/slices/auth";
import { Link } from "react-router-dom";
const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Введите имя"),
  email: Yup.string().email("Не верный формат email").required("Введите email"),
  password: Yup.string().required("Введите пароль"),
});
function Registration() {
  let [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  let [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const data = await dispatch(fetchRegister(values));
    if (!!!data.payload) {
      setIsRegisterSuccess(false);
      setIsLoading(false);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  const handleGuestButtonClick = async () => {
    const data = await dispatch(
      fetchAuth({ email: "test@mail.com", password: "123456789" })
    );
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (authStatus === "loaded") {
    dispatch(fetchAuthMe());
    navigate("/");
  }
  return (
    <Container fluid className={`${style.container}`}>
      <div className="bg-white rounded-4 px-3 px-md-5 py-3 my-4">
        <h1 className="fs-4 pb-1">Добро пожаловать на SocialNetwork</h1>
        <Formik
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
          initialValues={{
            fullName: "",
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
            isValid,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="gy-3">
                <Form.Group as={Col} sm={24} controlId="validationFormik01">
                  <Form.Label className="m-0">Полное имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Имя"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => {}}
                    isInvalid={touched.fullName && !!errors.fullName}
                    isValid={touched.fullName && !errors.fullName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

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
                {!isRegisterSuccess && (
                  <p className="text-danger mt-0 mb-1">
                    Не удалось зарегистрироваться
                  </p>
                )}
                <Col className="d-grid mt-0">
                  <Button type="submit" className={style.reg__button}>
                    {isLoading ? (
                      <span>Загрузка...</span>
                    ) : (
                      <span>Зарегистрироваться</span>
                    )}
                  </Button>
                  <p className="text-center my-2">Или</p>
                  <Button
                    onClick={handleGuestButtonClick}
                    className={style.reg__button}
                  >
                    Зайти гостем
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <p role="button" className="text-primary pt-2 m-0">
          <Link className="text-decoration-none" to="/login">
            Уже есть аккаунт? Войти
          </Link>
        </p>
      </div>
    </Container>
  );
}
export default Registration;
