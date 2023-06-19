import { Text as DefaultText, TextProps } from 'react-native-paper';

interface ITextProps extends TextProps<unknown> {
  children: string;
  fontType: 'regular' | 'medium' | 'bold' | 'semibold';
}

export default function Text({ children, fontType, style, ...props }: ITextProps) {
  return (
    <DefaultText style={[{ fontFamily: `plus-jakarta-sans-${fontType}` }, style]} {...props}>
      {children}
    </DefaultText>
  );
}
