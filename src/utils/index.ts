type StaffMediaRoleInitialType = {
  node: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage: {
      large: string;
    };
    startDate: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  staffRole: string;
};

type StaffMediaRolesGrouped = {
  node: {
    id: number;
    title: {
      romaji: string;
    };
    coverImage: {
      large: string;
    };
    startDate: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  staffRoles: string[];
};

export function groupStaffRolesByMedia(
  staffMediaRoleArrayInitial: StaffMediaRoleInitialType[]
): StaffMediaRolesGrouped[] {
  const grouped: { [key: number]: StaffMediaRolesGrouped } = {};

  staffMediaRoleArrayInitial.forEach((item) => {
    const id = item.node.id;
    const staffRole = item.staffRole;

    if (!grouped[id]) {
      grouped[id] = { staffRoles: [staffRole], node: { ...item.node } };
    } else {
      grouped[id].staffRoles.push(staffRole);
    }
  });

  return Object.values(grouped);
}

export function sortStaffMediaRolesByStartDate(
  staffMediaRolesGrouped: StaffMediaRolesGrouped[]
): StaffMediaRolesGrouped[] {
  return staffMediaRolesGrouped.sort((a, b) => {
    const aStartDate = a.node.startDate;
    const bStartDate = b.node.startDate;

    if (!aStartDate || !bStartDate) {
      return 0;
    }

    const aYear = aStartDate.year ?? Number.MAX_VALUE;
    const bYear = bStartDate.year ?? Number.MAX_VALUE;
    if (aYear !== bYear) {
      return bYear - aYear;
    }

    const aMonth = aStartDate.month ?? Number.MAX_VALUE;
    const bMonth = bStartDate.month ?? Number.MAX_VALUE;
    if (aMonth !== bMonth) {
      return bMonth - aMonth;
    }

    const aDay = aStartDate.day ?? Number.MAX_VALUE;
    const bDay = bStartDate.day ?? Number.MAX_VALUE;
    if (aDay !== bDay) {
      return bDay - aDay;
    }

    return 0;
  });
}

export function currentSeason() {
  const currentMonth = new Date().getMonth();

  if ([0, 1, 2].includes(currentMonth)) return "WINTER";
  if ([3, 4, 5].includes(currentMonth)) return "SPRING";
  if ([6, 7, 8].includes(currentMonth)) return "SUMMER";
  return "FALL";
}

export function currentYear() {
  return new Date().getFullYear();
}

export function nextSeason() {
  const seasonWeAreIn = currentSeason();
  const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
  const index = seasons.findIndex((season) => season == seasonWeAreIn);

  if (index == 3) return seasons[0];

  return seasons[index + 1];
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
