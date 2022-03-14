import React, {useState, useContext } from 'react'
import { Link } from "react-router-dom";

import AppContext from '../context/AppContext';


export default function Navbar() {

  const { search, setSearch, allContacts } = useContext(AppContext);

  const searchContacts =(e)=>{
    e.preventDefault();     
    console.log('local')
    allContacts()
  }


        return (
          <div>
              
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                  <div className="container-fluid">
                      <Link className="navbar-brand" to="/">All Contacts</Link>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                      </button>

                      <div className="collapse navbar-collapse" id="navbarColor01">
                      <ul className="navbar-nav me-auto">
                          {/* <li className="nav-item">
                          <Link className="nav-link active" to="/">Contacts</Link>
                          </li>
                          
                          <li className="nav-item">
                          <Link className="nav-link" to="/addcontact">Add Contacts</Link>
                          </li>                     */}
                      </ul>
                      <form onSubmit={searchContacts} className="d-flex">
                          <input className="form-control me-sm-2" type="text" value={search}  onChange={(event)=>{
                              setSearch(event.target.value)}} name='search' placeholder="Search" />
                          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                      </form>
                      </div>
                  </div>
                  </nav>


          </div>
        )
}
