<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import TimeChooser from "./components/TimeChooser.vue";

const selectedDate = ref<Date>(new Date());
const selectedTimeInfo = ref<string | null>(null);

const onTimeSelected = (time: { start: Date; end: Date } | null) => {
  if (time) {
    selectedTimeInfo.value = `${format(time.start, "d MMMM yyyy", {
      locale: ru,
    })}, 
    ${format(time.start, "HH:mm")} - ${format(time.end, "HH:mm")}`;
  } else {
    selectedTimeInfo.value = null;
  }
};
</script>

<template>
  <div class="app">
    <h1>Запись на услугу</h1>
    <TimeChooser
      :service_id="1"
      :employee_id="2"
      :date="selectedDate"
      @update:selected-time="onTimeSelected"
    />
    <div v-if="selectedTimeInfo" class="selected-info">
      <h3>Выбранное время:</h3>
      <p>{{ selectedTimeInfo }}</p>
    </div>
  </div>
</template>

<style>
:root {
  --tg-theme-bg-color: #fff;
  --tg-theme-secondary-bg-color: #f3f2f8;
  --tg-theme-text-color: #111;
  --tg-theme-button-color: #59b7ff;
  --tg-theme-header-bg-color: #def1fd;
  --tg-theme-hint-color: #777;
}

/* Темная тема - будет активирована при соответствующих настройках в Telegram */
@media (prefers-color-scheme: dark) {
  :root {
    --tg-theme-bg-color: #18222d;
    --tg-theme-secondary-bg-color: #232e3c;
    --tg-theme-text-color: #fff;
    --tg-theme-button-color: #2aabee;
    --tg-theme-header-bg-color: #192734;
    --tg-theme-hint-color: #a8a8a8;
  }
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 24px;
}

.selected-info {
  margin-top: 24px;
  padding: 16px;
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 8px;
}

.selected-info h3 {
  margin-top: 0;
  color: var(--tg-theme-text-color);
}

.selected-info p {
  color: var(--tg-theme-button-color);
  font-weight: 500;
}
</style>
