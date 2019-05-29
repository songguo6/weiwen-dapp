import { Api, JsonRpc } from 'eosjs'

import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'

const appName = '微文';
const contract = 'weiwendappss';

// jungle testnet
const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'jungle2.cryptolions.io',
  port: 443,
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
};

// local
// const network = {
//   blockchain: 'eos',
//   protocol: 'http',
//   host: '127.0.0.1',
//   port: 8888,
//   chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
// };

// mainnet
// const network = {
//   blockchain: 'eos',
//   protocol: 'https',
//   host: 'api.eosnewyork.io',
//   port: 80,
//   chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
// };

ScatterJS.plugins(new ScatterEOS());

const signatureProvider = ScatterJS.scatter.eosHook(network, null, true);
const url = network.protocol + '://' + network.host + ':' + network.port;

const rpc = new JsonRpc(url, { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  chainId: network.chainId,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

export { api, rpc, network, appName, contract }