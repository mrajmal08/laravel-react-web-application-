import AppContext from "./AppContext";
import { useState } from "react";

const AppState = (props) =>{

    const [contacts, setContacts] = useState([])

    const [search, setSearch] = useState('')

   
    return (

       <AppContext.Provider value={{
        contacts,
        setContacts,
        search, 
        setSearch,

           allContacts: async () =>{

            await axios.get(`http://localhost:8000/api/allcontact`).then(({data})=>{
                setContacts(data.data)

            })  
              

           }
       }}>

          {props.children}

       </AppContext.Provider>

    )

}

export default AppState;
