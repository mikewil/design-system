import '../../../theme.css'
import styles from './SimpleDialog.module.css'
import { BaseComponentProps } from '../../BaseComponentProps'
import { useStyleProps } from '../../../utils/useStyles'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
import clsx from 'clsx'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { SolidButton } from '../../Buttons/SolidButton/SolidButton'
import { getClass } from '../../../utils/classMaps'

export type SimpleDialogProps = {
  heading: string
  confirmText: string
  cancelText?: string
  testId?: string
  isOpen?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  children: string | ReactElement | ReactElement[]
} & BaseComponentProps

export function SimpleDialog({
  heading,
  confirmText,
  cancelText,
  testId,
  isOpen = false,
  onConfirm,
  onCancel,
  children,
  ...otherProps
}: SimpleDialogProps) {
  const styleProps = useStyleProps(otherProps)
  const contentRef = useRef<HTMLDivElement>(null)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const checkForScroll = () => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current

          setHasScrollbar(scrollHeight > clientHeight)
        }
      }

      checkForScroll()

      const resizeObserver = new ResizeObserver(() => {
        checkForScroll()
      })

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current)
      }

      return () => resizeObserver.disconnect()
    }
  }, [isOpen])

  return (
    <ModalOverlay
      data-testid="designsystem-modal-overlay"
      isOpen={isOpen}
      isDismissable={false}
      className={clsx(styles.overlay)}
      style={styleProps}
    >
      <Modal data-testid="designsystem-modal" className={clsx(styles.modal)}>
        <Dialog data-testid={testId} className={clsx(styles.dialog)}>
          <Heading
            slot="title"
            data-testid="designsystem-dialog-header"
            className={clsx(styles.heading)}
          >
            {heading}
          </Heading>

          <div
            ref={contentRef}
            data-testid="designsystem-dialog-content"
            className={clsx(styles.content)}
          >
            {children}
          </div>

          <footer
            data-testid="designsystem-dialog-footer"
            className={clsx(
              styles.footer,
              getClass(styles, hasScrollbar ? 'scrollable' : ''),
            )}
          >
            <SolidButton
              testId="designsystem-dialog-confirm-button"
              buttonText={confirmText}
              onClick={onConfirm}
            />

            {cancelText && (
              <SolidButton
                testId="designsystem-dialog-cancel-button"
                variant="secondary"
                buttonText={cancelText}
                onClick={onCancel}
              />
            )}
          </footer>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
