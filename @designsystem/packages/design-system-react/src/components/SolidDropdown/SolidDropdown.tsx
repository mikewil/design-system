import {
  Button,
  ListBox,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components'
import { useCallback, useState } from 'react'
import styles from './SolidDropdown.module.css'
import { getClass } from '../../utils/classMaps'
import { StyledListBoxItem } from './SubComponents/StyledListBoxItem'
import { TitleBox } from './SubComponents/TitleBox'
import { useStyleProps } from '../../utils/useStyles'
import { BaseComponentProps } from '../BaseComponentProps'
import { Navigation_UpCaret } from '../../icons'

type SolidDropdownProps = {
  /**
   * The default text to be displayed in the dropdown.
   */
  title: string

  /**
   * The selection method for the dropdown. 'single' for single selection, 'multiple' for multiple selection.
   */
  selectionMethod: 'single' | 'multiple'

  /**
   * The list of items to be displayed in the dropdown.
   */
  items: string[]

  /**
   * The customizable test id for the unique dropdown.
   */
  testId?: string

  /**
   * The function to be called when the selection changes. It receives the selected items as its argument.
   */
  selectedItems: string[]

  /**
   * The function to be called when the selection changes. It receives the selected items as its argument.
   * @example
   * setSelectedItems: (selectedItems: string[]) => {}
   */
  setSelectedItems: (selectedItems: string[]) => void
} & BaseComponentProps

const IGNORE_LIST = ['Select an item', undefined, null] // Select value can pass in some values that we don't care about

/**
 * `SolidDropdown` is a customizable dropdown component.
 */
export function SolidDropdown({
  title,
  selectionMethod = 'single',
  items,
  testId,
  selectedItems = [],
  setSelectedItems,
  ...otherProps
}: SolidDropdownProps) {
  const [isOpen, setIsOpen] = useState(false) // Detect if the dropdown is open or not
  const listBoxItems = items
    ? items.map((item) => ({ value: item, key: item }))
    : [] // Convert the passed in list into into a list of items
  const [selectionDetection, setSelectionDetection] = useState<boolean>(false)
  const styleProps = useStyleProps(otherProps)

  const setSelectedKey = useCallback(
    (selectedKey: string) => {
      if (selectedKey !== null && !IGNORE_LIST.includes(selectedKey)) {
        let updatedItems: string[]
        if (selectedItems.includes(selectedKey)) {
          updatedItems = selectedItems.filter(
            (item: string) => item !== selectedKey,
          )
        } else {
          if (selectionMethod === 'single') {
            updatedItems = [selectedKey]
          } else {
            // 'multiple'
            updatedItems =
              selectedKey !== null
                ? [...selectedItems, selectedKey]
                : selectedItems
          }
        }
        setSelectedItems(updatedItems)
        if (selectionMethod === 'single') {
          setIsOpen(false)
        }
      }
    },
    [selectedItems, selectionMethod, setSelectedItems],
  )

  return (
    <Select
      aria-label="SelectionDropdown"
      data-testid={`${testId}-solid-dropdown`}
      onSelectionChange={() => {
        setSelectionDetection(!selectionDetection)
      }}
      style={styleProps}
    >
      <Button
        className={`${getClass(styles, 'solidDropdown')} 
                    ${getClass(styles, 'solidDropdownButton')} 
                    ${isOpen ? getClass(styles, 'solidDropdownButtonOpened') : ''}`}
        onPress={() => setIsOpen(!isOpen)}
      >
        <SelectValue
          data-testid={`${testId}-solid-dropdown-select-value`}
          className={
            selectionMethod === 'single' ? 'single-select' : 'multiple-select'
          }
        >
          <TitleBox
            title={title}
            selectedItems={selectedItems}
            selectionMethod={selectionMethod}
          />
        </SelectValue>
        <Navigation_UpCaret
          rotation={isOpen ? 0 : -180}
          color="General/foreground-secondary"
        />
      </Button>
      <Popover
        data-testid={`${testId}-solid-dropdown-popover`}
        onOpenChange={setIsOpen}
        isOpen={isOpen}
      >
        {listBoxItems.length > 0 ? (
          <ListBox
            aria-label="SolidDropdownListBox"
            items={listBoxItems}
            selectionMode={selectionMethod}
            className={getClass(styles, 'solidDropdownContainer')}
            data-testid={`${testId}-solid-dropdown-listbox`}
          >
            {(item) => (
              <StyledListBoxItem
                item={item}
                selectedItems={selectedItems}
                selectionMethod={selectionMethod}
                styles={styles}
                onClick={() => {
                  setSelectedKey(item.value)
                }}
              />
            )}
          </ListBox>
        ) : (
          <></>
        )}
      </Popover>
    </Select>
  )
}
