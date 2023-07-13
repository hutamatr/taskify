import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';

import Text from '../ui/Text';
import type { ICategories } from '../../types/types';

interface ICategoriesItemProps extends ICategories {
  style?: StyleProp<ViewStyle>;
  textVariant?: VariantProp<unknown>;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined;
  onPress?: () => void;
}

export default function CategoriesItem({
  name,
  textVariant,
  style,
  onPress,
  mode,
}: ICategoriesItemProps) {
  const theme = useTheme();

  if (mode) {
    return (
      <Button
        contentStyle={{ height: '100%' }}
        style={[styles.item, style]}
        mode={mode}
        theme={{ roundness: 4 }}
        onPress={onPress}
      >
        <Text variant={textVariant} lineBreakMode="tail" fontType="regular">
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
      <Text variant={textVariant} lineBreakMode="tail" fontType="regular">
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
