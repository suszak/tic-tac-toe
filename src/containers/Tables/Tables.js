import React from "react";
import "./Tables.scss";
import TablesOverview from "../../components/TablesOverview/TablesOverview.js";
import Ranking from "../../components/Ranking/Ranking";

function Tables() {
  return (
    <div className="tablesWrapper">
      <TablesOverview />
      <Ranking />
    </div>
  );
}

export default Tables;
