import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {motion,useMotionValue, useTransform,useDragControls,Reorder} from "framer-motion"
import {useDispatch,useSelector} from "react-redux"
import {add,toggle, removeOne} from "./freacture/list/listSlice.js"
import { Clear } from './assets/icons/icons'

function App() {

  const estado = useSelector(state=>state.value)
  const dispach = useDispatch()
  const [task,setTask] =useState("")


  
  const handleInput=(e)=>{
    setTask(e.target.value)
  }
  const handleClick= (e)=>{
    e.preventDefault()
     dispach(add({
      content:task,
      isDone:false
     }))
     console.log("hola")
    
  }
  useEffect(()=>{
    localStorage.getItem("task") && estado.length == 0? dispach(add(JSON.parse(localStorage.getItem("task")))) : null 
    console.log(estado)
  },[])
  useEffect(()=>{
    localStorage.setItem("task", JSON.stringify(estado))
  },[estado])
 
 

  return (
   <div>
      <div className="banner"> <h1>Anotador de tareas</h1></div>
     <div className="App">
        <form onSubmit={handleClick}>
        <motion.input type="text"className='input_task' onChange={handleInput} value={task} whileFocus={{border:"1px solid #009929"}} whileHover={{border:"1px solid #000"}}/>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}} transition={{duration:0, ease:"linear"}} className="boton">Agregar</motion.button>
        </form>
      <motion.div className="border" layout>
      <motion.div className='box' layout>

<div className='list'>
  <h2>Tareas</h2>
<ul >
  {estado
  .map((e,index)=>
  e.isDone ? null : <motion.li initial={{height:0}} animate={{height:"inherit"}} key={index} transition={{duration:.1} }>
    
  <div><p>{e.content}</p></div>
  <div className="container">
  <input type="checkbox" checked={e.isDone} onChange={()=>dispach(toggle(e.content))}/>
  <button className='boton' onClick={()=>dispach(removeOne(index))}><Clear width={15}/></button>
  </div>
</motion.li>)}
</ul>
</div>
<div className='list'>
  <h2>Tareas realizadas</h2>
<ul >
{estado
  .map((e,index)=>
 e.isDone ?  <motion.li initial={{height:0}} animate={{height:"inherit"}} transition={{duration:.1}} key={index}>
 <div><p>{e.content}</p></div>
<div className="container">
<input type="checkbox" checked={e.isDone} onChange={()=>dispach(toggle(e.content))}/>
<button className='boton' onClick={()=>dispach(removeOne(index))}><Clear width={15}/></button>
</div>
</motion.li>:null)}
</ul>
</div>
</motion.div>
      </motion.div>
        
    </div>
    <div className="footer">
      <span>repositorio de <a href="https://github.com/Gonzalo-Erceg/Task_app2.0">Github</a></span>
    </div>
   </div>  
  )
}

export default App
