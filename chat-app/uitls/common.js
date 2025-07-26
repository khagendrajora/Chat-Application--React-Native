export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getRoomdId = (userId1, userId2) => {
  const sortIds = [userId1, userId2].sort();
  const roomdId = sortIds.join("-");
  return roomdId;
};

export const formatDate = (date) => {
  let day = date.getDate();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  let formattedDate = day + " " + month;
  return formattedDate;
};
