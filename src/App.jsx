import { useState, useEffect, useRef } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)
  const buttonref = useRef(null)

  const Handlekeypress = (event) =>{
    if(event.key === "Enter"){
      buttonref.current.click()
    }
  }

  useEffect(() => {
    let todostring = localStorage.getItem('todos')
    if(todostring){
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const Handletoggle = () => {
    setShowfinished(!showfinished)
  }
  

  const HandleEdit = (e, id) => {
    let t = todos.filter(i=> i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {return item.id!==id})
    setTodos(newtodos)
    savetoLS()
  }

  const HandleDelete = (e, id) => {
    let newtodos = todos.filter(item => item.id !== id);
    setTodos(newtodos);
  
    if (newtodos.length === 0) {
      localStorage.removeItem('todos');
    } else {
      savetoLS();
    }
  };

  const HandleAdd = () => {
    setTodos([...todos, { id :uuidv4() , todo, iscompleted: false }])
    setTodo('')
    savetoLS()
  }

  const HandleChnage = (e) => {
    setTodo(e.target.value)
  }

  const Handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = [...todos]
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    setTodos(newtodos)
    savetoLS()
  }

  const savetoLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  
  return (
    <>
      <Navbar/>

      <div className='m-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'>

        <h1 className='font-bold text-center text-lg'>Task Manager Manage your tasks at one place</h1>

        <div className='addtodo my-5'>

          <h2 className='text-lg font-bold'>
            Add a Todo
            </h2>

            <input type="text" onKeyPress={Handlekeypress} onChange={HandleChnage} value={todo} className='w-80' />
            <button ref={buttonref} onClick={HandleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 px-6 py-1 text-white rounded-md mx-2 disabled:bg-slate-700 '>Add</button>

        </div>

          <input type="checkbox" onChange={Handletoggle} checked={showfinished} /> Show Finished

          <h2 className='text-xl font-bold'>
            Your Todos
          </h2>

        <div className='todos'> 

          {todos.length === 0 && <div className='text-center text-lg m-5 font-bold'>No Todos</div>}

          {todos.map(item=>{



          return (showfinished || !item.iscompleted) && <div key={item.id} className='todo flex md:w-full my-1 justify-between items-center'>
  
          {/* LEFT side */}
          <div className='flex items-center gap-3'>
            <input 
              name={item.id}
              onChange={Handlecheckbox}
              type="checkbox"
              checked={item.iscompleted}
            />
            <div className={item.iscompleted ? "line-through" : ""}>
              {item.todo}
            </div>
          </div>
        
          {/* RIGHT side */}
          <div className='flex items-center gap-2'>
            <button onClick={(e) => HandleEdit(e, item.id)} 
              className='bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-md'>
              <FaEdit />
            </button>
            <button onClick={(e) => HandleDelete(e, item.id)} 
              className='bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-md'>
              <MdDeleteForever />
            </button>
          </div>
        
        </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
