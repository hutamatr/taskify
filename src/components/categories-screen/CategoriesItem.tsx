import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import type { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';

import Text from '@components/ui/Text';

import type { ICategories } from 'types/types';

interface ICategoriesItemProps extends ICategories {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textVariant?: VariantProp<unknown>;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined;
  onPress?: () => void;
}

import { useAppTheme } from '../../hooks/useAppTheme';

export default function CategoriesItem({
  name,
  textVariant,
  style,
  textStyle,
  onPress,
  mode,
}: ICategoriesItemProps) {
  const theme = useAppTheme();

  if (mode) {
    return (
      <Button
        contentStyle={{ height: '100%' }}
        style={[styles.item, style]}
        mode={mode}
        theme={{ roundness: 4 }}
        onPress={onPress}
      >
        <Text variant={textVariant} lineBreakMode="tail" fontType="semibold" style={textStyle}>
          {name}
        </Text>
      </Button>
    );
  }

  return (
    <Pressable
      style={[styles.item, { backgroundColor: theme.colors.primary }, style]}
      android_ripple={{ color: 'white' }}
      onPress={onPress}
    >
      <Text variant={textVariant} lineBreakMode="tail" fontType="semibold" style={textStyle}>
        {name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 16,
  },
});
