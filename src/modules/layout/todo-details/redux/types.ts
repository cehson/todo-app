export default interface Todo {
	id: string;
	creatorID: string;
	content: string;
	scheduledTime: number;
	todoStatus: boolean;
	authorFirstName: string;
	authorLastName: string;
	history: {};
	todo?: {
		finished: boolean,
		authorFirstName: string,
		authorLastName: string,
		content: string,
		scheduledTime: number
	};
	deleteTodo: (id: string, creatorId: string, history: any) => {};
	finishTodo: (id: string, todoStatus: boolean, creatorID: string) => {};
}
