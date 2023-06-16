import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  InputWrapper,
  LoginButton,
  LoginInput,
  Text,
  Title,
} from "../styled";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) setValid(true);
  }, [email, password]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    }
  }, []);

  const onClickSignin = async () => {
    await axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        navigate("/todo");
      })
      .catch((error) => {
        alert(`로그인 실패 : ${error.response.data.message}`);
      });
  };

  return (
    <Container>
      <Title>로그인</Title>
      <InputWrapper>
        <Text>* 이메일</Text>
        <LoginInput
          data-testid="email-input"
          placeholder="이메일을 입력하세요"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Text>* 비밀번호</Text>
        <LoginInput
          data-testid="password-input"
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </InputWrapper>
      <LoginButton
        data-testid="signin-button"
        onClick={onClickSignin}
        disabled={!valid}
      >
        로그인
      </LoginButton>
    </Container>
  );
}
