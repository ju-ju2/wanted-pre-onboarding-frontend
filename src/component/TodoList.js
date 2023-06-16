import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BtnWrapper,
  Content,
  Label,
  Li,
  TodoBtn,
  TodoEditInput,
} from "../styled";

export default function TodoList({ data, getData }) {
  const [isModify, setIsModify] = useState(false);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [todo, setTodo] = useState(data.todo);
  const id = data.id;

  const token = localStorage.getItem("token");
  const onClickDelete = async () => {
    await axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => getData())
      .catch((error) => console.log(error.response.data.message));
  };
  const onClickSubmit = async () => {
    if (todo === data.todo && isCompleted === data.isCompleted) {
      alert("변동사항이 없습니다.");
      return;
    }
    await axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo, isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIsModify(false);
        getData();
      })
      .catch((error) => console.log(error.response.data.message));
  };

  const handleCheckbox = async () => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        { todo, isCompleted: !isCompleted },
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
  };
  return (
    <Li>
      {!isModify ? (
        <>
          <Label>
            <input
              type="checkbox"
              checked={data.isCompleted}
              onChange={handleCheckbox}
            />
            <Content>{data.todo}</Content>
          </Label>
          <BtnWrapper>
            <TodoBtn
              data-testid="modify-button"
              onClick={() => setIsModify(true)}
            >
              수정
            </TodoBtn>
            <TodoBtn
              data-testid="delete-button"
              onClick={onClickDelete}
              style={{ backgroundColor: "coral" }}
            >
              삭제
            </TodoBtn>
          </BtnWrapper>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted((prev) => !prev)}
            />
            <TodoEditInput
              defaultValue={data.todo}
              onChange={(e) => setTodo(e.currentTarget.value)}
            />
          </label>
          <BtnWrapper>
            <TodoBtn
              data-testid="submit-button"
              onClick={onClickSubmit}
              style={{ backgroundColor: "#635FFF" }}
            >
              제출
            </TodoBtn>
            <TodoBtn
              data-testid="cancel-button"
              onClick={() => {
                setIsModify(false);
                setIsCompleted(data.isCompleted);
              }}
            >
              취소
            </TodoBtn>
          </BtnWrapper>
        </>
      )}
    </Li>
  );
}
