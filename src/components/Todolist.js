import React, { memo } from 'react'
import Todo from './Todo';

const Todolist = memo(props => {
    const { todosList, isCheckedAll, checkAlltodos } = props
    return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                checked={isCheckedAll}
            />
            <label
                htmlFor="toggle-all"
                onClick={checkAlltodos}
            ></label>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => <Todo key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />)
                }
            </ul>
        </section>
    )
})

export default Todolist