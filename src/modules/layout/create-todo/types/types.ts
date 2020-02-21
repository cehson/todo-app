export default interface Todo {
	id: string;
	creatorID: string;
	content: string;
	scheduledTime: number;
	todoStatus: boolean;
	authorFirstName: string;
	authorLastName: string;
	createTodo(
		param:
			{ scheduledTime: number; authorLastName: string; authorFirstName: string; creatorID: string; finished: boolean; content: string },
		isLogedIn: string): void;
}
