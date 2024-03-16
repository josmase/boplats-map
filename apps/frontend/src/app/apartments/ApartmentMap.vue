<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    v-model:center="center"
    :useGlobalLeaflet="false"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="© OpenStreetMap contributors"
      attribution="© OpenStreetMap contributors"
    ></l-tile-layer>
    <l-marker
      v-for="apartment in apartments"
      :lat-lng="toLatLng(apartment)"
    ></l-marker>
  </l-map>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import type { ApartmentDto } from './api/responses';
import type { LatLngExpression, PointExpression } from 'leaflet';

const gothenburg: PointExpression = [57.7089, 11.9746];

const zoom = ref(6);
const center = ref(gothenburg);

defineProps<{ apartments: ApartmentDto[] }>();

function toLatLng(apartment: ApartmentDto): LatLngExpression {
  const coordinates = apartment.location.geometry.coordinates;
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}
</script>

<style scoped>
.map-container {
  height: 400px;
}
</style>
