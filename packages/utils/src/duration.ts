export function minutesToLabel(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 0) {
    throw new RangeError("minutes must be a non-negative finite number");
  }

  const totalMinutes = Math.round(minutes);
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}
