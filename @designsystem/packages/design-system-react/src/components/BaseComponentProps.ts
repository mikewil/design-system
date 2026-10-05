import { StyleProps } from '../utils/useStyles.types'

export type BaseComponentProps = {
  /**
   * The test id for the component.
   */
  testId?: string
} & StyleProps
