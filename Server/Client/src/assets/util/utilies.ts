import axios, { Axios } from "axios";



axios.defaults.baseURL = `http://localhost:3000`


export const handleChangle: ( evt: any, setFormState: any, FormState: any ) => void = ( evt: any, setFormState: any, FormState: any ): void =>
    {
        evt?.preventDefault()
        const { name, value } = evt?.target
        setFormState( { ...FormState, [ name ]: value } )
    }
   export  const handleSubmit = async (evt: any,FormState:any):Promise<any> =>
   {
       
       try
       {
           
           if ( emailValidationN( FormState ) === true )
            {
               await axios.post( "/home",{
                   RequestData: FormState
               }, {
                   method: "post",
                   headers: {
                       Accept: 'application/json, text/plain, */*',
                       'Content-Type': 'application/json',
                   }
               } ).then( response => response.data );
            }
       } catch (error) {
            console.info(["Error from axios method handleSubmit",error])
       }

    }
    
    const emailState = {
    email: '',
    error: ''
}
    
export const emailValidationN: (FromState:any) => boolean = (FormState:any):boolean =>{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!FormState.email && !FormState.secretkey || regex.test(FormState.email) === false){
            return false;
    }
        return true;
    }