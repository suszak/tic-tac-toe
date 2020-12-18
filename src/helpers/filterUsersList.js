export const filterUsersList = ({ users, setDataToShow, setCurrentPage }) => {
  const filterValue = document.querySelector("#filter").value;
  console.log(filterValue);
  if (filterValue.length > 0) {
    const result = users.filter(
      (user) =>
        user.login.toUpperCase().indexOf(filterValue.toUpperCase()) !== -1
    );
    setDataToShow(result);
    setCurrentPage(1);
  } else {
    setDataToShow(users);
    setCurrentPage(1);
  }
};
