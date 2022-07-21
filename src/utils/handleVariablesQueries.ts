export const perPage = 6;

export const currentSeason = () => {
  const currentMonth = new Date().getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 3) return "WINTER";

  if (currentMonth >= 4 && currentMonth <= 6) return "SPRING";

  if (currentMonth >= 7 && currentMonth <= 9) return "SUMMER";

  if (currentMonth >= 10 && currentMonth <= 12) return "FALL";
};

export const currentYear = () => {
  return new Date().getFullYear();
};

export const nextSeason = () => {
  if (currentSeason() === "WINTER") {
    return "SPRING";
  }

  if (currentSeason() === "SPRING") {
    return "SUMMER";
  }

  if (currentSeason() === "SUMMER") {
    return "FALL";
  }

  if (currentSeason() === "FALL") {
    return "WINTER";
  }
};

export const nextSeasonYear = () => {
  if (nextSeason() === "WINTER") return currentYear() + 1;

  return currentYear();
};

// console.log(`>>> Temporada Atual: ${currentSeason()}`);
// console.log(`>>> Temporada Atual ANO: ${currentYear()}`);
// console.log(`>>> Próxima Temporada: ${nextSeason()}`);
// console.log(`>>> Próxima Temporada ANO: ${nextSeasonYear()}`);