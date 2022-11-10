    export const handleChangle: ( evt: any,setFormState:any,FormState:any ) => void = ( evt:any ,setFormState:any,FormState:any): void =>
    {
        evt?.preventDefault()
        const { name, value } = evt?.target
        setFormState( { ...FormState, [ name ]: value } )
    }
   export  const handleSubmit: (evt: any,FormState:any) => void = (evt: any,FormState:any): void =>
   {
       evt?.preventDefault()
       if ( emailValidationN( FormState ) === true )
       {
           console.info( FormState )
    
       }
       else
       {
           
           alert( "Enter the Correct Details" );
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