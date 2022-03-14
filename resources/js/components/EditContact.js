import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function editcontact() {
    const navigate = useNavigate();
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchProduct()
      },[])
    
      const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/editcontact/${id}`).then(({data})=>{
          const { name, email, phone } = data.data
          setName(name)
          setEmail(email)
          setPhone(phone)

        }).catch(({response:{data}})=>{
          Swal.fire({
            text:data.message,
            icon:"error"
          })
        })
      }

      const updateContact = async (e) => {
        e.preventDefault();


        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)


        await axios.post(`http://localhost:8000/api/updatecontact`, formData).then(({data})=>{

        Swal.fire({
              icon:"success",
              text:data.message
            })
            navigate("/")
          }).catch(({response})=>{
            if(response.status===422){
              setValidationError(response.data.errors)
            }else{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
            }
          })

        
      }


  return (
    <div className='container my-4'>

        <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
        </div><hr />
        <form onSubmit={updateContact}>
            <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" name='name' value={name} onChange={(event)=>{
                              setName(event.target.value)}} className="form-control-plaintext" id="name"  placeholder="Enter name" />
            </div>
            </div>
            <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email address</label>
                    <div className="col-sm-10">
                    <input type="email" name='email' value={email}  onChange={(event)=>{
                              setEmail(event.target.value)}} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
           </div>
            <div className="form-group row mb-3">
                <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                    <input type="text" className="form-control" value={phone}  onChange={(event)=>{
                              setPhone(event.target.value)}} name='phone' placeholder="Enter phone"  />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
        </form>
    </div>
  )
}
