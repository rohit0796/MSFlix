import React, { useEffect, useState } from 'react'
import Context from './Context'
const ContextHolder = (props) => {
  const [mode, setMode] = useState(localStorage.getItem('mode')||"");
 useEffect(()=>{
  localStorage.setItem('mode',mode)
 },[mode])
  localStorage.setItem('mode', mode);
  console.log(mode)
  return (
    <Context.Provider value={{ mode, setMode }}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextHolder
