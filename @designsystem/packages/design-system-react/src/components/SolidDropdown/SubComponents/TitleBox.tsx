import { Text } from '../../Typography/Text'

export function TitleBox({
  title,
  selectedItems,
  selectionMethod,
}: {
  title: string
  selectedItems: string[]
  selectionMethod: 'single' | 'multiple'
}) {
  const variant =
    selectedItems.length > 0 ? 'body2HighEmphasis' : 'body2LowEmphasis'
  let text
  if (selectionMethod == 'single') {
    text = selectedItems.length > 0 ? selectedItems[0] : title
  } else if (selectionMethod == 'multiple') {
    text =
      selectedItems.length > 0
        ? title + ' (' + selectedItems.length + ')'
        : title
  }
  return (
    <Text
      data-testid="dropdown-titlebox"
      variant={variant}
      color="General/foreground-primary"
    >
      {text}
    </Text>
  )
}
