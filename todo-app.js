const todo = fetchTodos()

const filter = {
    searchtodos: "",
    hideCompleted: false
}

filterTodos(todo, filter)

//Changing the filter
document.querySelector("#search-todos").addEventListener("input", function (e) {
    filter.searchtodos = e.target.value
    filterTodos(todo, filter)
})

//Add new todo
document.querySelector("#new-todo").addEventListener("submit", function (e) {
    e.preventDefault()
    newTask = {
        id: uuidv4(),
        text: e.target.elements.nextTodo.value,
        completed: false
    }
    todo.push(newTask)
    
    saveTodos(todo)

    e.target.elements.nextTodo.value = ""

    filterTodos(todo, filter)
})

//hide completed 
document.querySelector("#hide-completed").addEventListener("change", function (e) {
    filter.hideCompleted = e.target.checked
    filterTodos(todo, filter)
})
