import { store } from "react-notifications-component";

export const joinTable = ({
  tableID,
  userNumber,
  tables,
  user,
  rankPoints,
}) => {
  if (
    tables.find((item) => {
      return item.user1 === user.login || item.user2 === user.login;
    }) !== undefined
  ) {
    store.addNotification({
      title: "Can't join!",
      message: "You're already in game.",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    return { changed: false };
  } else {
    return {
      userName: user.login,
      rankPoints: rankPoints,
      tableID: tableID,
      userNumber: userNumber,
      currentTables: tables,
      changed: true,
    };
  }
};
