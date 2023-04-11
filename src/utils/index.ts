import { Location } from "react-router-dom";

export function handleNavLocationStateFrom(location: Location) {
  if (!location.state?.from) return [location.pathname];

  if (location.state?.from.length > 0)
    return [...location.state.from, location.pathname];
}

export function currentSeason() {
  const currentMonth = new Date().getMonth();

  switch (currentMonth) {
    case 0:
      return "WINTER";
    case 1:
      return "WINTER";
    case 2:
      return "WINTER";
    case 3:
      return "SPRING";
    case 4:
      return "SPRING";
    case 5:
      return "SPRING";
    case 6:
      return "SUMMER";
    case 7:
      return "SUMMER";
    case 8:
      return "SUMMER";
    case 9:
      return "FALL";
    case 10:
      return "FALL";
    default:
      return "FALL";
  }
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

export const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const monthsShort = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
