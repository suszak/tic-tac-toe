import React, { useState, useEffect } from "react";
import "./Ranking.scss";
import axios from "../../axios.js";
import { useSelector } from "react-redux";

function Ranking() {
  const [top5Users, setTop5Users] = useState([]);
  const user = useSelector((state) => state.user);

  const getTop5Users = async () => {
    return await axios.get("/topUsers/");
  };

  useEffect(() => {
    if (user.login) {
      getTop5Users().then((response) => {
        if (!response.error) {
          setTop5Users(response.data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ranking">
      <header className="ranking__header">
        <h1 className="headerText">Top 5 players</h1>
      </header>
      {/* Show top 5 users */}
      <ul className="ranking__list">
        {top5Users.data?.length > 0
          ? top5Users.data.map((user, index) => {
              return (
                <li key={index + 1}>
                  {index + 1}. {user.login}: {user.rankPoints} points
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default Ranking;
