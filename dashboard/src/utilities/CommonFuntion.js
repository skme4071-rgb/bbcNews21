export const CustomArraySlice = (array, start, end) => {
  if (!array || !Array.isArray(array)) return ""; 
  return array.length > end ? array.slice(start, end) : array;
};
