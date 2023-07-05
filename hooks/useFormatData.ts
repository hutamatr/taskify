import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const useFormatData = <T>(
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | undefined
) => {
  const data: unknown[] = [];
  snapshot?.docs.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return data as T;
};

export default useFormatData;
