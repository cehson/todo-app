export default interface Todo {
	id: string;
	creatorID: string;
	content: string;
	scheduledTime: number;
	finished: boolean;
	authorFirstName: string;
	authorLastName: string;
}
