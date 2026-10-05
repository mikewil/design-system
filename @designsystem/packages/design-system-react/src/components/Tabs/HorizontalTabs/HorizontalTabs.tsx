import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Key, Tabs } from 'react-aria-components'
import styles from './HorizontalTabs.module.css'
import { useStyleProps } from '../../../utils/useStyles'
import clsx from 'clsx'
import { BaseComponentProps } from '../../BaseComponentProps'
import {
  HorizontalTabList,
  DesignSystemHorizontalTabListProps,
  Position,
} from './HorizontalTabList/HorizontalTabList'
import {
  HorizontalTabPanel,
  DesignSystemHorizontalTabPanelProps,
} from './HorizontalTabPanel/HorizontalTabPanel'
import { Item, TabListState, useTabListState } from 'react-stately'
import { HorizontalTab } from './HorizontalTab/HorizontalTab'

export type DesignSystemHorizontalTabsProps = {
  selectedTab?: string
  onChange?: (key: string) => void
  children: [
    ReactElement<DesignSystemHorizontalTabListProps, typeof HorizontalTabList>,
    ...ReactElement<
      DesignSystemHorizontalTabPanelProps,
      typeof HorizontalTabPanel
    >[],
  ]
} & BaseComponentProps

type AnimationContextType = {
  direction: 'left' | 'right'
  position: Position | undefined
  onSelectionChange: (key: Key) => void
  ref: React.RefObject<HTMLDivElement>
  state: TabListState<object>
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
)

export const useAnimationContext = () => {
  const context = useContext(AnimationContext)
  if (!context)
    throw new Error(
      'useAnimationContext must be used within a HorizontalTabs component',
    )
  return context
}

export function HorizontalTabs({
  testId,
  selectedTab,
  onChange = () => {},
  children,
  ...props
}: DesignSystemHorizontalTabsProps) {
  const styleProps = useStyleProps(props)
  const ref = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [prevIndex, setPrevIndex] = useState<number>(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [position, setPosition] = useState<Position | undefined>(undefined)
  const [activeTab, setActiveTab] = React.useState<string>(
    selectedTab || children[0].props.id || '',
  )

  const tabItems = getTabElements(children).map((tab) => {
    const { id, children } = tab.props
    return (
      <Item key={id} data-key={id}>
        {children}
      </Item>
    )
  })

  const state = useTabListState({
    children: tabItems,
    selectedKey: activeTab,
  })

  const onSelectionChange = useCallback(
    (key: Key) => {
      if (!key) return

      setActiveTab(key.toString())
      onChange(key.toString())

      // Not capturing the ref for mobile view
      if (!ref.current) return

      const tab = ref.current?.querySelector(`[data-key=${key}]`) as HTMLElement
      const tabList = ref.current?.querySelector('[role="tablist"]')
      const children = Array.from(tabList?.children || [])
      const newIndex = tab ? children.indexOf(tab) : 0

      if (tab) {
        setPosition({
          x: tab.offsetLeft + 16,
          y: -4,
          width: tab.offsetWidth,
        })
      }

      setCurrentIndex(newIndex)

      if (newIndex !== prevIndex) {
        setDirection(newIndex > prevIndex ? 'right' : 'left')
      }
    },
    [ref, prevIndex, onChange],
  )

  useEffect(() => {
    setPrevIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    onSelectionChange(activeTab as Key)

    const observer = new ResizeObserver(() =>
      onSelectionChange(activeTab as Key),
    )

    if (ref.current) {
      observer.observe(ref.current)

      Array.from(ref.current.children).forEach((child) => {
        observer.observe(child)
      })
    }

    return () => observer.disconnect()
  }, [activeTab, onSelectionChange])

  return (
    <AnimationContext.Provider
      value={{
        direction,
        position,
        onSelectionChange,
        ref,
        state,
      }}
    >
      <Tabs
        className={clsx('designsystem-HorizontalTabs', styles.horizontalTabs)}
        data-testid={testId}
        selectedKey={activeTab}
        onSelectionChange={onSelectionChange}
        {...props}
        style={styleProps}
      >
        <div ref={ref}>{children}</div>
      </Tabs>
    </AnimationContext.Provider>
  )
}

/**
 * Finds all HorizontalTab elements
 * in the children of a HorizontalTabs component
 * and returns them as an array
 */
const getTabElements = (
  children: [
    ReactElement<DesignSystemHorizontalTabListProps, typeof HorizontalTabList>,
    ...ReactElement<
      DesignSystemHorizontalTabPanelProps,
      typeof HorizontalTabPanel
    >[],
  ],
): ReactElement[] => {
  if (!children.length)
    throw new Error(
      'HorizontalTabs component requires children of types HorizontalTabList and HorizontalTabPanel',
    )

  const tabs = children.find((child) => {
    if (
      !React.isValidElement(child) ||
      child.type !== HorizontalTabList ||
      !child.props.children
    )
      return

    const children = React.Children.toArray(child.props.children)

    if (!children.length)
      throw new Error(
        'A HorizontalTabList component with at least one HorizontalTab child component is required',
      )

    return children.filter(
      (child) => React.isValidElement(child) && child.type === HorizontalTab,
    )
  })

  if (!React.isValidElement(tabs) || !tabs?.props?.children)
    throw new Error(
      'A HorizontalTabList component with at least one HorizontalTab child component is required',
    )

  const horizontalTabArray = React.Children.toArray(tabs.props.children)
  return horizontalTabArray.filter(isHorizontalTabElement)
}

const isHorizontalTabElement = (
  element: React.ReactNode,
): element is React.ReactElement<{
  id: string
  children: React.ReactNode
}> => {
  return React.isValidElement(element) && element.type === HorizontalTab
}
