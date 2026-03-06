<template>
  <div>
    <h2>Numeric values</h2>

    <table style="width: 100%">
      <thead>
        <tr>
          <th v-for="(header, index) in ['Название', 'Значение']" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in numericValues" :key="item.key">
          <td>
            <b>{{ item.key }}</b>
          </td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { NumericItemType } from '../types/Items';

interface Props {
  numericValues: NumericItemType[];
}

defineProps<Props>();
</script>
