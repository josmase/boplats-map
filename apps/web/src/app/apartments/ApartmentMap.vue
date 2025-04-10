<template>
  <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
      name="© OpenStreetMap contributors" attribution="© OpenStreetMap contributors"
      className='map-tiles'></l-tile-layer>
    <l-marker v-for="apartment in apartments" :lat-lng="toLatLng(apartment)">
      <l-popup>
        <Apartment :apartment></Apartment>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import type { ApartmentDto } from './api/responses';
import type { LatLngExpression, PointExpression } from 'leaflet';
import Apartment from './Apartment.vue';
import "leaflet/dist/leaflet.css";

const gothenburg: PointExpression = [57.6601183, 11.988888];

const zoom = ref(10);
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
  height: 100%;
}
</style>
