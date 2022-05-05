export class DestinationData {
	id: number;
	tripNumber!: number;
	destination!: string;
	startTime!: string;
	endTime!: string;
	kmCount!: number;
	trailerNumber!: string;
	linkTrailer!: string;

	constructor(_id: number) {
		this.id = _id;
	}
}
