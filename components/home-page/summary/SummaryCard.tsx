import { View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import Text from '../../ui/Text';

export default function SummaryCard() {
  return (
    <View style={styles.cardContainer}>
      <Card
        mode="contained"
        style={styles.summaryCard}
        theme={{ roundness: 16 }}
        contentStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Card.Content style={styles.cardContent}>
          <Text variant="displayMedium" fontType="regular">
            12
          </Text>
          <Text variant="titleMedium" fontType="semibold">
            task in progress
          </Text>
        </Card.Content>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/task.png')} style={styles.image} />
        </View>
      </Card>
      <View style={styles.cardContainerChild}>
        <Card style={styles.summaryCard} mode="contained" theme={{ roundness: 16 }}>
          <Card.Content style={styles.cardContent}>
            <Text variant="displayMedium" fontType="regular">
              16
            </Text>
            <Text variant="titleMedium" fontType="semibold">
              task in todo
            </Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={styles.summaryCard} theme={{ roundness: 16 }}>
          <Card.Content style={styles.cardContent}>
            <Text variant="displayMedium" fontType="regular">
              20
            </Text>
            <Text variant="titleMedium" fontType="semibold">
              task in done
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    rowGap: 4,
  },
  summaryCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  cardContent: {
    rowGap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 32,
  },
  cardContainerChild: {
    flexDirection: 'row',
    columnGap: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
