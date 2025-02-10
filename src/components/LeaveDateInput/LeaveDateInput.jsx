
export default function LeaveDateInput({label,formData , name , setFormData , errorMessage}) {
    function handleChange(e , propertyName){
        setFormData(data=>({...data ,[propertyName] :e.target.value}))
        


    }
    // console.log(month,'month' , year,'year')
  return (<>
  
    <label>{label}</label>
    <input type='date' 
    value={formData[name]}   
    onChange={e=>handleChange(e,name)} /> <br />
    {
      errorMessage && <div className='text-danger'>{errorMessage}</div>
    }
    
    </>
      
    )
}
