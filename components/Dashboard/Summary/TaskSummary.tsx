import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import React from 'react';

export default function TaskSummary() {
  const theme = useTheme();

  return (
    <View style={styles.summaryContainer}>
      <View>
        <Text variant="displaySmall" numberOfLines={2} lineBreakMode="tail">
          your have 10 tasks today
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Card mode="contained" style={styles.summaryCard} theme={{ roundness: 16 }}>
          <Card.Content style={styles.cardContent}>
            <Text variant="displayMedium">12</Text>
            <Text variant="titleMedium">task in progress</Text>
          </Card.Content>
        </Card>
        <View style={styles.cardContainerChild}>
          <Card
            mode="contained"
            theme={{
              roundness: 16,
              colors: { primary: theme.colors.background },
            }}
          >
            <Card.Content style={styles.cardContent}>
              <Text variant="displayMedium">16</Text>
              <Text variant="titleMedium">task in todo</Text>
            </Card.Content>
          </Card>
          <Card mode="contained" style={styles.summaryCard} theme={{ roundness: 16 }}>
            <Card.Content style={styles.cardContent}>
              <Text variant="displayMedium">20</Text>
              <Text variant="titleMedium">task in done</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flex: 1,
    columnGap: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    rowGap: 16,
  },
  cardContainer: {
    rowGap: 4,
  },
  cardContainerChild: {
    flexDirection: 'row',
    columnGap: 4,
  },
  summaryCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  cardContent: {
    rowGap: 12,
  },
});
