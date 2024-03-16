<script setup lang="ts">
import { onMounted } from 'vue';
import useApartmentApi from './api/useApartmentApi';
import ApartmentForm from './ApartmentForm.vue';
import ApartmentMap from './ApartmentMap.vue';
import type { GetApartmentRequest } from './api/requests';
import type { ApartmentDto } from './api/responses';

const { responseData, error, fetchData } = useApartmentApi();
onMounted(() => fetchData({}));

function handleFormSubmit(formData: GetApartmentRequest) {
  fetchData(formData);
}

function placeableApartments(apartments: ApartmentDto[]) {
  return apartments.filter(
    (apartment) => apartment.location?.geometry?.coordinates?.length > 0
  );
}
</script>

<style scoped>
.map {
  height: 100vh;
  width: 100%;
}
</style>

<template>
  <div>
    <ApartmentForm @submit="handleFormSubmit" />

    <div v-if="responseData" class="map">
      <ApartmentMap :apartments="placeableApartments(responseData)" />
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
