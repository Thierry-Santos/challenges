import styled from 'styled-components';

export const App = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw
`;

export const Title = styled.h1`
  font-size: 60px;
  color: #FFFFFF;
  height: 150px;
`;

export const Component = styled.div`
  display: flex;
  flex-direction: column;
  background: #AB3648;
  width: 500px;
  height: 600px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  background: #FFFFFF;
  border: 0px;
  border-radius: 50px;
  height: 60px;
  margin: 10px 0px 10px 0px;
  width: 335px;
  padding-left:15px;
  font-size: 25px;
`;

export const InputIcon = styled.span`
  display: flex;
  height: 80px;
  width: 350px;
  justify-content: flex-end;
  align-items: center;
`;

export const IconRight = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 80px;
`;

export const TextLink = styled.button`
  background: transparent;
  text-align: center;
  border: 0px;
  border-radius: 50px;
  height: 60px;
  width: 350px;
  font-size: 28px;
  color: #FAD144;
`;

export const Button = styled.button`
  background: #FAD144;
  color: #AB3648;
  border: 0px;
  border-radius: 50px;
  height: 60px;
  margin: 10px 0px 10px 0px;
  width: 350px;
  padding-left:15px;
  font-size: 28px;
`;

export const TwoButtons = styled.button`
  background: #FAD144;
  color: #AB3648;
  border: 0px;
  border-radius: 50px;
  height: 60px;
  margin: 10px 0px 10px 0px;
  width: 165px;
  font-size: 28px;
`;

export const TwoButtonView = styled.span`
  width: 350px;
  display: flex;
  justify-content: space-between;
`;