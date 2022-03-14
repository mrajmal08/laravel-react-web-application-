import React, {useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import AppContext from '../context/AppContext';


export default function Contacts(props) {

    const { allContacts, contacts } = useContext(AppContext);
   


    useEffect(()=>{
        // fetchContacts() 
        allContacts()
    },[])


        const fetchContacts = async () => {
            // await axios.get(`http://localhost:8000/api/allcontact`).then(({data})=>{
            //     setContacts(data.data)
            // })
        } 

    

    const deleteContact = async (id) =>{

        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         
        }).then((result) => {
            return result.isConfirmed
          });


          if(!isConfirm){
            return;
          }

          await axios.post(`http://localhost:8000/api/destroy/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchContacts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })

    }


    // console.log(contacts)


  return (
    <div className='container my-4'>
        <div className='m-3'>
            <Link  to="/addcontact" className='btn btn-success btn-sm'>Add New Contact</Link>
        </div>

        <div>
            <h1>this is context code</h1>
        </div>
        <table className="table table-hover table-bordered table-stripped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>

        {
            // contacts.length > 0 && (

                

                contacts.map((element, key)=>(

                <tr className="table-active" key={key}>
                    <th scope="row">{element.id}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                    <td>
                        <Link to={`/editcontact/${element.id}`} className="btn btn-warning btn-sm" >Edit</Link>
                        <Link to="#" onClick={() => { deleteContact(element.id) }} className="btn btn-danger btn-sm mx-2" >Delete</Link>
                    </td>
                </tr>

                ))
            // )
        }

        </tbody>
        </table>
    </div>
  )
}
