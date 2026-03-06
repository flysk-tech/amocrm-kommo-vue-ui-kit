import { ref, computed, readonly } from 'vue'
import type { Ref } from 'vue'

// Тип для правила валидации
export type ValidationRule<T = any> = (value: T) => string | true

// Интерфейс для состояния валидации поля
export interface FieldValidation<T = any> {
  value: Ref<T>
  error: Ref<string | null>
  isValid: Ref<boolean>
  isDirty: Ref<boolean>
  validate: () => boolean
  clearError: () => void
  touch: () => void
}

// Композиционная функция для валидации одного поля
export function useFieldValidation<T>(
  initialValue: T,
  rules: ValidationRule<T>[] = []
): FieldValidation<T> {
  const value = ref<T>(initialValue) as Ref<T>
  const error = ref<string | null>(null)
  const isDirty = ref(false)

  const isValid = computed(() => error.value === null)

  const validate = (): boolean => {
    for (const rule of rules) {
      const result = rule(value.value)
      if (result !== true) {
        error.value = result
        return false
      }
    }
    error.value = null
    return true
  }

  const clearError = () => {
    error.value = null
  }

  const touch = () => {
    isDirty.value = true
  }

  return {
    value,
    error: readonly(error),
    isValid: readonly(isValid),
    isDirty: readonly(isDirty),
    validate,
    clearError,
    touch
  }
}

// Композиционная функция для валидации формы
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  rules: Partial<Record<keyof T, ValidationRule<T[keyof T]>[]>> = {}
) {
  const fields = {} as Record<keyof T, FieldValidation<T[keyof T]>>
  const errors = ref<Partial<Record<keyof T, string>>>({})

  // Создаем поля валидации для каждого значения
  Object.keys(initialValues).forEach(<K extends keyof T>(key: K) => {
    const fieldRules = rules[key] || []
    fields[key] = useFieldValidation(initialValues[key], fieldRules)
  })

  const isFormValid = computed(() => {
    return Object.values(fields).every(field => field.isValid.value)
  })

  const hasErrors = computed(() => {
    return Object.values(fields).some(field => field.error.value !== null)
  })

  const validateField = <K extends keyof T>(fieldName: K): boolean => {
    const field = fields[fieldName]
    if (!field) return true

    const isValid = field.validate()
    if (!isValid && field.error.value) {
      errors.value[fieldName] = field.error.value
    } else {
      delete errors.value[fieldName]
    }
    return isValid
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: Partial<Record<keyof T, string>> = {}

    Object.keys(fields).forEach(<K extends keyof T>(key: K) => {
      const fieldValid = validateField(key)
      if (!fieldValid && fields[key].error.value) {
        newErrors[key] = fields[key].error.value
        isValid = false
      }
    })

    errors.value = newErrors
    return isValid
  }

  const clearErrors = () => {
    Object.values(fields).forEach(field => field.clearError())
    errors.value = {}
  }

  const clearFieldError = <K extends keyof T>(fieldName: K) => {
    fields[fieldName]?.clearError()
    delete errors.value[fieldName]
  }

  const setFieldError = <K extends keyof T>(fieldName: K, error: string) => {
    if (fields[fieldName]) {
      fields[fieldName].error.value = error
      errors.value[fieldName] = error
    }
  }

  const getFieldValue = <K extends keyof T>(fieldName: K): T[K] => {
    return fields[fieldName]?.value.value as T[K]
  }

  const setFieldValue = <K extends keyof T>(fieldName: K, value: T[K]) => {
    if (fields[fieldName]) {
      fields[fieldName].value.value = value
    }
  }

  return {
    fields,
    errors: readonly(errors),
    isFormValid: readonly(isFormValid),
    hasErrors: readonly(hasErrors),
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
    setFieldError,
    getFieldValue,
    setFieldValue
  }
}

// Предустановленные правила валидации
export const ValidationRules = {
  required: (message = 'Поле обязательно для заполнения'): ValidationRule => {
    return (value: any) => {
      if (value === null || value === undefined || value === '') {
        return message
      }
      return true
    }
  },

  minLength: (min: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      if (value && value.length < min) {
        return message || `Минимальная длина: ${min} символов`
      }
      return true
    }
  },

  maxLength: (max: number, message?: string): ValidationRule<string> => {
    return (value: string) => {
      if (value && value.length > max) {
        return message || `Максимальная длина: ${max} символов`
      }
      return true
    }
  },

  email: (message = 'Некорректный email адрес'): ValidationRule<string> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (value: string) => {
      if (value && !emailRegex.test(value)) {
        return message
      }
      return true
    }
  },

  pattern: (regex: RegExp, message = 'Некорректный формат'): ValidationRule<string> => {
    return (value: string) => {
      if (value && !regex.test(value)) {
        return message
      }
      return true
    }
  }
}