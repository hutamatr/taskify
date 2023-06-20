import { type StyleProp, StyleSheet, View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface IHeaderProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Header({ children, style, ...props }: IHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.headerContainer, { backgroundColor: theme.colors.inversePrimary }, style]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
