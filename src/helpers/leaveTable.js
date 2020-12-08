export const leaveTable = (tables, userName) => {
  const inGame = tables.find((item) => {
    return item.user1 === userName || item.user2 === userName;
  });

  if (inGame !== undefined) {
    let newTables = [...tables];
    newTables[inGame.id - 1] = {
      ...newTables[inGame.id - 1],
      user1:
        newTables[inGame.id - 1].user1 === userName
          ? ""
          : newTables[inGame.id - 1].user1,
      user2:
        newTables[inGame.id - 1].user2 === userName
          ? ""
          : newTables[inGame.id - 1].user2,
    };

    return newTables;
  } else {
    return tables;
  }
};
