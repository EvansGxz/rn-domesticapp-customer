import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

interface AlertProps {
  msg?: string | undefined;
  title?: string | 'Fabuloso!';
  type: 'SUCCESS' | 'DANGER' | 'WARNING';
}

export default function Alert({msg, title, type}: AlertProps) {
  return Dialog.show({
    type: ALERT_TYPE[type],
    title,
    textBody: msg,
    button: 'close',
  });
}