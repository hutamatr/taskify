export function getLabelByUsername(username: string) {
  const firstLetter = username?.charAt(0);

  // Get the first letter after the space
  const spaceIndex = username?.indexOf(' ');
  if (spaceIndex === -1) {
    return { firstLetter: firstLetter?.toUpperCase() };
  }
  const firstLetterAfterSpace = username?.charAt(spaceIndex + 1);
  return {
    firstLetter: firstLetter?.toUpperCase(),
    firstLetterAfterSpace: firstLetterAfterSpace?.toUpperCase(),
  };
}
