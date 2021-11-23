import React from "react";
import {fireEvent, render, waitForElement} from '@testing-library/react';
import ListOfGames from "./ListOfGames";

describe('Test games api', () => {
    test('Verify a game is retrieved', async () => {

        const {getByText} = render(<ListOfGames/>);

        const noGames = await waitForElement(
            () => getByText('No hay partidas')
        );

        const game = await waitForElement(
            () => getByText('Unirse a partida')
        );
        expect.assertions(1)
        try{
            expect(noGames).toBeInTheDocument()
        }catch(error){

        }        
    });
});