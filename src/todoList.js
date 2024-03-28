import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './todoList.module.css';
// import List from './Component/List';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [count,setCount] = useState(0);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
    //console.log(todos);
    }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data.filter(todo=>todo.userId === 1));
      setCount(response.data.filter(todo=>todo.userId === 1).length+1);
           
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        userId : count,
        title: newTodo,
        id : count,
        completed: false
      });
      
      setTodos([{userId:1,title: newTodo, id:count,completed: false},...todos]);
      setCount(count+1);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      console.log(id);

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = async (id)=>{
    try{
      console.log(id);

      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        id : id,
        completed : !todos.find((todo)=>todo.id === id).completed
      });

      console.log("toggle the task :",id);
      setTodos(
      todos.map(todo => {
        if(todo.id === id){
          console.log(todo);
          todo.completed = !todo.completed;          
        }
        return todo;
      }));
    }catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        placeholder="Add Todo" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button onClick={addTodo}>Add</button>
      <div className={styles.container}>
        <ul>
          {todos.map((todo,index) => (
            <li className={styles.item} key={todo.id}>
              <span className={styles.content}>{todo.title}</span>
              <span className={todo.completed ? styles.completed:styles.pending}>{todo.completed ? 'Completed': 'Pending'}</span>
            
              <button className="btn btn-warning"
              onClick={()=>{toggleTodo(todo.id)}}
              >Toggle</button>
              <button className="btn btn-warning"
              onClick={()=>{deleteTodo(todo.id)}}
              >delete</button>         
              </li>          
          ))}
        </ul>
    </div>
    </div>
  );
};

export default TodoList;