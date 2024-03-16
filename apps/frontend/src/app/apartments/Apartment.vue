<template>
  <div class="apartment-card">
    <!-- Apartment Image -->
    <div class="image-container">
      <img
        v-if="apartment.imageUrls.length > 0"
        :src="apartment.imageUrls[0]"
        alt="Apartment Image"
      />
      <div v-else class="no-image-placeholder">No Image Available</div>
    </div>

    <!-- Apartment Details -->
    <div class="details-container">
      <h2>{{ apartment.areaName }}</h2>
      <p>{{ apartment.address }}</p>
      <p v-if="apartment.roomCount">Rooms: {{ apartment.roomCount }}</p>
      <p v-if="apartment.publishedAt">
        Published At:
        {{ formatDate(apartment.publishedAt) }}
      </p>
      <p v-if="apartment.price">
        Price: {{ apartment.price.amount }} {{ apartment.price.currency }}
      </p>
      <p>Size: {{ apartment.size.amount }} {{ apartment.size.unit }}</p>
      <p v-if="apartment.floor">
        Floor: {{ apartment.floor.actual }}/{{ apartment.floor.total || 'N/A' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { ApartmentDto } from './api/responses';

const props = defineProps<{ apartment: ApartmentDto }>();

// Method to format date
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<style scoped>
.apartment-card {
  display: flex;
  flex-flow: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.image-container {
  width: 100¤;
  height: 150px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
}

.no-image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}

.details-container {
  padding: 20px;
}

.details-container h2 {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>
