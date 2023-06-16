import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  height: auto;
  background-color: #f2f4f7;
  border: 2px solid lightgray;
  border-radius: 15px;
  margin: auto;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h1`
  margin: 0 auto 20px auto;
`;
export const AddTodoWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;
export const TodoInput = styled.input`
  flex: 1;
  height: 20px;
  margin-right: 10px;
`;
export const Text = styled.span`
  font-size: 15px;
  font-weight: 600;
`;
export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LoginInput = styled.input`
  height: 30px;
  padding: 0 10px;
  margin: 0;
`;
export const LoginButton = styled.button`
  height: 40px;
  margin: 0;
  margin-top: 10px;
  background-color: ${(p) => (p.disabled ? "gray" : "#67FF5F")};
  color: ${(p) => (p.disabled ? "white" : "default")};
  font-weight: 700;
  border: none;
  border-radius: 5px;
  padding: 10px 0;
`;
export const Li = styled.li`
  list-style: none;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid #635fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TodoEditInput = styled.input`
  margin-left: 10px;
`;
export const TodoBtn = styled.button`
  background-color: gray;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 3px 7px;
`;
export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-left: auto;
  min-width: 25%;
`;
export const Label = styled.label`
  display: flex;
  align-items: center;
`;
export const Content = styled.span`
  margin-left: 10px;
`;
