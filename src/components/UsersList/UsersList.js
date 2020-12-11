import React, { useEffect, useState } from "react";
import "./UsersList.scss";
import { filterUsersList } from "../../helpers/filterUsersList";
import Pages from "../Pages/Pages";
import TableItem from "../TableItem/TableItem";

function UsersList({ allUsers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [dataToShow, setDataToShow] = useState([]);

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = dataToShow.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(dataToShow.length / usersPerPage);

  //  Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setDataToShow(allUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers]);

  return (
    <section className="usersList">
      <section className="search">
        <input
          type="text"
          id="filter"
          onChange={() =>
            filterUsersList(allUsers, setDataToShow, setCurrentPage)
          }
          className="search__input"
          placeholder="Type user name here..."
        ></input>
      </section>

      <main className="usersList__main">
        <ul className="table">
          <li className="table__header">
            <p className="header__element">User name</p>
            <p className="header__element">Admin status</p>
            <p className="header__element">Password</p>
            <p className="header__element">Delete</p>
          </li>

          {currentUsers.map((user, index) => (
            <TableItem key={index} userLogin={user.login} isAdmin={user.isAdmin} />
          ))}
        </ul>
      </main>

      <Pages
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </section>
  );
}

export default UsersList;
