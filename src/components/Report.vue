<script lang="ts">
import { DrivingReport } from '@/Classes/DrivingReport';
import { DestinationData } from '@/Classes/DestinationData';
import { defineComponent, reactive, ReactiveEffect, ref } from 'vue';
import InputField from './InputField.vue';
import IconDelete from './icons/IconDelete.vue';
import { Crossing } from '@/Classes/Crossing';
import TextArea from './TextArea.vue';

export default defineComponent({
	props: {
		report: {
			type: DrivingReport,
			required: true,
			default: {},
		},
	},
	setup() {
		return {
			destinationDataIdCounter: 0,
		};
	},
	methods: {
		GetCurrentTime() {
			const coeff = 1000 * 60 * 5; // 5 minutes
			let date = new Date();
			let rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
			return rounded.toTimeString().split(' ')[0].substring(0, 5);
		},
		AddDestinationDataRow() {
			let data = new DestinationData(this.destinationDataIdCounter);
			data.startTime = this.GetCurrentTime();
			if (this.report.destinationData.length > 0) {
				let lastData =
					this.report.destinationData[
						this.report.destinationData.length - 1
					];
				data.tripNumber = lastData.tripNumber;
				data.trailerNumber = lastData.trailerNumber;

				if (lastData.endTime == undefined) {
					this.report.destinationData[
						this.report.destinationData.length - 1
					].endTime = data.startTime;
				}
			}

			this.report.destinationData.push(data);
			this.destinationDataIdCounter++;
		},
		DeleteDestinationDataRow(index: number) {
			this.report.destinationData.splice(index, 1);
		},
		StartDestination() {
			if (this.CanAddMoreRows) this.AddDestinationDataRow();
		},
		EndDestination() {
			if (this.report.destinationData.length > 0) {
				this.report.destinationData[
					this.report.destinationData.length - 1
				].endTime = this.GetCurrentTime();
			}
		},
		AddCrossing(crossing: String, type: String) {
			this.report.crossings[crossing][type]++;
		},
		RemoveCrossing(crossing: String, type: String) {
			this.report.crossings[crossing][type]--;
		},
	},
	computed: {
		CanAddMoreRows() {
			if (!this.report) return false;
			if (!this.report.destinationData) return false;
			return (
				this.report.destinationData.length < this.report.maxDataCount
			);
		},
		LastRowEnded() {
			if (!this.report) return true;
			if (!this.report.destinationData) return true;
			if (this.report.destinationData.length > 0)
				return (
					this.report.destinationData[
						this.report.destinationData.length - 1
					].endTime != undefined
				);
			return true;
		},
	},
	components: { InputField, IconDelete, TextArea },
	mounted() {
		this.AddDestinationDataRow();
	},
});
</script>

