//Fetch existing todos
const fetchTodos = function () {
    let JSONtodos = localStorage.getItem("todos")

    if (JSONtodos !== null) {
        return JSON.parse(JSONtodos)
    } else {
        return []
    }
}

//Save todos to local storage
const saveTodos = function (listTodos) {
    localStorage.setItem("todos", JSON.stringify(listTodos))
}

//remove todo with button
const removeTodo = function (id) {
    const todoIndex = todo.findIndex(function (element, index) {
        return element.id = id
    })

    if (todoIndex > -1) {
        todo.splice(todoIndex, 1)
    } 
}

// const toggleTodos = function (id) {
//     const findTodo = todo.find(function (element) {
//         return element.id = id
//     })
//     findTodo.completed = true
// }

//generate dom for the todos
const generateDom = function (listOfTodos) {
    listOfTodos.forEach(function (element) {
        const container = document.createElement("div")
        const button = document.createElement("button")
        button.textContent = "x"
        const newTask = document.createElement("span")
        const check = document.createElement("input")
       
        check.setAttribute("type", "checkbox")
        check.checked = element.completed

        check.addEventListener("change", function (e) {
            const toggleTodos = function (id) {
                const findTodo = todo.find(function (element) {
                    return element.id === id
                })
                findTodo.completed = e.target.checked
            }  
            
            toggleTodos(element.id)
            saveTodos(todo)
            filterTodos(todo, filter)
        })

        button.addEventListener("click", function (e) {
            removeTodo(element.id)
            saveTodos(todo)
            filterTodos(todo, filter)
        })

        newTask.textContent = element.text
        document.querySelector("#todo-list").appendChild(container)
        container.appendChild(check)
        container.appendChild(newTask)
        container.appendChild(button)
    }) 
}

//generate todo summary
const generateTodoSummary = function (tasksRemaining) {
    let summary = document.createElement("h2")
    summary.textContent = `You have ${tasksRemaining.length} tasks remaining` 
    document.querySelector("#todo-list").appendChild(summary)
}

//Render todos based on filters
const filterTodos = function (list, filter) {
    let newTodos = list.filter(function (element) {
        const searchTextMatch = element.text.toLowerCase().includes(filter.searchtodos.toLowerCase())
        const hideCompletedMatch = !filter.hideCompleted || !element.completed
        return searchTextMatch && hideCompletedMatch
    })
    
    //array of incomplete tasks
    const tasksRemaining =  newTodos.filter(function (tasks) {
        return !tasks.completed
    })

    document.querySelector("#todo-list").innerHTML = ""

    //Summary of tasks left
    generateTodoSummary(tasksRemaining)

    //rendering the new todos
    generateDom(newTodos)
}