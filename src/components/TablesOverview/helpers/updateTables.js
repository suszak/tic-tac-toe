import axios from "../../../axios";

export const updateTables = async ({
  userNumber,
  userName,
  rankPoints,
  tableID,
}) => {
  if (rankPoints.type !== "updating...") {
    const body = {
      userNumber,
      userName,
      rankPoints,
      tableID,
    };

    return await axios.put("/updateTables", body);
  } else {
    return { updated: false };
  }
};
