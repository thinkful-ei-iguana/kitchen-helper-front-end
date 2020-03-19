import React from 'react';
import ReactDOM from 'react-dom';
import NavMenu from '../Components/Nav-Menu';
import { BrowserRouter } from 'react-router-dom';
import renderer from "react-test-renderer";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
        <NavMenu />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
    const tree = renderer.create(<BrowserRouter>
        <NavMenu />
    </BrowserRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});