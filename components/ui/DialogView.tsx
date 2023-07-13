import { Button, Dialog, Portal } from 'react-native-paper';

import Text from './Text';

interface IDialogViewProps {
  dialogTitle: string;
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export default function DialogView({ dialogTitle, message, visible, onDismiss }: IDialogViewProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{dialogTitle}</Dialog.Title>
        <Dialog.Content>
          <Text fontType="medium" variant="bodyMedium">
            {message}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
