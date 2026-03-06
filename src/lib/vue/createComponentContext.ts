import { inject, provide, type InjectionKey } from 'vue'

export const createComponentContext = <T extends object | null>(
  rootComponentName: string,
  defaultContext?: T
) => {
  const key: InjectionKey<T> = Symbol(rootComponentName)

  const provideContext = (context: T) => {
    provide(key, context)
  }

  const useContext = (consumerName: string): T => {
    const context = inject(key, defaultContext)

    if (context) {
      return context
    }

    throw new Error(
      `\`${consumerName}\` must be used within \`${rootComponentName}\``
    )
  }

  return [provideContext, useContext] as const
}
