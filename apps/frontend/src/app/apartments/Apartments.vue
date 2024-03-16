<script setup lang="ts">
import { onMounted } from 'vue';
import useApartmentApi from './api/useApartmentApi';
import ApartmentForm from './ApartmentForm.vue';
import type { GetApartmentRequest } from '@boplats-map/api-schema';

const { responseData, error, fetchData } = useApartmentApi();
onMounted(() => fetchData({}));

const handleFormSubmit = (formData: GetApartmentRequest) => {
  fetchData(formData);
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>

<template>
  <div class="wrapper">
    <ApartmentForm @submit="handleFormSubmit" />

    <div v-if="responseData">
      <p>{{ responseData }}</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
