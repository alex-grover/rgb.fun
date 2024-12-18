import type { Color } from '@/lib/color'
import { IconButton, Popover, Theme } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { RgbColorPicker } from 'react-colorful'
import { useDebounceValue } from 'usehooks-ts'
import styles from './ColorPicker.module.css'

type ColorPickerProps = {
  color: Color
  setColor: (color: Color) => void
}

export function ColorPicker({
  color: initialColor,
  setColor: setParentColor,
}: ColorPickerProps) {
  const [color, setColor] = useState(initialColor)

  const [debouncedColor] = useDebounceValue(color, 25)

  useEffect(
    () => setParentColor(debouncedColor),
    [setParentColor, debouncedColor],
  )

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Theme appearance="dark" hasBackground={false}>
          <IconButton variant="outline" highContrast />
        </Theme>
      </Popover.Trigger>
      <Popover.Content align="center" asChild className={styles.content}>
        <RgbColorPicker color={color} onChange={setColor} />
      </Popover.Content>
    </Popover.Root>
  )
}
