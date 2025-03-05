<template>
  <div class="time-chooser">
    <button class="select-time-button" @click="openModal">
      {{ selectedTime ? formatSelectedTime(selectedTime) : "Выбрать время" }}
    </button>

    <Teleport to="body">
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Выберите время</h3>
            <button class="close-button" @click="closeModal">×</button>
          </div>

          <div v-if="loading" class="loading">
            Загрузка доступного времени...
          </div>

          <div v-else-if="error" class="error">
            {{ error }}
          </div>

          <div v-else class="time-slots">
            <button
              v-for="slot in timeSlots"
              :key="`${slot.start_at}-${slot.finish_at}`"
              class="time-slot"
              :class="{
                unavailable: !slot.is_available,
                selected: isSelectedSlot(slot),
              }"
              :disabled="!slot.is_available"
              @click="selectTimeSlot(slot)"
            >
              {{ formatTimeSlot(slot) }}
            </button>
          </div>

          <div class="modal-footer">
            <button
              class="confirm-button"
              :disabled="!selectedTimeSlot"
              @click="confirmSelection"
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { fetchTimeSlots } from "../api/slots";
import type { TimeSlot, TimeChooserProps } from "../types";

const props = defineProps<TimeChooserProps>();

const emits = defineEmits<{
  (e: "update:selected-time", time: { start: Date; end: Date } | null): void;
}>();

const isModalOpen = ref<boolean>(false);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const timeSlots = ref<TimeSlot[]>([]);
const selectedTimeSlot = ref<TimeSlot | null>(null);
const selectedTime = ref<{ start: Date; end: Date } | null>(null);

const openModal = async (): Promise<void> => {
  isModalOpen.value = true;
  await loadTimeSlots();
};

const closeModal = (): void => {
  isModalOpen.value = false;
};

const loadTimeSlots = async (): Promise<void> => {
  loading.value = true;
  error.value = null;

  try {
    timeSlots.value = await fetchTimeSlots(
      props.service_id,
      props.employee_id,
      props.date,
    );
  } catch (err) {
    error.value = "Не удалось загрузить доступное время";
    console.error("Error loading time slots:", err);
  } finally {
    loading.value = false;
  }
};

const formatTimeSlot = (slot: TimeSlot): string => {
  const startTime = parseISO(slot.start_at);
  return format(startTime, "HH:mm");
};

const formatSelectedTime = (time: { start: Date; end: Date }): string => {
  return `${format(time.start, "d MMMM", { locale: ru })}, ${format(
    time.start,
    "HH:mm",
  )} - ${format(time.end, "HH:mm")}`;
};

const selectTimeSlot = (slot: TimeSlot): void => {
  selectedTimeSlot.value = slot;
};

const isSelectedSlot = (slot: TimeSlot): boolean => {
  return selectedTimeSlot.value
    ? selectedTimeSlot.value.start_at === slot.start_at
    : false;
};

const confirmSelection = (): void => {
  if (selectedTimeSlot.value) {
    selectedTime.value = {
      start: parseISO(selectedTimeSlot.value.start_at),
      end: parseISO(selectedTimeSlot.value.finish_at),
    };

    emits("update:selected-time", selectedTime.value);
    closeModal();
  }
};

watch(
  () => props.date,
  () => {
    if (isModalOpen.value) {
      loadTimeSlots();
    }
  },
);
</script>

<style scoped>
.time-chooser {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  max-width: 100%;
}

.select-time-button {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--tg-theme-secondary-bg-color, #f3f2f8);
  color: var(--tg-theme-text-color, #111);
  border: none;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-time-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 400px;
  max-height: 90vh;
  background-color: var(--tg-theme-bg-color, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--tg-theme-header-bg-color, #def1fd);
  color: var(--tg-theme-text-color, #111);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--tg-theme-text-color, #111);
  cursor: pointer;
  padding: 0 8px;
}

.time-slots {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow-y: auto;
  max-height: 60vh;
}

.time-slot {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: var(--tg-theme-secondary-bg-color, #f3f2f8);
  color: var(--tg-theme-text-color, #111);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.time-slot.unavailable {
  color: var(--tg-theme-hint-color, #777);
  cursor: not-allowed;
  opacity: 0.7;
}

.time-slot.selected {
  background-color: var(--tg-theme-button-color, #59b7ff);
  color: #fff;
}

.time-slot:not(.unavailable):hover {
  opacity: 0.9;
}

.modal-footer {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.confirm-button {
  background-color: var(--tg-theme-button-color, #59b7ff);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.confirm-button:not(:disabled):hover {
  opacity: 0.9;
}

.loading,
.error {
  padding: 32px 16px;
  text-align: center;
  color: var(--tg-theme-hint-color, #777);
}

.error {
  color: #e53935;
}

@media (max-width: 480px) {
  .time-slots {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
