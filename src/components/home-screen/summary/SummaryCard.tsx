import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

import Loading from '@components/ui/Loading';
import Text from '@components/ui/Text';

import { useAppTheme } from '@hooks/useAppTheme';

import type { ICategories, ITask } from 'types/types';

interface ISummaryCardProps {
  tasks: ITask[];
  categories: ICategories[];
  isLoading: boolean;
  error: Error | undefined;
}

export default function SummaryCard({ tasks, categories, isLoading }: ISummaryCardProps) {
  const theme = useAppTheme();

  const totalInProgress = useMemo(() => {
    return tasks?.filter((task) => task.isCompleted === false).length;
  }, [tasks]);

  const totalDone = useMemo(() => {
    return tasks?.filter((task) => task.isCompleted === true).length;
  }, [tasks]);

  const totalCategories = useMemo(() => {
    return categories.length;
  }, [categories]);

  return (
    <View style={styles.cardContainer}>
      <Card
        mode="contained"
        style={styles.summaryCard}
        theme={{ roundness: 8 }}
        contentStyle={{
          flexDirection: isLoading ? 'column' : 'row',
          justifyContent: isLoading ? 'center' : 'space-between',
          alignItems: 'center',
          height: 120,
        }}
      >
        {isLoading && <Loading size="large" />}
        {!isLoading && (
          <>
            <Card.Content style={styles.cardContent}>
              <Text
                variant="displayMedium"
                fontType="regular"
                style={{ color: theme.colors.primary }}
              >
                {totalInProgress > 99 ? '99+' : totalInProgress?.toString()}
              </Text>
              <Text variant="titleLarge" fontType="semibold">
                {totalInProgress > 1 ? 'tasks' : 'task'} in progress
              </Text>
            </Card.Content>
            <View style={styles.imageContainer}>
              <Image source={require('@assets/images/task.png')} style={styles.image} />
            </View>
          </>
        )}
      </Card>
      <View style={styles.cardContainerChild}>
        <Card
          mode="contained"
          style={styles.summaryCard}
          theme={{ roundness: 8 }}
          contentStyle={{
            justifyContent: 'center',
            alignItems: isLoading ? 'center' : 'flex-start',
            height: 120,
          }}
        >
          {isLoading && <Loading size="large" />}
          {!isLoading && (
            <Card.Content style={styles.cardContent}>
              <Text
                variant="displayMedium"
                fontType="regular"
                style={{ color: theme.colors.primary }}
              >
                {totalDone > 99 ? '99+' : totalDone?.toString()}
              </Text>
              <Text variant="titleLarge" fontType="semibold">
                {totalDone > 1 ? 'tasks' : 'task'} done
              </Text>
            </Card.Content>
          )}
        </Card>
        <Card
          style={styles.summaryCard}
          contentStyle={{
            justifyContent: 'center',
            alignItems: isLoading ? 'center' : 'flex-start',
            height: 120,
          }}
          mode="contained"
          theme={{ roundness: 8 }}
        >
          {isLoading && <Loading size="large" />}
          {!isLoading && (
            <Card.Content style={styles.cardContent}>
              <Text
                variant="displayMedium"
                fontType="regular"
                style={{ color: theme.colors.primary }}
              >
                {totalCategories}
              </Text>
              <Text variant="titleLarge" fontType="semibold">
                {totalCategories > 1 ? 'categories' : 'category'}
              </Text>
            </Card.Content>
          )}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    rowGap: 8,
  },
  summaryCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  cardContent: {
    rowGap: 8,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 32,
  },
  cardContainerChild: {
    flexDirection: 'row',
    columnGap: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});
