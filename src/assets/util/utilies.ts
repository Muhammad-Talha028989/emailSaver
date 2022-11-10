    export const handleChangle: ( evt: any,setFormState:any,FormState:any ) => void = ( evt:any ,setFormState:any,FormState:any): void =>
    {
        evt?.preventDefault()
        const { name, value } = evt?.target
        setFormState( { ...FormState, [ name ]: value } )
    }
   export  const handleSubmit: (evt: any,FormState:any) => void = (evt: any,FormState:any): void =>
   {
        evt?.preventDefault()
        console.info( FormState )
    }