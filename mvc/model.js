import { Api } from "./api.js";
import { View } from "./view.js";

export const Model = ((api, view) => {
	class State {
		#todolist = [];

		get todolist() {
			return this.#todolist;
		}

		set todolist(newtodos) {
			this.#todolist = newtodos;

			const container = document.querySelector(view.domstr.container);
			const tmp = view.createTmp(this.#todolist);
			view.render(container, tmp);
		}
	}
	class Todo {
		constructor(title) {
			this.title = title;
			this.completed = false;
			this.userId = 8;
		}
	}

	const { getTodos, deleteTodo, addTodo, completedTodo } = api;

	return {
		getTodos,
		deleteTodo,
		addTodo,
		completedTodo,
		Todo,
		State
	}
})(Api, View);