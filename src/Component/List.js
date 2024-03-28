
import styles from "./List.module.css";

function List({todos,  deleteTodo, toggleTodo}) {

  // const todos= store.getState().todos;

  return (
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
  );
}

export default List;