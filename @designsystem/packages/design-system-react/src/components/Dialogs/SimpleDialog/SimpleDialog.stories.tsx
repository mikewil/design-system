import type { Meta, StoryObj } from '@storybook/react'
import { SimpleDialog, SimpleDialogProps } from './SimpleDialog'
import { SolidButton } from '../../Buttons/SolidButton/SolidButton'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'

const meta: Meta<typeof SimpleDialog> = {
  component: SimpleDialog,
}

const dataTestId = 'designsystem-simple-dialog'

export default meta
type Story = StoryObj<typeof SimpleDialog>

const SimpleDialogWrapper = ({
  testId,
  heading,
  confirmText,
  cancelText,
  children,
  isOpen = false,
}: SimpleDialogProps) => {
  const [open, setOpen] = useState<boolean>(isOpen)

  return (
    <>
      <SolidButton
        testId="open-dialog-button"
        onClick={() => setOpen(true)}
        buttonText="Open Dialog"
      />
      <SimpleDialog
        testId={testId}
        isOpen={open}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        heading={heading}
      >
        {children}
      </SimpleDialog>
    </>
  )
}

export const Primary: Story = {
  render: (args) => (
    <SimpleDialogWrapper {...args}>
      This is basic text content.
    </SimpleDialogWrapper>
  ),
  play: async () => {
    const openDialogButton = document.querySelector(
      '[data-testid="open-dialog-button"]',
    ) as HTMLButtonElement

    await userEvent.click(openDialogButton)
  },
  args: {
    testId: dataTestId,
    confirmText: 'Okay',
    cancelText: 'Cancel',
    heading: 'Dialog Title',
  },
  parameters: {
    percy: {
      args: {
        isOpen: true,
      },
      waitForSelector: '[data-testid="designsystem-simple-dialog"]',
    },
  },
}

