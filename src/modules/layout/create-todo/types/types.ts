export default interface Todo {
	createTodo(
		param:
			{ scheduledTime: number; authorLastName: string; authorFirstName: string; creatorID: string; finished: boolean; content: string },
		isLogedIn: string): void;
}
