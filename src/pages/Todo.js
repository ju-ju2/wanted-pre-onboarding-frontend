import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import styled from "styled-components";
import { AddTodoWrapper, Container, TodoInput, Title } from "../styled";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const elInput = document.querySelector("#input");

  const getData = async () => {
    await axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newData = res.data;
        setData(newData);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!token) {
      alert("로그인 후 이용가능한 페이지입니다");
      navigate("/signin");
      return;
    }
    getData();
  }, []);

  const onClickAddTodoList = async () => {
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          todo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getData();
      })
      .catch((error) => console.log(error.response.data.message));
    setTodo("");
    elInput.value = "";
  };

  return (
    <Container>
      <Title>투두리스트</Title>
      <AddTodoWrapper>
        <TodoInput
          data-testid="new-todo-input"
          onChange={(e) => setTodo(e.currentTarget.value)}
          placeholder="투두리스트를 입력하세요"
          id="input"
        />
        <button data-testid="new-todo-add-button" onClick={onClickAddTodoList}>
          추가
        </button>
      </AddTodoWrapper>
      {data.map((el) => (
        <TodoList key={el.id} data={el} getData={getData} />
      ))}
    </Container>
  );
}
