import BottomSheet, { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '../ui/Text';
import useInputState from '../../hooks/useInputState';
import { useStore } from '../../store/useStore';

interface ICategoriesForm {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export default function CategoriesForm({ bottomSheetRef }: ICategoriesForm) {
  const { input, onChangeInputHandler, setInput } = useInputState({ inputState: { title: '' } });
  const { addCategory, userInfo } = useStore(
    (state) => ({
      addCategory: state.addCategoryHandler,
      userInfo: state.userInfo,
    }),
    shallow
  );

  const snapPoints = useMemo(() => ['25'], []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const cancelHandler = useCallback(() => {
    bottomSheetRef.current?.close();
    setInput({ title: '' });
  }, []);

  const submitCategoriesHandler = () => {
    if (!input.title) {
      return;
    }

    const newCategory = {
      name: input.title,
      userId: userInfo?.uid,
    };

    try {
      addCategory(newCategory);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setInput({ title: '' });
      bottomSheetRef.current?.close();
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount={true}
        containerStyle={{ zIndex: 99 }}
      >
        <View style={styles.contentContainer}>
          <TextInput
            mode="outlined"
            label="Categories Name"
            onChangeText={onChangeInputHandler.bind(null, 'title')}
            value={input.title}
          />
          <View style={{ flexDirection: 'row', columnGap: 8, justifyContent: 'flex-end' }}>
            <Button mode="text" onPress={cancelHandler}>
              <Text fontType="semibold" variant="titleMedium">
                Cancel
              </Text>
            </Button>
            <Button mode="contained" onPress={submitCategoriesHandler}>
              <Text fontType="semibold" variant="titleMedium">
                Add Category
              </Text>
            </Button>
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 16,
    rowGap: 24,
  },
});
