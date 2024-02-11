class SeasonUtils {
  getCurrentSeason() {
    const currentMonth = new Date().getMonth();
    if ([0, 1, 2].includes(currentMonth)) return "WINTER";
    if ([3, 4, 5].includes(currentMonth)) return "SPRING";
    if ([6, 7, 8].includes(currentMonth)) return "SUMMER";
    return "FALL";
  }

  getNextSeason() {
    const seasonWeAreIn = this.getCurrentSeason();
    const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
    const index = seasons.findIndex((season) => season == seasonWeAreIn);
    if (index === 3) return seasons[0];
    return seasons[index + 1];
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getNextYear(): number {
    if (this.getNextSeason() === "WINTER") return this.getCurrentYear() + 1;
    return this.getCurrentYear();
  }
}

export const seasonUtils = new SeasonUtils();
