import { DrivingReport } from '../ViewModels/DrivingReport';
import { defineStore } from 'pinia';
import { Crossing } from '@/ViewModels/Crossing';
import { DrivingReportV2 } from '@/ViewModels/DrivingReportv2';

export const useDataV2Store = defineStore({
	id: 'datav2',
	state: () => ({
		reports: [] as DrivingReportV2[],
		selectedReport: undefined as unknown as DrivingReportV2,
		newReportId: 1,
	}),
	getters: {
		reportCount: (state) => state.reports.length,
	},
	actions: {
		AddReport() {
			let newReport = new DrivingReportV2(this.newReportId, 15);
			const index = this.reports.push(newReport) - 1;
			this.newReportId++;
			this.selectedReport = this.reports[index];
		},
		DeleteSelectedReport() {
			this.reports = this.reports.filter((x) => {
				return x.id != this.selectedReport.id;
			});
			this.selectedReport = this.reports[this.reports.length - 1];
		},
	},
});
