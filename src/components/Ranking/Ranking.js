import React, { useState, useEffect } from "react";
import "./Ranking.scss";
import axios from "../../axios.js";

function Ranking() {
  const [top5Users, setTop5Users] = useState([]);

  const getTop5Users = async () => {
    return await axios.get("/topUsers/");
  };

  useEffect(() => {
    getTop5Users().then((response) => {
      if (!response.error) {
        setTop5Users(response.data);
      }
    });
  }, []);

  return (
    <div className="ranking">
      {/* Show top 5 users */}
      <ul>
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
