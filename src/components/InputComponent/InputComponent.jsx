import React from 'react'
import { data } from 'react-router-dom'

export default function InputComponent({type,formData , name , setFormData}) {
    

    function handleChange(e , propertyName){
        setFormData(data=>({...data ,[propertyName] :e.target.value}))
        


    }
  return (
    <input type={type} value={formData[name]}   onChange={e=>handleChange(e,name)} />
  )
}
