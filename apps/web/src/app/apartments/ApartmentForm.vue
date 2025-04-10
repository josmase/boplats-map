<template>
  <form @submit.prevent="submitForm" @change="submitForm" class="apartment-form">
    <div class="form-group">
      <h3>Rooms</h3>
      <div class="select-container">
        <select id="roomsMin" v-model="formData.roomsMin">
          <option :value="undefined">Min</option>
          <option v-for="option in roomOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>

        <select id="roomsMax" v-model="formData.roomsMax">
          <option :value="undefined">Max</option>
          <option v-for="option in roomOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <h3>Rent</h3>
      <div class="select-container">
        <select id="rentMin" v-model="formData.rentMin">
          <option :value="undefined">Min</option>
          <option v-for="option in rentOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>

        <select id="rentMax" v-model="formData.rentMax">
          <option :value="undefined">Max</option>
          <option v-for="option in rentOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <h3>Size</h3>
      <div class="select-container">
        <select id="sizeMin" v-model="formData.sizeMin">
          <option :value="undefined">Min</option>
          <option v-for="option in sizeOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>

        <select id="sizeMax" v-model="formData.sizeMax">
          <option :value="undefined">Max</option>
          <option v-for="option in sizeOptions" :value="option.value" :key="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { GetApartmentRequest } from './api/requests';

const roomOptions = generateOptions(1, 6, 1);
const rentOptions = generateOptions(2000, 20000, 1000);
const sizeOptions = generateOptions(20, 100, 10);

var daysAgo = new Date(); // today!
daysAgo.setDate(daysAgo.getDate() - 5);
const formData = ref<GetApartmentRequest>({
  dateStart: undefined,
  dateEnd: undefined,
  roomsMin: undefined,
  roomsMax: undefined,
  rentMin: undefined,
  rentMax: undefined,
  sizeMin: undefined,
  sizeMax: undefined,
  applicationState: 'open'
});

const emit = defineEmits<{
  (e: 'submit', data: GetApartmentRequest): void;
}>();

watch(formData, () => {
  submitForm();
});

submitForm();

function submitForm() {
  emit('submit', formData.value);
}

function generateOptions(min: number, max: number, step: number) {
  const options = [];
  for (let i = min; i <= max; i += step) {
    options.push({ value: i, label: `${i}` });
  }
  return options;
}
</script>

<style scoped>
.apartment-form {
  display: flex;
  margin: 0 auto;
}

.form-group {
  margin: 10px 10px 20px 10px;
  flex: 1 1 200px;
}

h3 {
  margin: 0;
  margin-bottom: 5px;
}

.select-container {
  display: flex;
}

select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select:first-child {
  margin-right: 5px;
}
</style>
