import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from "@testing-library/react";
import HomePage from "../components/js/HomePage";

test('renders content', () => {
    const componentHomePage = render(<HomePage/>);
    componentHomePage.getByText('Crear Partida');
    componentHomePage.getByText('Listar Partidas');
})