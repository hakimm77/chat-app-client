import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import AppText from "../../Components/reusableComponents/AppText";
import Spacer from "../../Components/reusableComponents/Spacer";
import InputField from "../../Components/reusableComponents/InputField";
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

const SignUp = () => {
  const [emailText, setEmailText] = useState();
  const [passwordText, setPasswordText] = useState();
  const [errCode, setErrCode] = useState();

  const signUp = async (email, password, e) => {
    setErrCode("");
    if (e) {
      e.preventDefault();
    }

    setEmailText("");
    setPasswordText("");

    if (email && password) {
      const fetchSignUp = fetch(
        `https://us-central1-backend-a365f.cloudfunctions.net/app/signUp?email=${email}&password=${password}`
      ).then((response) => {
        return response.json();
      });

      await fetchSignUp.then((data) => {
        console.log(data);
        let failed = data.code;

        if (failed) {
          setErrCode(failed);
        } else {
          const fetchLogin = fetch(
            `https://us-central1-backend-a365f.cloudfunctions.net/app/login?email=${email}&password=${password}`
          ).then((response) => {
            return response.json();
          });

          fetchLogin.then((data) => {
            localStorage.setItem("user", data.user.email);
            window.location.reload();
          });
        }
      });
    }
  };

  useEffect(() => {
    document.title = "Chat app | signUp";
  }, []);

  return (
    <Container
      flex
      direction="column"
      alignVertical="center"
      alignHorizantle="center"
    >
      <Helmet title="Chat app | sign up" />
      <Spacer height={10} />
      <AppText weight="bold" color="#3f4547" size={30}>
        Create a free account
      </AppText>
      <Spacer height={5} />
      <InputsContainer
        onSubmit={(event) => {
          signUp(emailText, passwordText, event);
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
            signUp(emailText, passwordText);
          }}
        >
          <AppText weight="bold" color="#fafafa" size={25}>
            Sign up
          </AppText>
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
          window.location = "/login";
        }}
      >
        <AppText
          color="#000"
          Style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Already have an account, login here
        </AppText>
      </Container>
    </Container>
  );
};

export default SignUp;
