import ApiInterceptor from './ApiInterceptor'

export default async function getData(){
    try{
        const response =await ApiInterceptor.get(`details`)
        
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

export async function postLeaveDetails(leaveDetails) {
    try{
        const response=await ApiInterceptor.post('addLeave',leaveDetails)
        return response
    }
    catch(error){
        console.log('Unable to Post Leave Details',error)
    }
    
}

export async function getLeaveDetails(){
    try{
        const response=await ApiInterceptor.get('getLeaves')
        return response.data

    }
    catch (err){
        console.log('Error Fetching data',err)

    }
}

