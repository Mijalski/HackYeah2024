import * as Dialog from '@radix-ui/react-dialog';

const AchievementDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>
            Test
        </Dialog.Title>
        <Dialog.Description>
            Test
        </Dialog.Description>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default AchievementDialog;