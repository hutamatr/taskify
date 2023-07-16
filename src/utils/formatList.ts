import type { ICategories } from 'types/types';

export function formatList(data: ICategories[], numColumns: number) {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({} as ICategories);
    numberOfElementsLastRow++;
  }

  return data;
}
