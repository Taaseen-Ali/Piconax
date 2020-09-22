import {
    BeaconEvent,
    BeaconErrorMessage,
    DAppClient,
    PermissionScope,
    PermissionResponseOutput,
    OperationResponseOutput,
    P2PPairInfo,
    AccountInfo,
    defaultEventCallbacks,
    NetworkType,
    TezosOperationType,
    TezosTransactionOperation
} from '@airgap/beacon-sdk'

const client = new DAppClient({ name: 'Piconax',
				eventHandlers: {
				    [BeaconEvent.P2P_LISTEN_FOR_CHANNEL_OPEN]: {
					handler: async (syncInfo: P2PPairInfo): Promise<void> => {
					    /* await defaultEventCallbacks.P2P_LISTEN_FOR_CHANNEL_OPEN(syncInfo) */
					    console.log('syncInfo', syncInfo)
					    console.log(`galleon://beaconRegistration?r=${btoa(JSON.stringify(syncInfo))}`)
					    var win = window.open(`galleon://beaconRegistration?r=${btoa(JSON.stringify(syncInfo))}`);
					    // var win = window.open(`microlleon://open?name=${syncInfo.name}&publicKey=${syncInfo.publicKey}&relayServer=${syncInfo.relayServer}`, '_blank');
					    if (win) {
						//Browser has allowed it to be opened
						win.focus();
					    } else {
						//Browser has blocked it
						alert('Please allow popups for this website');
					    }
					}
				    }
				}

});


export async function connect(network: NetworkType) {
    const activeAccount = await client.getActiveAccount()
    if (activeAccount) 
	return activeAccount

    const permissionResponse: PermissionResponseOutput | void = await client
	.requestPermissions({
	    network:
	    {
		type: network,
	    }
	})
	.then((response: PermissionResponseOutput) => {
	    console.log('permissions', response)
	    return response
	})
	.catch((permissionError: BeaconErrorMessage) => console.error(permissionError))

    return permissionResponse
}

export async function send(operation: TezosTransactionOperation) {
    client
	.requestOperation({
	    operationDetails: [operation]
	})
	.then((response: OperationResponseOutput) => {
	    console.log('transaction hash', response.transactionHash)
	})
	.catch((operationError: BeaconErrorMessage) => console.error(operationError))
}
