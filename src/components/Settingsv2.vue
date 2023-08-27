<script lang="ts">
import { useSettingsV2Store } from '@/stores/settingsv2';
import { defineComponent } from 'vue';

import InputField from './InputField.vue';

export default defineComponent({
	props: {},
	setup() {
		return {
			settings: useSettingsV2Store(),
		};
	},
	methods: {},
	computed: {},
	components: { InputField },
});
</script>

<template>
	<div class="settings">
		<h2>Generelle indstillinger V2:</h2>
		<div class="personal-details details">
			<InputField
				type="string"
				v-model="settings.name"
				label="Navn"
			></InputField>
			<InputField
				type="string"
				v-model="settings.carRegNumber"
				label="Bil registrerings nummer"
			></InputField>
			<InputField
				type="string"
				v-model="settings.salaryNumber"
				label="Løn nummer"
			></InputField>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../assets/mixins.scss' as m;

.settings {
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.details {
		padding: 0 var(--general-x-padding) 0 3rem;
		width: calc(100% - 4rem);
	}

	.personal-details {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		@include m.tablet {
			flex-flow: row wrap;
		}
	}
}
</style>
