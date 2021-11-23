import React from "react";
import { render, setErrorMessage } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LobbyRoom from './LobbyRoom.js';
import Portal from './Portal.js'

test('render lobby room', async () => {
  try {
    const response: Response = await fetch(
      'http://127.0.0.1:8000/api/v1/games/',
      {headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, method: "GET"});
    if (response.status === 200) {
      const portal = render(<Portal/>);
      const component = render(<LobbyRoom/>)
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
