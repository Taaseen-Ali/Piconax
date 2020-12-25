import {
  BeaconEvent,
  BeaconBaseMessage,
  DAppClient,
  PermissionScope,
  PermissionResponseOutput,
  PartialTezosTransactionOperation,
  OperationResponseOutput,
  AccountInfo,
  defaultEventCallbacks,
  NetworkType,
  TezosOperationType,
  TezosTransactionOperation,
} from "@airgap/beacon-sdk";

export const client = new DAppClient({
  name: "Piconax",
  eventHandlers: {
    [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: {
      handler: async (syncInfo): Promise<void> => {
        /* await defaultEventCallbacks.P2P_LISTEN_FOR_CHANNEL_OPEN(syncInfo) */
        console.log("syncInfo", syncInfo);
        console.log(`galleon://beaconRegistration?r=${btoa(JSON.stringify(syncInfo))}`);
        var win = window.open(`galleon://beaconRegistration?r=${btoa(JSON.stringify(syncInfo))}`);
        // var win = window.open(`microlleon://open?name=${syncInfo.name}&publicKey=${syncInfo.publicKey}&relayServer=${syncInfo.relayServer}`, '_blank');
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        } else {
          //Browser has blocked it
          alert("Please allow popups for this website");
        }
      },
    },
  },
});

export async function connect(network: NetworkType) {
  const activeAccount = await client.getActiveAccount();
  if (activeAccount) return activeAccount;

  const permissionResponse: PermissionResponseOutput | void = await client
    .requestPermissions({
      network: {
        type: network,
      },
    })
    .then((response: PermissionResponseOutput) => {
      console.log("permissions", response);
      return response;
    })
    .catch((permissionError: BeaconBaseMessage) =>
      console.error(permissionError)
    );

  return permissionResponse;
}

export async function send(operation: PartialTezosTransactionOperation) {
  client
    .requestOperation({
      operationDetails: [operation],
    })
    .then((response: OperationResponseOutput) => {
      console.log("transaction hash", response.transactionHash);
    })
    .catch((operationError: BeaconBaseMessage) =>
      console.error(operationError)
    );
}
