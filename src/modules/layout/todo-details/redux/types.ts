export default interface Todo {
	creatorID: string;
	content: string;
	scheduledTime: number;
	finished: boolean;
	authorFirstName: string;
	authorLastName: string;
}
