import { ComponentType, FunctionalComponent } from 'preact'

export function createPreset<Props extends Record<string, any>>(Component: ComponentType<Props>) {
  return function <PresetProps extends Partial<Props>>(presetProps: PresetProps) {
    const PresetComponent: FunctionalComponent<Omit<Props, keyof PresetProps>> = (
      props: Omit<Props, keyof PresetProps>,
    ) => {
      const allProps = { ...presetProps, ...props }

      return <Component {...(allProps as Props)} />
    }

    const displayName = Component.displayName || Component.name || 'Component'
    PresetComponent.displayName = `Preset(${displayName})`

    return PresetComponent
  }
}
