export const updateTableField = (
  userName,
  tableID,
  userNumber,
  currentTables
) => {
  return currentTables.map((table) => {
    if (tableID === table.id) {
      if (userNumber === 1) {
        return {
          ...table,
          user1: userName,
        };
      } else {
        return {
          ...table,
          user2: userName,
        };
      }
    } else {
      return table;
    }
  });
};
