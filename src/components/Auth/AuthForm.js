import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { actFetchTempCart } from "../../actions/cartActions";

import AuthContext from "../../store/auth-context";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const AuthForm = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_pSHXagCQzpZ9yLPhpQ2fWWWhdmzFaTI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_pSHXagCQzpZ9yLPhpQ2fWWWhdmzFaTI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.email, data.idToken, expirationTime.toISOString());
        props.actFetchTempCart();
        history.replace("/category");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="text-center w-50" style={{ margin: "2rem" }}>
            <Card.Header as="h3">{isLogin ? "Login" : "Sign Up"}</Card.Header>
            <Card.Body>
              <form onSubmit={submitHandler}>
                <Form.Group role="form">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    ref={emailInputRef}
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                    required
                  />
                  {errorMsg !== "" && (
                    <Form.Text style={{ color: "red" }}>{errorMsg}</Form.Text>
                  )}
                  <br />
                  {!isLoading && (
                    <Button variant="dark" type="submit">
                      {isLogin ? "Login" : "Create Account"}
                    </Button>
                  )}
                  {isLoading && <p>Sending request...</p>}
                </Form.Group>
              </form>
            </Card.Body>
            <Card.Footer>
              <Button variant="link" onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
const mapDispatch = {
  actFetchTempCart,
};

export default connect(null, mapDispatch)(AuthForm);
