import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';

import Contacts from './Contacts';
import AddContact from './AddContact';
import EditContact from './EditContact';


import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import AppState from '../context/AppState';


function Example() {
    return (
        <>

        <AppState>

                <BrowserRouter>
            
                    <Navbar />

                    <Routes>

                        <Route exact path="/" element={<Contacts />} />
                        <Route exact path="/addcontact" element={<AddContact />} />
                        <Route exact path="/editcontact/:id" element={<EditContact />} />

                    </Routes>

                </BrowserRouter>

            </AppState>
        </>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
