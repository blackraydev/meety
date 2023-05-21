export const getNameInitials = (fullName: string) => {
  if (!fullName) return '';

  return fullName
    .trim()
    .split(' ')
    .map((name) => name[0].toUpperCase())
    .slice(0, 2)
    .join('');
};
