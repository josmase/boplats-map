<template>
  <div class="apartment-card">
    <div class="image-container">
      <img
        v-if="apartment.imageUrls.length > 0"
        :src="apartment.imageUrls[0]"
        alt="Apartment Image"
      />
      <div v-else class="no-image-placeholder">No Image Available</div>
    </div>

    <div class="details-container">
      <h2>{{ apartment.areaName }} - {{ apartment.address }}</h2>
      <p v-if="apartment.roomCount">
        <span class="label">Rooms:</span> {{ apartment.roomCount }}
      </p>
      <p v-if="apartment.publishedAt">
        <span class="label">Published At:</span>
        {{ formatDate(apartment.publishedAt) }}
      </p>
      <p v-if="apartment.price">
        <span class="label">Price:</span> {{ apartment.price.amount }}
        {{ apartment.price.currency }}
      </p>
      <p>
        <span class="label">Size:</span> {{ apartment.size.amount }}
        {{ apartment.size.unit }}
      </p>
      <p v-if="apartment.floor">
        <span class="label">Floor:</span> {{ apartment.floor.actual }}/{{
          apartment.floor.total || 'N/A'
        }}
      </p>
      <p>
        <a :href="apartment.link" target="_blank">View at boplats</a>
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
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}

.image-container {
  width: 100%;
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
  padding: 20px 10px;
}

.details-container h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: initial;
}

.details-container p {
  margin: initial;
}

.details-container .label {
  font-weight: bold;
}
</style>
