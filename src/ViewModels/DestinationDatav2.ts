export class DestinationDatav2 {
	id: number;
	route!: string;
	date!: Date;
	startTime!: string;
	endTime!: string;
	kmCount!: number;
	workType!: string;

	constructor(_id: number) {
		this.id = _id;
	}
}
