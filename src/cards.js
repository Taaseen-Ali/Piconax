import React from "react";
import { connect, send } from "./beacon";
import { NetworkType, TezosOperationType } from "@airgap/beacon-sdk";

function getNetwork(net) {
  const stringToNetwork = {
    testnet: NetworkType.DELPHINET,
    mainnet: NetworkType.MAINNET,
  };

  return stringToNetwork[net];
}

export class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card">
        <p>{this.props.name}</p> <hr />
        <div className="card-content">{this.props.children}</div>
      </div>
    );
  }
}

export class PermissionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "There's no account currently connected",
      network: "",
      selectedNet: "mainnet",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, selectedNet: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await connect(getNetwork(this.state.selectedNet));

    this.setState({
      ...this.state,
      account: response.address,
      network: response.network.type,
    });
  }

  render() {
    return (
      <Card name="Permission">
        <p>Address: {this.state.account}</p>
        <p>Network: {this.state.network}</p>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="mainnet">Mainnet</option>
          <option value="testnet">Delphinet</option>
        </select>
        <button className="btn-permission" onClick={this.handleSubmit}>
          Connect to Wallet!
        </button>
        {/* <p id="qr-data"> Beacon QR data will appear here </p> */}
      </Card>
    );
  }
}

export class TransactionCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { destination: "", amount: "" };
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await send({
      kind: TezosOperationType.TRANSACTION,
      amount: this.state.amount,
      destination: this.state.destination,
    });
  }

  render() {
    return (
      <Card name="Transaction">
        <input
          value={this.state.destination}
          type="text"
          name="destination"
          placeholder="Destination"
          onChange={this.handleChange}
        />
        <input
          value={this.state.amount}
          type="text"
          name="amount"
          placeholder="Amount"
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleSubmit}>Send</button>
      </Card>
    );
  }
}

export class ContractCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", amount: undefined, entrypoint: "", params: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await send({
      kind: TezosOperationType.TRANSACTION,
      amount: this.state.amount,
      destination: this.state.address,
      parameters: {
        entrypoint: this.state.entrypoint,
        value: JSON.parse(this.state.params),
      },
    });
  }

  render() {
    return (
      <Card name="Contract">
        <input
          value={this.state.address}
          type="text"
          name="address"
          placeholder="Address"
          onChange={this.handleChange}
        />
        <input
          value={this.state.amount}
          type="text"
          name="amount"
          placeholder="Amount (µtz)"
          onChange={this.handleChange}
        />
        <input
          value={this.state.entrypoint}
          type="text"
          name="entrypoint"
          placeholder="Entrypoint"
          onChange={this.handleChange}
        />
        <input
          value={this.state.params}
          type="text"
          name="params"
          placeholder="Parameters (Micheline)"
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </Card>
    );
  }
}
