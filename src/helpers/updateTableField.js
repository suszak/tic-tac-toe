export const updateTableField = (
  userName,
  tableID,
  userNumber,
  rankPoints,
  currentTables
) => {
  return currentTables.map((table) => {
    if (tableID === table.id) {
      if (userNumber === 1) {
        return {
          ...table,
          user1: userName,
          user1RankPoints: rankPoints,
        };
      } else {
        return {
          ...table,
          user2: userName,
          user2RankPoints: rankPoints,
        };
      }
    } else {
      return table;
    }
  });
};
