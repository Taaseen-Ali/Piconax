import React from "react";
import { Card, TransactionCard, PermissionCard, ContractCard } from "./cards";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Dashboard">
        <PermissionCard />
        <TransactionCard />
        <ContractCard />
        <Card name="Other" />
      </div>
    );
  }
}

export default Dashboard;
