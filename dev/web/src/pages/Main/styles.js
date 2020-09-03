import styled from 'styled-components';

export const App = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #AB3648;
  height: 10vh;
  width: 100vw;
  z-index: 900;
  top: 0;
`;

export const Footer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #AB3648;
  height: 15vh;
  width: 100vw;
  z-index: 900;
  bottom: 0;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  padding-left: 25px;
  font-size: 50px;
`;

export const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 25px;
`;

export const UserName = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  padding-left: 25px;
  font-size: 25px;
  padding-right: 10px;
`;

export const DataInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #FFFFFF;
  border-radius: 50px;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 25px;
`;

export const Badge = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  left: 0;
  z-index: 9999;
`;

export const HeroDescription = styled.h1`
  font-size: 25px;
  color: #3188D9;
  padding-left: 10px;
`;

export const ThreatDescription = styled.h1`
  font-size: 25px;
  color: #AB3648;
  padding-left: 10px;
`;

export const OccurrenceDescription = styled.h1`
  font-size: 25px;
  color: #788896;
  padding-left: 10px;
`;

export const DataCount = styled.h1`
  font-size: 25px;
  padding-left: 15px;
`;

export const Modal = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
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
  z-index: 902;
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