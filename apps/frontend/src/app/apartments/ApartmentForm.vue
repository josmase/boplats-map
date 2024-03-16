<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="dateStart">Date Start:</label>
      <input type="date" id="dateStart" v-model="formData.dateStart" />
    </div>
    <div>
      <label for="dateEnd">Date End:</label>
      <input type="date" id="dateEnd" v-model="formData.dateEnd" />
    </div>
    <div>
      <label for="roomsMin">Minimum Rooms:</label>
      <input type="number" id="roomsMin" v-model.number="formData.roomsMin" />
    </div>
    <div>
      <label for="roomsMax">Maximum Rooms:</label>
      <input type="number" id="roomsMax" v-model.number="formData.roomsMax" />
    </div>
    <div>
      <label for="rentMin">Minimum Rent:</label>
      <input type="number" id="rentMin" v-model.number="formData.rentMin" />
    </div>
    <div>
      <label for="rentMax">Maximum Rent:</label>
      <input type="number" id="rentMax" v-model.number="formData.rentMax" />
    </div>
    <div>
      <label for="sizeMin">Minimum Size:</label>
      <input type="number" id="sizeMin" v-model.number="formData.sizeMin" />
    </div>
    <div>
      <label for="sizeMax">Maximum Size:</label>
      <input type="number" id="sizeMax" v-model.number="formData.sizeMax" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import type { GetApartmentRequest } from '@boplats-map/api-schema';
import { ref } from 'vue';

const formData = ref<GetApartmentRequest>({
  dateStart: undefined,
  dateEnd: undefined,
  roomsMin: undefined,
  roomsMax: undefined,
  rentMin: undefined,
  rentMax: undefined,
  sizeMin: undefined,
  sizeMax: undefined,
});

const submitForm = () => {
  emit('submit', formData.value);
};

const emit = defineEmits<{
  (e: 'submit', data: GetApartmentRequest): void;
}>();
</script>

<style scoped></style>