<template>
	<div class="report">
		<div class="report-general details">
			<h2>Generelle oplysninger</h2>
			<div class="inputs">
				<InputField
					type="number"
					v-model="report.id"
					label="Rapport nummer"
					pattern="[0-9]+"
				></InputField>
			</div>
		</div>
		<div class="personal-details details">
			<h2>Personlige oplysninger</h2>
			<div class="inputs">
				<InputField
					type="text"
					v-model="report.name"
					label="Navn"
				></InputField>
				<InputField
					type="number"
					v-model="report.carRegNumber"
					label="Bil registerings nummer"
				></InputField>
				<InputField
					type="date"
					v-model="report.dateString"
					label="Dato"
					:required="true"
				></InputField>
				<InputField
					type="string"
					v-model="report.salaryNumber"
					label="Løn nummer"
				></InputField>
			</div>
		</div>
		<div class="main-details details">
			<h2>Kørsel oplysninger</h2>
			<div class="data-list">
				<div
					class="data-list-row"
					v-for="(data, index) in report.destinationData"
					:key="data.id"
				>
					<IconDelete
						class="delete"
						@click="DeleteDestinationDataRow(index)"
					></IconDelete>
					<div class="inputs">
						<InputField
							type="number"
							v-model="data.tripNumber"
							label="Tur nummer"
						></InputField>
						<InputField
							type="text"
							v-model="data.destination"
							label="Destination"
						></InputField>
						<InputField
							type="text"
							v-model="data.startTime"
							label="Start kl."
						></InputField>
						<InputField
							type="text"
							v-model="data.endTime"
							label="Slut kl."
						></InputField>
						<InputField
							type="number"
							v-model="data.kmCount"
							label="Km-tæller"
						></InputField>
						<InputField
							type="text"
							v-model="data.trailerNumber"
							label="Trailer nummer"
						></InputField>
					</div>
				</div>
			</div>
			<div class="buttons">
				<div
					class="btn start-btn"
					:class="{ disabled: !CanAddMoreRows }"
					@click="StartDestination"
				>
					Start destination
				</div>
				<div
					class="btn end-btn"
					:class="{ disabled: LastRowEnded }"
					@click="EndDestination"
				>
					Slut destination
				</div>
			</div>
		</div>
		<div class="crossings details">
			<h2>Overfarter</h2>
			<p>
				Tryk på knappen nedenfor for hver gang du tager en overfart (Som
				solo, med trailer, eller med modul)
			</p>
			<div
				class="crossing"
				v-for="(crossing, key) in report.crossings"
				:class="key"
			>
				<legend>
					{{
						key.toString().charAt(0).toUpperCase() +
						key.toString().slice(1)
					}}
				</legend>
				<div
					class="crossing-input-container"
					v-for="(crossingType, crossingTypeKey) in crossing"
				>
					<InputField
						type="number"
						v-model="report.crossings[key][crossingTypeKey]"
						:label="crossingTypeKey"
					></InputField>
					<div class="crossing-btn-container">
						<div
							class="btn"
							@click="AddCrossing(key, crossingTypeKey)"
						>
							+1
						</div>
						<div
							class="btn"
							@click="RemoveCrossing(key, crossingTypeKey)"
						>
							-1
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="extra-details details">
			<h2>Øvrige bemærkninger</h2>
			<TextArea
				class="text-area"
				:max-chars="255"
				v-model="report.additionalDetails"
			></TextArea>
		</div>
	</div>
</template>

<style scoped lang="scss">
.report {
	display: flex;
	gap: 1.5rem;
	flex-direction: column;
	align-items: baseline;
	.details {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: baseline;
		color: var(--color-heading);
	}

	.buttons {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.report-general {
		.inputs {
			display: flex;
			flex-flow: row wrap;
			gap: 2rem;
			padding-left: 3rem;
		}
	}
	.personal-details {
		.inputs {
			display: flex;
			flex-flow: row wrap;
			gap: 2rem;
			padding-left: 3rem;
		}
	}

	.data-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		.data-list-row {
			display: flex;
			flex: row;
			gap: 1rem;
			padding-bottom: 1rem;
			border-bottom: 2px solid var(--color-border);

			.delete {
				flex: 1 0 2rem;
				width: 2rem !important;
				height: 2rem !important;
				cursor: pointer;
				top: 0.1rem;
				color: var(--color-text);
				&:hover {
					color: var(--color-text-hover);
				}
			}

			.inputs {
				display: flex;
				flex-flow: row wrap;
				gap: 2rem;
			}
		}
	}

	.crossings {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.crossing {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
			legend {
				width: 9ch;
			}
			border-bottom: 2px solid var(--color-border);
			padding: 1rem 0;

			.crossing-input-container {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				.input-container {
					min-width: 150px;
					width: 150px;
				}
				.crossing-btn-container {
					display: flex;
					width: 100%;
					gap: 0.5rem;

					.btn {
						flex: 1 1 50%;
						text-align: center;
					}
				}
			}
		}
	}

	.extra-details {
		.text-area {
			max-width: calc(100vw - 7rem);
			min-width: 400px;
			height: 10em;
		}
	}
}
</style>
