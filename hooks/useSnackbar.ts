import { useState } from 'react';

export default function useSnackbar() {
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return { visible, setVisible, onDismissSnackBar };
}
