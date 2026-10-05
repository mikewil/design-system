import { getClass } from '../../../utils/classMaps'
import { ListBoxItem } from 'react-aria-components'
import { Text } from '../../Typography/Text'
import { Checkbox } from '../../Checkbox/Checkbox'
import { BaseComponentProps } from '../../BaseComponentProps'
import { useStyleProps } from '../../../utils/useStyles'
import clsx from 'clsx'

export type StyledListBoxItemProps = {
  item: { value: string }
  selectedItems: string[]
  selectionMethod: 'single' | 'multiple'
  styles: {
    [key: string]: string
  }
  onClick(): void
} & BaseComponentProps

export function StyledListBoxItem({
  item,
  selectedItems,
  selectionMethod,
  styles,
  onClick,
  ...otherProps
}: StyledListBoxItemProps) {
  const isSelected = selectedItems.includes(item.value)
  const variant = isSelected ? 'body2HighEmphasis' : 'body2LowEmphasis'
  const styleProps = useStyleProps(otherProps)

  return (
    <ListBoxItem
      className={clsx(
        'designsystem-StyledListBoxItem',
        getClass(styles, 'solidDropdown'),
        getClass(styles, 'solidDropdownListboxItem'),
        isSelected ? 'selected' : '',
      )}
      id={item.value}
      key={item.value}
      textValue="ListBoxItem"
      style={{ position: 'relative', ...styleProps }}
    >
      <div
        data-testid={`${item.value}-clickable-div`}
        className={`${getClass(styles, 'solidDropdownSelectionDiv')}`}
        onClick={onClick}
      >
        <Text variant={variant} color="General/foreground-primary">
          {item.value}{' '}
        </Text>{' '}
        {selectionMethod === 'multiple' && (
          <Checkbox
            size="XXXS"
            checked={isSelected}
            disabled={false}
            indeterminate={false}
          />
        )}
      </div>
    </ListBoxItem>
  )
}
