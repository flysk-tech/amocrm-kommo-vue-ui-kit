<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
    <h2>Text Component Test</h2>

    <section>
      <h3>Размеры (Sizes)</h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <Text size="s" :theme="TextPrimaryTheme">Размер S (11/15): Маленький текст</Text>
        <Text size="m" :theme="TextPrimaryTheme">Размер M (13/20): Средний текст</Text>
        <Text size="ms" :theme="TextPrimaryTheme">Размер MS (13/15): Средний сжатый текст</Text>
        <Text size="l" :theme="TextPrimaryTheme">Размер L (15/20): Большой текст</Text>
        <Text size="xl" :theme="TextPrimaryTheme">Размер XL (18/24): Очень большой текст</Text>
      </div>
    </section>

    <section>
      <h3>Темы (Themes)</h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <Text size="l" :theme="TextPrimaryTheme">Primary Theme</Text>
        <Text size="l" :theme="TextSecondaryLightTheme">Secondary Light Theme</Text>
        <Text size="l" :theme="TextSecondaryDarkTheme">Secondary Dark Theme</Text>
        <Text size="l" :theme="TextErrorTheme">Error Theme</Text>
      </div>
    </section>

    <section>
      <h3>Эллипсис (Ellipsis)</h3>
      <div style="width: 200px; border: 1px solid #ccc; padding: 8px;">
        <Text size="m" :theme="TextPrimaryTheme" :isEllipsis="true">
          Очень длинный текст, который должен быть обрезан многоточием при переполнении контейнера
        </Text>
      </div>
    </section>

    <section>
      <h3>Многострочный текст (Multi-line)</h3>
      <div style="width: 250px; border: 1px solid #ccc; padding: 8px;">
        <Text size="m" :theme="TextPrimaryTheme" :maxRows="3">
          Длинный текст, который будет отображаться в несколько строк.
          Текст будет обрезан после указанного количества строк с помощью CSS line-clamp.
          Этот текст достаточно длинный, чтобы продемонстрировать работу многострочного обрезания.
          Дополнительные строки будут скрыты.
        </Text>
      </div>
    </section>

    <section>
      <h3>Без темы (Default CSS Variables)</h3>
      <Text size="l">Текст без указанной темы - использует дефолтные CSS переменные</Text>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Text, TextPrimaryTheme, TextSecondaryLightTheme, TextSecondaryDarkTheme, TextErrorTheme } from '../src/components'
</script>