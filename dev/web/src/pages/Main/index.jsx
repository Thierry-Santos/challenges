import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { FaUserCircle } from 'react-icons/fa';
import socketIOClient from 'socket.io-client';

import CreateHeroForm from '../../components/Forms/CreateHeroForm/CreateHeroForm';
import images from '../../assets/images';
import {
  App,
  Header,
  Footer,
  Title,
  UserProfile,
  UserName,
  DataInfo,
  Badge,
  HeroDescription,
  ThreatDescription,
  OccurrenceDescription,
  DataCount,
  Component,
  Modal,
  Button,
  Input,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import api from '../../services/api';
import { 
  heros, 
  occurrences,
  heroOccurrences,
  GoogleKey,
  socketURL
} from '../../config/constants';

export const MapContainer = (props) => {
  const [userName, setUserName] = useState('admin');
  const [herosList, setHerosList] = useState([]);
  const [threatsList, setThreatsList] = useState([]);
  const [occurrencesList, setOccurrencesList] = useState([]);
  const [userMenu, setUserMenu] = useState(false);
  const [heroCrud, setHeroCrud] = useState(false);
  const [heroCreate, setHeroCreate] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { addToast } = useToast();
  const { signOut, token, name } = useAuth();

  useEffect(() => {
    if (name) {
      setUserName(name);
    }
    
    if (token) {
      getAllHeros(token);
      getAllOccurrences(token);
    }

    setRefreshFlag(false);
  }, [refreshFlag]);

  useEffect(() => {
    const socket = socketIOClient(socketURL);
    socket.on('occurrence', (receivedInfo) => {
      handleSocketReceive(receivedInfo);
    })
  }, [])

  const handleSocketReceive = async (receivedInfo) => {
    await api.post(occurrences, 
    {
      monster_name: receivedInfo.monsterName,
      danger_level: receivedInfo.dangerLevel.toLowerCase(),
      location: receivedInfo.location[0]
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    setRefreshFlag(true);
  }

  const createHero = async (heroName, heroRank, heroLng, heroLat) => {
    if (!heroName || !heroRank || !heroLng || !heroLat) { 
      addToast({
        type: 'error',
        title: 'Erro ao criar heroi',
        description: 'Todos os Campos devem ser preenchidos'
      })
      return ;
    }

    try {
      const hero = await api.post(heros, 
        {
          name: heroName,
          rank: heroRank.toLowerCase(),
          location: {
            lat: heroLat,
            lng: heroLng
          }
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
      if (hero) {
        addToast({
          type: 'success',
          title: 'Successo',
          description: 'Heroi Criado!'
        })
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Falha ao criar heroi!'
      })
    }
  }
  
  const getAllHeros = async () => {
    const herosArray = await api.get(heros, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    setHerosList(herosArray.data);
  }
  
  const getAllOccurrences = async (token) => {
    const occurrencesArray = await api.get(occurrences, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const occurrencesMaps = occurrencesArray.data;
    let occurrencesListArray = [];
    let threatsListArray = [];

    for (const occurrencesMap of occurrencesMaps) {
      if (occurrencesMap.deleted_at) {
        occurrencesListArray.push(occurrencesMap);
      }else {
        await api.put(`${heroOccurrences}/${occurrencesMap.id}`, {}, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        threatsListArray.push(occurrencesMap);
      }
    }

    setThreatsList(threatsListArray)
    setOccurrencesList(occurrencesListArray)
  }

  const UserMenuView = () => {
    return (
      <Modal>
        <Component>
          <Title>iHeros</Title>
            {!heroCrud && <>
              <Button 
                onClick={() => setHeroCrud(true)}
              >
                Herois
              </Button>
              <Button 
                onClick={() => signOut()}
              >
                Deslogar
              </Button>
            </>}
            {(heroCrud && !heroCreate) && 
            <>
              <Button 
                onClick={() => setHeroCreate(true)}
              >
                Criar Heroi
              </Button>
              <Button 
                onClick={() => setHeroCrud(false)}
              >
                Voltar
              </Button>
            </>}
            {heroCreate &&
            <CreateHeroForm 
              onCreate={(heroName, heroRank, heroLng, heroLat) => createHero(heroName, heroRank, heroLng, heroLat)} 
              onBack={() => setHeroCreate(false)} 
            />}
        </Component>
      </Modal>
    )
  }

  return (
    <App>
      <Header>
        <Title>iHeros</Title>
        <UserProfile
          onClick={() => setUserMenu(!userMenu)}
        >
          <UserName>{userName}</UserName>
          <FaUserCircle color={'#FCE188'} size={55} />
        </UserProfile>
      </Header>
      <Map 
        google={props.google} 
        initialCenter={{
          lat: 21.719533,
          lng: -16.1781147
        }}
        zoom={3}
      >

        {userMenu && <UserMenuView />}
        {herosList.length > 0 && herosList.map((item, index) => (
          <Marker
            key={index}
            position={item.location}
            icon={{
              url: images.heros,
              anchor: new props.google.maps.Point(32,32),
              scaledSize: new props.google.maps.Size(64,64)
            }}
          />
        ))}

        {threatsList.length > 0 && threatsList.map((item, index) => (
          <Marker
            key={index}
            position={item.location}
            icon={{
              url: images.threats,
              anchor: new props.google.maps.Point(32,32),
              scaledSize: new props.google.maps.Size(64,64)
            }}
          />
        ))}

        {occurrencesList.length > 0 && occurrencesList.map((item, index) => (
          <Marker
            key={index}
            position={item.location}
            icon={{
              url: images.occurrences,
              anchor: new props.google.maps.Point(32,32),
              scaledSize: new props.google.maps.Size(64,64)
            }}
          />
        ))}

        <InfoWindow onClose={() => alert('oi')}>
            <div>
              <h1>Hy</h1>
            </div>
        </InfoWindow>
      </Map>
      <Footer>
        <DataInfo>
          <Badge src={images.herosCount} />
          <HeroDescription>Herois</HeroDescription>
          <DataCount>{herosList ? herosList.length : 0}</DataCount>
        </DataInfo>
        <DataInfo>
          <Badge src={images.threatsCount} />
          <ThreatDescription>Ameaças</ThreatDescription>
          <DataCount>{threatsList ? threatsList.length : 0}</DataCount>
        </DataInfo>
        <DataInfo>
          <Badge src={images.occurrencesCount} />
          <OccurrenceDescription>Ocorrencias</OccurrenceDescription>
          <DataCount>{occurrencesList ? occurrencesList.length : 0}</DataCount>
        </DataInfo>
      </Footer>
    </App>
  );
}

export default GoogleApiWrapper({
  apiKey: GoogleKey
})(MapContainer)