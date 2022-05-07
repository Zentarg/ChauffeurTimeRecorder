import type { Crossing } from './Crossing';
import type { DestinationData } from './DestinationData';

export class DrivingReport {
	id: number;
	name!: string;
	carRegNumber!: string;
	date: string;
	fullDate: Date;
	salaryNumber!: string;
	maxDataCount!: number;
	destinationData: DestinationData[];
	crossings: { [key: string]: Crossing };
	additionalDetails: string;
	endTime!: string;
	endKmCount!: number;

	constructor(_id: number, _maxDataCount: number) {
		this.id = _id;
		this.date = new Date().toISOString().split('T')[0];
		this.fullDate = new Date(this.date);
		this.maxDataCount = _maxDataCount;
		this.destinationData = [];
		this.crossings = {};
		this.additionalDetails = '';
	}

	get dateString(): string {
		return this.date;
	}

	set dateString(value: string) {
		this.date = value;
		this.fullDate = new Date(value);
	}
}
