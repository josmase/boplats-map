<script setup lang="ts">
import useApartmentApi from './api/useApartmentApi';
import ApartmentForm from './ApartmentForm.vue';
import ApartmentMap from './ApartmentMap.vue';
import type { GetApartmentRequest } from './api/requests';
import type { ApartmentDto } from './api/responses';

const { responseData, error, fetchData } = useApartmentApi();

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
.container {
  height: 100vh;
  display: flex;
  flex-flow: column;
}

.map {
  flex-grow: 1;
  width: 100%;
}
</style>

<template>
  <div class="container">
    <div v-if="responseData" class="map">
      <ApartmentMap :apartments="placeableApartments(responseData)" />
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div class="filter">
      <ApartmentForm @submit="handleFormSubmit" />
    </div>
  </div>
</template>
