export const formatDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

export const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":");

  const hour12 = hours === "00" ? "00" : hours % 12 === 0 ? "12" : hours % 12;
  const ampm = hours < 12 ? "AM" : "PM";

  return `${hour12}:${minutes} ${ampm}`;
};

export const convertISOTo12HourFormat = (isoString) => {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours < 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, "0") : "12";

  return `${hours}:${minutes} ${ampm}`;
};

export const formatDate = (date) => {
  if (date) {
    const newDate = new Date(date);
    const formattedDate = newDate.toISOString().split("T")[0];
    return formattedDate;
  }
  return;
};

export const differenceDays = (departure, arrival) => {
  const timeDiff = Math.abs(arrival.getTime() - departure.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};
