import React, { useState } from 'react';

import {
  Input,
  Button,
} from './styles';

const CreateHeroForm = ({onCreate, onBack}) => {
  const [heroName, setHeroName] = useState('');
  const [heroRank, setHeroRank] = useState('');
  const [heroLat, setHeroLat] = useState('');
  const [heroLng, setHeroLng] = useState('');
  
 return (
  <>
    <Input
      type="Text" 
      placeholder="Nome" 
      onChange={(value) => setHeroName(value.target.value)}
      defaultValue={heroName}
    />
    <Input 
      type="Text" 
      placeholder="Rank" 
      onChange={(value) => setHeroRank(value.target.value)}
      defaultValue={heroRank}
    />
    <Input 
      type="Text" 
      placeholder="Latitude" 
      onChange={(value) => setHeroLat(value.target.value)}
      defaultValue={heroLat}
    />
    <Input 
      type="Text" 
      placeholder="Longitude" 
      onChange={(value) => setHeroLng(value.target.value)}
      defaultValue={heroLng}
    />
    <Button 
      onClick={() => onCreate(heroName, heroRank, heroLng, heroLat)}
    >
      Criar
    </Button>
    <Button 
      onClick={onBack}
    >
      Cancelar
    </Button>
  </>
 )
}

export default CreateHeroForm;