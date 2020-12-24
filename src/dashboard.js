import React from "react";
import { client } from './beacon';
import { Card, TransactionCard, PermissionCard, ContractCard } from "./cards";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const init = async () => await client.init();
    init();
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
