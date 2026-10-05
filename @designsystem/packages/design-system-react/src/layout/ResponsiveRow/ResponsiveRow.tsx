import { BaseComponentProps } from '../../components/BaseComponentProps'
import { useStyleProps } from '../../utils/useStyles'
import styles from './ResponsiveRow.module.css'
import { ReactNode } from 'react'

export type ResponsiveRowProps = {
  children: ReactNode
} & BaseComponentProps

export const ResponsiveRow = ({
  children,
  ...otherProps
}: ResponsiveRowProps) => {
  const styleProps = useStyleProps(otherProps)
  return (
    <div className={styles.responsiveRow} style={styleProps}>
      {children}
    </div>
  )
}

export type ResponsiveRowWrapTogetherProps = {
  children: ReactNode
}

const WrapTogether = ({ children }: ResponsiveRowWrapTogetherProps) => {
  return <div className={styles.responsiveRowWrapTogether}>{children}</div>
}

const Split = () => {
  return <div className={styles.responsiveRowSplit} />
}

ResponsiveRow.WrapTogether = WrapTogether
ResponsiveRow.Split = Split
