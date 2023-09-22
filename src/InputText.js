import { useState } from "react"

const InputText=({name,updateParent})=>{

    const updateThings= (e)=>{
        updateParent(e.target.name,e.target.value)
    }

    return (
    <div >
    <textarea style={{ border: '4px solid grey ' }}
     rows={8} cols={100} placeholder={name} name={name}
     onChange={updateThings}></textarea>
     <hr/>
    </div>
    )
}
export default InputText