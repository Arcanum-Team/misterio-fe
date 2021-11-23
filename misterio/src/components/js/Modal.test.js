import React from "react";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal.js';

test('render modal', () => {
  const component = render(<Modal />)
});
