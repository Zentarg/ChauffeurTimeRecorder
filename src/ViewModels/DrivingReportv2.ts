import type { DestinationDatav2 } from './DestinationDatav2';

export class DrivingReportV2 {
	id: number;
	reportNumber!: number;
	name!: string;
	carRegNumber!: string;
	date: string;
	fullDate: Date;
	salaryNumber!: string;
	maxDataCount!: number;
	destinationData: DestinationDatav2[];
	endTime!: string;

	constructor(_id: number, _maxDataCount: number) {
		this.id = _id;
		this.date = new Date().toISOString().split('T')[0];
		this.fullDate = new Date(this.date);
		this.maxDataCount = _maxDataCount;
		this.destinationData = [];
	}
}
