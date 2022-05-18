
import React, { PureComponent } from 'react';
import './App.css';
import './css/todo.css';
import Header from './components/Header';
import Todolist from './components/Todolist';
import Footer from './components/Footer';


const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)
const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id)
    default:
      return todos;
  }
}



class App extends PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'Todo1',
      isCompleted: true,
    }, {
      id: 2,
      text: 'Todo2',
      isCompleted: false,
    }],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
  }
  //khi mơi vao App se bat dau chạy componentWillmount chạy trước render
  componentWillUnmount() {
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todosList)
    })
  }


  addTodo = (todo = {}) => {
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  getTodoEditingId = (id = '') => {
    this.setState({ todoEditingId: id })
  }

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todosList: list } = this.state
      list.splice(index, 1, todo)
      this.setState({
        todosList: list,
        todoEditingId: ''
      })
    }
  }

  markCompleted = (id = '') => {
    const { todosList } = this.state
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo)
    this.setState(preState => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)

    }))
  }

  checkAlltodos = () => {
    const { todosList, isCheckedAll } = this.state
    this.setState(preState => ({
      todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })),
      isCheckedAll: !preState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'ACTIVE')
    })
  }

  removeTodo = (id = '') => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'REMOVE', id)
    })
  }
  render() {

    const { todosList, todoEditingId, isCheckedAll, status } = this.state

    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodo}
          isCheckedAll={isCheckedAll}
        />
        <Todolist
          todosList={filterByStatus(todosList, status)}
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={todoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAlltodos={this.checkAlltodos}
          removeTodo={this.removeTodo}
        />
        <Footer
          setStatusFilter={this.setStatusFilter}
          status={status}
          clearCompleted={this.clearCompleted}
          numOfTodos={todosList.length}
          numOfTodoLeft={filterByStatus(todosList, 'ACTIVE').length}
        />

      </div>
    );
  }

}

export default App;
