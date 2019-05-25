export const isToday = (time) => {
  return new Date(time).toDateString() === new Date().toDateString();
}
