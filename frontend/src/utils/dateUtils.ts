export const arrayToDate = (dateArray: number[]): Date => {
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second);
};

export const timeSlotToDate = (timeSlot: number): Date => {
  const hours = Math.floor(timeSlot / 4);
  const minutes = (timeSlot % 4) * 15;
  
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  
  return date;
};

export const dateToTimeSlot = (date: Date): number => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  return hours * 4 + Math.floor(minutes / 15);
};

