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

export const formatSeconds = (seconds) => {
  if (typeof seconds !== "number" || seconds < 1) {
    return String("00:00:00");
  }

  let secs = seconds;
  const hours = Math.floor(secs / 3600);
  secs %= 3600;
  const minutes = Math.floor(secs / 60);
  const _seconds = Math.floor(secs % 60);

  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
    2,
    "0"
  )} : ${String(_seconds).padStart(2, "0")} `;
};

export const formatGenres = (arr) => {
  let genre;
  let formattedGenres = [];
  for (let i = 0; i < arr.length; i++) {
    genre = arr[i].split("PODCASTSERIES_");
    formattedGenres.push(genre[1].replaceAll("_", " ").toLowerCase());
  }
  return formattedGenres;
};

