import BottomSheet, { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { shallow } from 'zustand/shallow';

import Text from '@components/ui/Text';

import { useStore } from '@store/useStore';

import useInputState from '@hooks/useInputState';

interface ICategoriesForm {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export default function CategoriesForm({ bottomSheetRef }: ICategoriesForm) {
  const { input, onChangeInputHandler, setInput } = useInputState({ inputState: { title: '' } });

  const { addCategory, categoriesStatus, authInfo } = useStore(
    (state) => ({
      addCategory: state.addCategoryHandler,
      categoriesStatus: state.categoriesStatus,
      categoriesError: state.categoriesError,
      authInfo: state.authInfo,
    }),
    shallow
  );

  useEffect(() => {
    if (categoriesStatus === 'successful') {
      setInput({ title: '' });
      bottomSheetRef.current?.close();
    }
  }, [categoriesStatus]);

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
      userId: authInfo?.uid,
    };

    addCategory(newCategory);
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
              <Text fontType="semibold" variant="titleMedium" style={{ color: 'red' }}>
                Cancel
              </Text>
            </Button>
            <Button
              mode="contained"
              onPress={submitCategoriesHandler}
              loading={categoriesStatus === 'pending'}
            >
              Add Category
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
