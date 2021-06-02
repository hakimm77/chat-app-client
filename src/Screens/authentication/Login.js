import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spacer from "../../Components/reusableComponents/Spacer";
import InputField from "../../Components/InputField";
import AppText from "../../Components/reusableComponents/AppText";
import Loadingimage from "../../Components/reusableComponents/LoadingImage";
import Container from "../../Components/reusableComponents/Container";

const InputsContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 60px;
  outline: none;
  background-color: #50b648;
  border: none;
  cursor: pointer;
`;

const Login = ({ history }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [emailText, setEmailText] = useState();
  const [passwordText, setPasswordText] = useState();
  const [errCode, setErrCode] = useState();
  const [loading, setLoading] = useState(false);

  const login = async (email, password, e) => {
    if (email && password) {
      setErrCode("");
      setLoading(true);

      if (e) {
        e.preventDefault();
      }

      setPasswordText("");
      const fetchLogin = fetch(
        `https://us-central1-backend-a365f.cloudfunctions.net/app/login?email=${email}&password=${password}`
      ).then((response) => {
        return response.json();
      });

      await fetchLogin.then(async (data) => {
        let failed = data.code;

        if (!failed) {
          await localStorage.setItem("user", data.user.email);
          history.push("/chat");
          setLoading(false);
          console.log(data);
        } else {
          setErrCode(failed);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    document.title = "Chat app | login";
    if (user) {
      history.push("/chat");
    }
  }, []);

  return (
    <Container
      flex
      direction="column"
      alignVertical="center"
      alignHorizantle="center"
    >
      <Spacer height={10} />
      <AppText weight="bold" color="#3f4547" size={30}>
        Login your account
      </AppText>
      <Spacer height={5} />

      <InputsContainer
        onSubmit={(event) => {
          login(emailText, passwordText, event);
        }}
      >
        <InputField
          insideText="Enter you email"
          savetext={(txt) => {
            setEmailText(txt.currentTarget.value);
          }}
          typeOf="email"
          emailPattern=".+@gmail.com"
          inputVal={emailText}
        />
        <InputField
          insideText="Enter you password"
          savetext={(txt) => {
            setPasswordText(txt.currentTarget.value);
          }}
          typeOf="password"
          inputVal={passwordText}
        />
        <Spacer height={2} />
        <SubmitButton
          onClick={() => {
            login(emailText, passwordText);
          }}
        >
          {loading ? (
            <Loadingimage />
          ) : (
            <AppText weight="bold" color="#fafafa" size={25}>
              Login
            </AppText>
          )}
        </SubmitButton>

        {errCode ? (
          <AppText color="red" size={20} Style={{ padding: 10 }}>
            {errCode}
          </AppText>
        ) : null}
      </InputsContainer>

      <Spacer height={15} />

      <Container
        clickEvent={() => {
          history.push("/signup");
        }}
      >
        <AppText
          color="#000"
          Style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          don't have an account ? sign up here
        </AppText>
      </Container>
    </Container>
  );
};

export default Login;
