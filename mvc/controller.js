import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
	const state = new model.State();

	const addTodo = () => {
		const inputbox = document.querySelector(view.domstr.inputbox);
		inputbox.addEventListener('keyup', event => {
			if (event.code === 'Enter' && event.target.value.trim() !== '') {
				const newtodo = new model.Todo(event.target.value);

				model.addTodo(newtodo).then(todo => {
					state.todolist = [todo, ...state.todolist];
				});
				event.target.value = '';
			}
		});
	}

	const deleteTodo = () => {
		const container = document.querySelector(view.domstr.container);

		container.addEventListener('click', event => {
			if (event.target.className === 'deletebtn') {
				state.todolist = state.todolist.filter((todo) => {
					return +todo.id !== +event.target.id;
				});
				model.deleteTodo(event.target.id);
			}
		});
	}

	const completedTodo = () => {
		const item = document.querySelector(view.domstr.container);

		item.addEventListener('click', event => {
			if (event.target.tagName === 'SPAN') {
				const todoId = event.target.nextElementSibling.id;
				const todoIndex = state.todolist.findIndex(todo => +todo.id === +todoId);
				
				if (todoIndex !== -1) {
					state.todolist[todoIndex].completed = !state.todolist[todoIndex].completed;
					event.target.classList.toggle('completed');
					model.completedTodo(todoId, state.todolist[todoIndex]);
				}
			}
		});
	}




	const init = () => {
		model.getTodos().then(todos => {
			state.todolist = todos.reverse();
		});
	}

	const bootstrap = () => {
		init();
		deleteTodo();
		addTodo();
		completedTodo();
	}

	return { bootstrap };
})(Model, View);