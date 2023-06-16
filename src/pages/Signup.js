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

export default function Signup() {
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

  const onClickSignup = async () => {
    await axios
      .post("https://www.pre-onboarding-selection-task.shop/auth/signup", {
        email,
        password,
      })
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        navigate("/signin");
      })
      .catch((error) => {
        alert(`Error : ${error.response.data.message}`);
      });
  };

  return (
    <Container>
      <Title>회원가입</Title>
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
        data-testid="signup-button"
        disabled={!valid}
        onClick={onClickSignup}
      >
        회원가입
      </LoginButton>
    </Container>
  );
}
