# Vue Time Chooser

Простой компонент выбора времени на Vue 3

## О проекте

Компонент для выбора доступных временных слотов при записи на услуги.

## Установка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшн
npm run build
```

## Использование

```vue
<template>
  <TimeChooser
    :service_id="1"
    :employee_id="2"
    :date="выбранная_дата"
    @update:selected-time="обработчик;"
  />
</template>
```

Компонент принимает:

- `service_id` - ID услуги
- `employee_id` - ID сотрудника
- `date` - Дата, для которой нужно получить слоты

## API

По умолчанию используется заглушка API, но вы можете подключить свой сервер, изменив `src/api/slots.ts`.

## Кастомизация

CSS-переменные:

- `--tg-theme-bg-color`
- `--tg-theme-text-color`
- `--tg-theme-button-color`
- `--tg-theme-secondary-bg-color`
- и другие

Работает в обычном вебе с автоматическим переключением тем (светлая/тёмная).
