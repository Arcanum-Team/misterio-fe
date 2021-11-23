import React from "react";
import { render, setErrorMessage } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JoinForm from './JoinForm.js';

test('render join form', async () => {
  try {
    const response: Response = await fetch(
      'http://127.0.0.1:8000/api/v1/games/join',
      {headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }, method: "PUT"});
      console.log("ASDASDASDASDASDA")
    if (response.status === 200) {
      const component = render(<JoinForm/>)
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
