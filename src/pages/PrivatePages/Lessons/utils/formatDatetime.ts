export const formatDatetime = (date: Date) =>
  `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
