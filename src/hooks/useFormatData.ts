import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useMemo } from 'react';

const useFormatData = <T>(
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | undefined
) => {
  const data: unknown[] = [];
  useMemo(() => {
    snapshot?.docs.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
  }, [snapshot, data]);

  return data as T;
};

export default useFormatData;
