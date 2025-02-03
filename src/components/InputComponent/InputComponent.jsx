import React from 'react'
import { data } from 'react-router-dom'

export default function InputComponent({label,type,formData , name , setFormData , errorMessage}) {
    

    function handleChange(e , propertyName){
        setFormData(data=>({...data ,[propertyName] :e.target.value}))
        


    }
  return (<>
  
  <label>{label}</label>
  <input type={type} 
  value={formData[name]}   
  onChange={e=>handleChange(e,name)} />
  {
    errorMessage && <div className='text-danger'>{errorMessage}</div>
  }
  
  </>
    
  )
}
