import { render } from '@testing-library/react'
import { ResponsiveRow } from './ResponsiveRow'
import styles from './ResponsiveRow.module.css'

test('renders ResponsiveRow with correct class', () => {
  const { container } = render(
    <ResponsiveRow>
      <div>Child 1</div>
      <div>Child 2</div>
    </ResponsiveRow>,
  )
  expect(container.firstChild).toHaveClass(styles.responsiveRow)
})

test('children are rendered correctly', () => {
  const { getByText } = render(
    <ResponsiveRow>
      <div data-testid="child">Child</div>
    </ResponsiveRow>,
  )
  const childElement = getByText('Child')
  expect(childElement).toBeInTheDocument()
})

test('ResponsiveRowSplit aligns items to the right', () => {
  const { container, getByText } = render(
    <ResponsiveRow>
      <div>Left Item</div>
      <ResponsiveRow.Split />
      <div>Right Item</div>
    </ResponsiveRow>,
  )

  const splitElement = container.querySelector(`.${styles.responsiveRowSplit}`)
  expect(splitElement).toBeInTheDocument()
  expect(splitElement).toHaveClass(styles.responsiveRowSplit)

  const rightItem = getByText('Right Item')
  expect(rightItem).toBeInTheDocument()
})

test('ResponsiveRowWrapTogether keeps children together without wrapping', () => {
  const { container } = render(
    <ResponsiveRow>
      <div>Item 1</div>
      <ResponsiveRow.WrapTogether>
        <div>Item 2</div>
        <div>Item 3</div>
      </ResponsiveRow.WrapTogether>
      <div>Item 4</div>
    </ResponsiveRow>,
  )

  const wrapTogetherElement = container.querySelector(
    `.${styles.responsiveRowWrapTogether}`,
  )
  expect(wrapTogetherElement).toBeInTheDocument()
  expect(wrapTogetherElement).toHaveClass(styles.responsiveRowWrapTogether)
})
