import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import {
  App,
  Title, 
  Component,
  Input,
  InputIcon,
  IconRight,
  TextLink,
  Button,
  TwoButtonView,
  TwoButtons,
} from './styles';
import api from '../../services/api';
import { user } from '../../config/constants';

const Login = () => {
  const [ userName, setUserName ] = useState('');
  const [ userPassword, setUserPassword ] = useState('');
  const [ showPass, setShowPass ] = useState(false);
  const [ checkShowPass, setCheckShowPass ] = useState(false);
  const [ checkPassword, setCheckPassword ] = useState('');
  const [ registerForm, setRegisterForm ] = useState(false);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleLogin = async () => {
    signIn({ userName, userPassword });
  };

  const handleSignUp = async () => {
    if (!userPassword || !checkPassword || (userPassword !== checkPassword)) {
      addToast({
        type: 'error',
        title: 'Senhas não batem',
        description: 'As senhas devem ser iguais'
      })
    }

    const userCreated = await api.post(user, {
      name: userName, 
      password: userPassword
    });

    if (userCreated) signIn({ userName, userPassword });
  };

  const handleRegisterForm = () => {
    setRegisterForm(!registerForm);
  };

  return (
  <App>
    <Component>
      <Title>iHeros</Title>
      {!registerForm && 
        <>
          <Input 
            type="Text" 
            placeholder="Nome" 
            onChange={(value) => setUserName(value.target.value)}
            value={userName}
          />
          <InputIcon>
            <Input 
              type={!showPass ? "Password" : "Text"}
              placeholder="Senha" 
              onChange={(value) => setUserPassword(value.target.value)}
              value={userPassword}
            />
            <IconRight onClick={() => setShowPass(!showPass)}>
              {showPass && <FaEye size={25} />}
              {!showPass && <FaEyeSlash size={25} />}
            </IconRight>
          </InputIcon>
          <TextLink 
            type="Text" 
            placeholder="Senha" 
            onClick={handleRegisterForm}
            onChange={() => {}}
          >
            {'Cadastrar-se'}
          </TextLink>
          <Button 
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </>
      }
      {registerForm && 
        <>
          <Input 
            type="Text" 
            placeholder="Nome" 
            onChange={(value) => setUserName(value.target.value)}
            value={userName}
          />
          <InputIcon>
            <Input 
              type={!showPass ? "Password" : "Text"} 
              placeholder="Senha" 
              onChange={(value) => setUserPassword(value.target.value)}
              value={userPassword}
            />
            <IconRight onClick={() => setShowPass(!showPass)}>
              {showPass && <FaEye size={25} />}
              {!showPass && <FaEyeSlash size={25} />}
            </IconRight>
          </InputIcon>
          <InputIcon>
            <Input 
              type={!checkShowPass ? "Password" : "Text"}
              placeholder="Repita a Senha" 
              onChange={(value) => setCheckPassword(value.target.value)}
              value={checkPassword}
            />
            <IconRight onClick={() => setCheckShowPass(!checkShowPass)}>
              {checkShowPass && <FaEye size={25} />}
              {!checkShowPass && <FaEyeSlash size={25} />}
            </IconRight>
          </InputIcon>
          <TwoButtonView>
            <TwoButtons 
              onClick={handleRegisterForm}
            >
              Cancelar
            </TwoButtons>
            <TwoButtons 
              onClick={handleSignUp}
            >
              Cadastrar
            </TwoButtons>
          </TwoButtonView>
        </>
      }
    </Component>
  </ App>
  );
};

export default Login;
