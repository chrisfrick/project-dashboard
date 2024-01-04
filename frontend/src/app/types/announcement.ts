import { BasicUser } from "./basic-user";

export default interface Announcement {
	id?: number;
	date: Date;
	title: string;
	message: string;
	author: BasicUser;
}