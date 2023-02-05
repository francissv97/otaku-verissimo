export const perPage = 5;

export function currentSeason() {
  const currentMonth = new Date().getMonth() + 1;
  if (currentMonth >= 1 && currentMonth <= 3) return "WINTER";

  if (currentMonth >= 4 && currentMonth <= 6) return "SPRING";

  if (currentMonth >= 7 && currentMonth <= 9) return "SUMMER";

  if (currentMonth >= 10 && currentMonth <= 12) return "FALL";
}

export function currentYear() {
  return new Date().getFullYear();
}

export function nextSeason() {
  switch (currentSeason()) {
    case "WINTER":
      return "SPRING";
    case "SPRING":
      return "SUMMER";
    case "SUMMER":
      return "FALL";
    case "FALL":
      return "WINTER";
  }
}

export function nextSeasonYear() {
  if (nextSeason() === "WINTER") return currentYear() + 1;

  return currentYear();
}
