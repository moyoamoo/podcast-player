export const rankList = (arr) => {
  let objTotal = {};
  arr.forEach((item) => {
    if (objTotal[item]) {
      objTotal[item] += 1;
    } else {
      objTotal[item] = 1;
    }
  });

  const sortedObjTotal = Object.fromEntries(
    Object.entries(objTotal).sort(([, a], [, b]) => b - a)
  );

  return sortedObjTotal;
};
