import React from 'react';
import { Card, TransactionCard, PermissionCard } from './cards';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Dashboard'>
              <PermissionCard/>
              <TransactionCard/>
              <Card name="Contract"/>
              <Card name="Other"/>
            </div>
        );
    }
}

export default Dashboard;
