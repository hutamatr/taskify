import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { useAppTheme } from '@hooks/useAppTheme';

interface IHeaderProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Header({ children, style, ...props }: IHeaderProps) {
  const theme = useAppTheme();

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
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
