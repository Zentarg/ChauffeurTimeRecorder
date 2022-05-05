import type { Crossing } from './Crossing';
import type { DestinationData } from './DestinationData';

export class DrivingReport {
	id: number;
	name!: string;
	carRegNumber!: string;
	date: Date;
	salaryNumber!: string;
	maxDataCount!: number;
	destinationData: DestinationData[];
	crossings: { [key: string]: Crossing };
	additionalDetails: string;
	endTime!: string;
	endKmCount!: number;

	private _dateString: string;

	constructor(_id: number, _maxDataCount: number) {
		this.id = _id;
		this.date = new Date();
		this.maxDataCount = _maxDataCount;
		this.destinationData = [];
		this._dateString = this.date.toISOString().split('T')[0];
		this.crossings = {};
		this.additionalDetails = '';
	}

	get dateString(): string {
		return this.date.toISOString().split('T')[0];
	}

	set dateString(value: string) {
		this._dateString = value;
		this.date = new Date(value);
	}
}
