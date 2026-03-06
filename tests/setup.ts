import { beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

beforeEach(() => {
  // Очистка DOM после каждого теста
  document.body.innerHTML = ''
  document.head.innerHTML = ''
})