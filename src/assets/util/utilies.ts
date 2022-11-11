import axios, { Axios } from "axios"  

axios.defaults.baseURL = `http://localhost:3000`

export const handleChangle: ( evt: any, setFormState: any, FormState: any ) => void = ( evt: any, setFormState: any, FormState: any ): void =>
    {
        evt?.preventDefault()
        const { name, value } = evt?.target
        setFormState( { ...FormState, [ name ]: value } )
    }
   export  const handleSubmit: (evt: any,FormState:any) => void = async (evt: any,FormState:any): Promise<void> =>
   {
       try {
           if ( emailValidationN( FormState ) === true )
            {
               axios.post( "/home",{
                   RequestData: FormState
               }, {
                   method: "post",
                   headers: {
                       Accept: 'application/json, text/plain, */*',
                       'Content-Type': 'application/json',
                   }
               }).then(response => console.info(response.data));
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