import React from "react";
import { render, setErrorMessage } from '@testing-library/react';
import LobbyRoom from './LobbyRoom.js';

test('render lobby room', async () => {
  const params = {
    "name": "Game 1",
    "player_count": 2,
    "started": false,
    "id": "33830305-3f28-4714-8e13-462c1f703e53",
    "turn": null
  }
  try {
    const response = await fetch(
      'https://famaf.free.beeceptor.com/games',
      {headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, method: "GET"});
    if (response.status === 200) {
      const component = render(<LobbyRoom params= {params}/>)
      component.getElementBy(response.name)
      setErrorMessage(undefined);
    } else if (response.status === 404) {
      setErrorMessage('El sv no pudo encontrar esta pagina.');
    } else {
      setErrorMessage('El sv no respondio con la data que se queria');   
  }
  } catch (cause) {
    console.log(cause)
  }
});
