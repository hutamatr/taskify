import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/src/components/Typography/types';

import Text from '../ui/Text';

import { ICategories } from '../../types/types';

interface ICategoriesItemProps extends ICategories {
  style?: StyleProp<ViewStyle>;
  textVariant: VariantProp<unknown>;
}

export default function CategoriesItem({ name, textVariant, style }: ICategoriesItemProps) {
  return (
    <Card style={[styles.item, style]} mode="contained" theme={{ roundness: 8 }}>
      <Card.Content style={styles.itemContent}>
        <Text variant={textVariant} lineBreakMode="tail" fontType="regular">
          {name}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 8,
    height: '100%',
  },
  itemContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