export const Scrollable: Story = {
  render: (args) => (
    <SimpleDialogWrapper {...args}>
      <p style={{ marginTop: 0 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet
        efficitur lorem, vitae vehicula lectus. Etiam ullamcorper nulla ut erat
        luctus tempor. Integer sit amet rhoncus justo. Proin ac augue nisl.
        Aenean aliquam mi odio. In hac habitasse platea dictumst. Curabitur ut
        augue viverra, varius risus sed, efficitur arcu.
      </p>

      <p>
        Mauris at est quis libero interdum finibus. Donec ante orci, rhoncus ut
        pretium id, condimentum eu urna. Mauris non ante leo. Maecenas efficitur
        est quis fermentum vulputate. Integer vehicula tincidunt massa, ac
        lobortis mi sodales non. Vestibulum mollis ultricies tincidunt. Quisque
        posuere elementum finibus.
      </p>

      <p>
        Sed sed justo vel nulla eleifend malesuada sit amet ut sapien. Nam
        scelerisque id erat ut varius. In hac habitasse platea dictumst. Ut
        scelerisque enim eu auctor imperdiet. Cras rutrum vulputate vulputate.
        Fusce metus odio, convallis et sodales vitae, lacinia eu diam. Morbi
        tincidunt pharetra tincidunt. Morbi imperdiet tellus ut neque tempor
        semper. Praesent facilisis congue lacus nec imperdiet.
      </p>

      <p>
        Maecenas suscipit quam ac sem eleifend posuere. Phasellus non maximus
        massa, et ullamcorper tellus. Curabitur elementum suscipit fringilla.
        Nam ultricies vulputate lectus ut pulvinar. Duis euismod sagittis purus
        eget vulputate. Nulla egestas non ante et viverra. Curabitur porta,
        magna id varius pharetra, tellus purus mattis tortor, a rutrum orci
        risus eget enim. Quisque vel condimentum est, nec aliquam lacus. In sit
        amet efficitur quam. Mauris blandit, risus eu pretium venenatis, sem
        urna porttitor eros, et placerat justo ex vel ante. Curabitur turpis mi,
        aliquam vel dui vitae, sagittis convallis neque. Nulla facilisi.
        Maecenas imperdiet egestas dictum. Mauris dignissim mi ac elit mollis,
        nec fringilla justo pharetra. Cras ut enim vel felis dictum vehicula.
      </p>

      <p>
        Donec quis tortor odio. Duis eget pharetra purus. Suspendisse rutrum
        sapien at bibendum luctus. Sed consequat fermentum diam ac pharetra. In
        hac habitasse platea dictumst. Etiam pretium urna nisi, ac rutrum metus
        ultrices quis. Vestibulum purus est, dapibus sit amet sodales auctor,
        pulvinar ut est. Curabitur facilisis, massa quis commodo interdum, diam
        nulla condimentum dolor, vitae cursus diam mauris molestie nisi. Quisque
        euismod odio in pellentesque luctus. Nunc euismod, nunc non interdum
        interdum, nisi nisi faucibus lorem, eget aliquam augue risus laoreet
        lacus. Phasellus non ultricies augue.
      </p>

      <p>
        Vivamus sodales varius dolor sit amet dignissim. Etiam pellentesque
        feugiat sodales. Fusce vulputate, augue eu feugiat aliquet, dui erat
        auctor risus, eget efficitur massa nisl eget erat. Aliquam id nisi orci.
        Vestibulum libero justo, ultrices a ligula nec, rhoncus scelerisque
        ipsum. Donec urna lacus, scelerisque nec metus eget, feugiat mattis
        nunc. Phasellus ut purus nec enim hendrerit varius non vel eros. Quisque
        facilisis lacus dui, ac ultricies lorem aliquet sit amet. Cras non risus
        aliquet, aliquam quam euismod, auctor justo. Sed turpis dolor, commodo
        vel ipsum sit amet, venenatis consectetur dui. Fusce sit amet ex et
        lorem sodales ullamcorper vitae ac urna. Suspendisse in ante eget orci
        ultricies consectetur non eget turpis. Mauris nibh ligula, placerat et
        risus sit amet, hendrerit sollicitudin dolor. Suspendisse luctus ante
        tortor, nec congue lacus scelerisque at. Mauris tempor in ante at
        convallis.
      </p>

      <p>
        Morbi interdum ligula purus, eu iaculis diam congue a. Vestibulum
        dignissim congue felis, ac ultrices orci pharetra quis. Sed eget sapien
        laoreet, posuere sapien eu, fermentum dui. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas. Sed
        iaculis maximus volutpat. Duis dictum id nisl et bibendum. Donec vel
        molestie eros, nec pretium ante. Nullam eget risus tincidunt, feugiat
        turpis finibus, malesuada metus. Phasellus non nulla at diam sodales
        porttitor sit amet eleifend ante. Maecenas magna libero, accumsan ac
        nulla a, lacinia mattis nulla. Mauris cursus varius arcu. Donec
        convallis urna quis ante consectetur maximus. Duis auctor dui quis
        tellus dictum pretium. Duis sapien tortor, pellentesque non faucibus
        vel, viverra sed est.
      </p>

      <p>
        Morbi ornare mi non venenatis rutrum. Proin non rutrum nisi. Curabitur
        finibus ornare porttitor. Nam vestibulum mauris vel lacinia viverra.
        Suspendisse a metus non diam tempor tristique. Fusce sed sapien odio.
        Sed aliquet a tortor id efficitur. Quisque et dictum libero. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Maecenas id ex at felis facilisis dignissim eget vitae lorem. Fusce
        lobortis id nibh vitae faucibus. Aliquam vehicula ipsum vitae blandit
        fermentum. Vestibulum bibendum nulla quis arcu fermentum pulvinar.
      </p>

      <p>
        Aenean nibh lorem, fringilla eu vehicula et, finibus et libero. Donec
        lacinia condimentum nulla non facilisis. Sed eget ultricies libero.
        Etiam hendrerit nisi vitae bibendum gravida. Quisque rhoncus massa nec
        sapien sollicitudin consectetur. Nam suscipit rutrum fermentum. Aenean
        laoreet purus sed malesuada accumsan. Sed iaculis vulputate ex, sit amet
        placerat nisi finibus vulputate. In posuere sapien iaculis mauris
        laoreet, ut aliquet nibh fermentum.
      </p>

      <p>
        Suspendisse gravida augue tempor enim egestas, ac luctus risus commodo.
        Aliquam gravida efficitur sem, eu volutpat augue fermentum consectetur.
        Aenean sit amet sodales lorem, id dignissim mi. Curabitur vehicula velit
        rutrum auctor aliquam. Donec id quam condimentum, faucibus dui eu,
        ultrices enim. Suspendisse potenti. Aliquam quis urna nec quam
        sollicitudin consectetur non vel ligula. Duis bibendum feugiat odio at
        laoreet. Aliquam erat volutpat.
      </p>
    </SimpleDialogWrapper>
  ),
  args: {
    testId: dataTestId,
    confirmText: 'Okay',
    heading: 'Scrollable Content',
  },
  play: async () => {
    const openDialogButton = document.querySelector(
      '[data-testid="open-dialog-button"]',
    ) as HTMLButtonElement

    await userEvent.click(openDialogButton)
  },
  parameters: {
    percy: {
      args: {
        isOpen: true,
      },
      waitForSelector: '[data-testid="designsystem-simple-dialog"]',
    },
  },
}
