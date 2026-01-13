import React, { useState } from 'react'
import './index.css'

function App() {
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState(() => {
        return JSON.parse(localStorage.getItem('todos')) || []
  })
  
 // const [todoList, setTodoList] = useState([])
 //  // LOCAL STORAGE SETUP
 // useState(() => {
 //    const data = localStorage.getItem('todos')
 //    const saved = JSON.parse(data)
 //    if (saved) {
 //      setTodoList(saved)
 //    } else {
 //      alert('error finding data')
 //    }
 //  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);
  // //////////////////////////////////////////////////////////

  const addTodoItem = () => {
    // The empty input and only spaces as input are not allowed!
    if (input.trim() === "") return

    const item = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false
    }
    setTodoList((prev) => [...prev, item])
    setInput('')
  }

  const togleTask = (id) => {
    setTodoList(todoList.map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed
        }
      } else {
        return t
      }
    }))
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((t) => t.id !== id))
  }



  return (
    <>
      <div className='header'>
        <input
          type="text"
          placeholder='Enter todo'
          className='input border-2 border-black'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='button' onClick={() => addTodoItem()}>Add</button>
      </div>

      <div className='flex justify-center mt-5'>
        <ul className='space-y-3'>
          {
            todoList.map(t =>
              <li key={t.id}>
                <input type="checkbox" checked={t.completed} onChange={() => togleTask(t.id)} />
                <span className={t.completed ? 'strick-through' : ''}>{t.text}</span>
                <button className='bg-red-500 text-white px-3 py-1 rounded' onClick={() => deleteTodo(t.id)}>Delete</button>
              </li>)
          }
        </ul>
      </div>
    </>
  )
}
export default App
