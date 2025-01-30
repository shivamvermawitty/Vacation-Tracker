import ApiInterceptor from './ApiInterceptor'

export default async function getData(email){
    try{
        const response =await ApiInterceptor.get(`details/${email}`)
        console.log(response.data)
        return response.data
    }
    catch(error ) {
        console.error('Error fetching data:', error);
      };
}

export async function updateData(data){
    try{
        const response=await ApiInterceptor.patch('update',data)
    }
    catch(error){
        console.log('Unable to Update data', error)
    }
}
export async function postLoginCred(loginCred){
    try{
        const response=await ApiInterceptor.post('login',loginCred)
        return response
    }
    catch(error){
        console.log('Unable to Login',error)
    }
}

export async function registerData(userData){
    try{
        const response=await ApiInterceptor.post('register',userData)
        return response;
    }
    catch(error){
        console.log('Unable to Register data' ,error)
    }
}

