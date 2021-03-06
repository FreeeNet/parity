// Copyright 2015, 2016 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { inAddress, inAddresses, inData, inHex, inNumber16, inOptions } from '../../format/input';
import { outAccountInfo, outAddress, outAddresses, outChainStatus, outHistogram, outNumber, outPeers, outTransaction } from '../../format/output';

export default class Parity {
  constructor (transport) {
    this._transport = transport;
  }

  acceptNonReservedPeers () {
    return this._transport
      .execute('parity_acceptNonReservedPeers');
  }

  accountsInfo () {
    return this._transport
      .execute('parity_accountsInfo')
      .then(outAccountInfo);
  }

  allAccountsInfo () {
    return this._transport
      .execute('parity_allAccountsInfo')
      .then(outAccountInfo);
  }

  addReservedPeer (encode) {
    return this._transport
      .execute('parity_addReservedPeer', encode);
  }

  chainStatus () {
    return this._transport
      .execute('parity_chainStatus')
      .then(outChainStatus);
  }

  changePassword (account, password, newPassword) {
    return this._transport
      .execute('parity_changePassword', inAddress(account), password, newPassword);
  }

  checkRequest (requestId) {
    return this._transport
      .execute('parity_checkRequest', inNumber16(requestId));
  }

  consensusCapability () {
    return this._transport
      .execute('parity_consensusCapability');
  }

  dappsPort () {
    return this._transport
      .execute('parity_dappsPort')
      .then(outNumber);
  }

  dappsInterface () {
    return this._transport
      .execute('parity_dappsInterface');
  }

  defaultExtraData () {
    return this._transport
      .execute('parity_defaultExtraData');
  }

  devLogs () {
    return this._transport
      .execute('parity_devLogs');
  }

  devLogsLevels () {
    return this._transport
      .execute('parity_devLogsLevels');
  }

  dropNonReservedPeers () {
    return this._transport
      .execute('parity_dropNonReservedPeers');
  }

  enode () {
    return this._transport
      .execute('parity_enode');
  }

  executeUpgrade () {
    return this._transport
      .execute('parity_executeUpgrade');
  }

  extraData () {
    return this._transport
      .execute('parity_extraData');
  }

  gasFloorTarget () {
    return this._transport
      .execute('parity_gasFloorTarget')
      .then(outNumber);
  }

  gasPriceHistogram () {
    return this._transport
      .execute('parity_gasPriceHistogram')
      .then(outHistogram);
  }

  generateSecretPhrase () {
    return this._transport
      .execute('parity_generateSecretPhrase');
  }

  getDappsAddresses (dappId) {
    return this._transport
      .execute('parity_getDappsAddresses', dappId)
      .then(outAddresses);
  }

  getNewDappsWhitelist () {
    return this._transport
      .execute('parity_getNewDappsWhitelist')
      .then((addresses) => addresses ? addresses.map(outAddress) : null);
  }

  hashContent (url) {
    return this._transport
      .execute('parity_hashContent', url);
  }

  importGethAccounts (accounts) {
    return this._transport
      .execute('parity_importGethAccounts', inAddresses)
      .then(outAddresses);
  }

  killAccount (account, password) {
    return this._transport
      .execute('parity_killAccount', inAddress(account), password);
  }

  listRecentDapps () {
    return this._transport
      .execute('parity_listRecentDapps');
  }

  removeAddress (address) {
    return this._transport
      .execute('parity_removeAddress', inAddress(address));
  }

  listGethAccounts () {
    return this._transport
      .execute('parity_listGethAccounts')
      .then(outAddresses);
  }

  localTransactions () {
    return this._transport
      .execute('parity_localTransactions')
      .then(transactions => {
        Object.values(transactions)
          .filter(tx => tx.transaction)
          .map(tx => {
            tx.transaction = outTransaction(tx.transaction);
          });
        return transactions;
      });
  }

  minGasPrice () {
    return this._transport
      .execute('parity_minGasPrice')
      .then(outNumber);
  }

  mode () {
    return this._transport
      .execute('parity_mode');
  }

  netChain () {
    return this._transport
      .execute('parity_netChain');
  }

  netPeers () {
    return this._transport
      .execute('parity_netPeers')
      .then(outPeers);
  }

  netMaxPeers () {
    return this._transport
      .execute('parity_netMaxPeers')
      .then(outNumber);
  }

  netPort () {
    return this._transport
      .execute('parity_netPort')
      .then(outNumber);
  }

  newAccountFromPhrase (phrase, password) {
    return this._transport
      .execute('parity_newAccountFromPhrase', phrase, password)
      .then(outAddress);
  }

  newAccountFromSecret (secret, password) {
    return this._transport
      .execute('parity_newAccountFromSecret', inHex(secret), password)
      .then(outAddress);
  }

  newAccountFromWallet (json, password) {
    return this._transport
      .execute('parity_newAccountFromWallet', json, password)
      .then(outAddress);
  }

  nextNonce (account) {
    return this._transport
      .execute('parity_nextNonce', inAddress(account))
      .then(outNumber);
  }

  nodeName () {
    return this._transport
      .execute('parity_nodeName');
  }

  pendingTransactions () {
    return this._transport
      .execute('parity_pendingTransactions')
      .then(data => data.map(outTransaction));
  }

  pendingTransactionsStats () {
    return this._transport
      .execute('parity_pendingTransactionsStats');
  }

  phraseToAddress (phrase) {
    return this._transport
      .execute('parity_phraseToAddress', phrase)
      .then(outAddress);
  }

  postTransaction (options) {
    return this._transport
      .execute('parity_postTransaction', inOptions(options));
  }

  registryAddress () {
    return this._transport
      .execute('parity_registryAddress')
      .then(outAddress);
  }

  releasesInfo () {
    return this._transport
      .execute('parity_releasesInfo');
  }

  removeReservedPeer (encode) {
    return this._transport
      .execute('parity_removeReservedPeer', encode);
  }

  rpcSettings () {
    return this._transport
      .execute('parity_rpcSettings');
  }

  setAccountName (address, name) {
    return this._transport
      .execute('parity_setAccountName', inAddress(address), name);
  }

  setAccountMeta (address, meta) {
    return this._transport
      .execute('parity_setAccountMeta', inAddress(address), JSON.stringify(meta));
  }

  setAuthor (address) {
    return this._transport
      .execute('parity_setAuthor', inAddress(address));
  }

  setDappsAddresses (dappId, addresses) {
    return this._transport
      .execute('parity_setDappsAddresses', dappId, inAddresses(addresses));
  }

  setExtraData (data) {
    return this._transport
      .execute('parity_setExtraData', inData(data));
  }

  setGasFloorTarget (quantity) {
    return this._transport
      .execute('parity_setGasFloorTarget', inNumber16(quantity));
  }

  setMinGasPrice (quantity) {
    return this._transport
      .execute('parity_setMinGasPrice', inNumber16(quantity));
  }

  setMode (mode) {
    return this._transport
      .execute('parity_setMode', mode);
  }

  setNewDappsWhitelist (addresses) {
    return this._transport
      .execute('parity_setNewDappsWhitelist', addresses ? inAddresses(addresses) : null);
  }

  setTransactionsLimit (quantity) {
    return this._transport
      .execute('parity_setTransactionsLimit', inNumber16(quantity));
  }

  signerPort () {
    return this._transport
      .execute('parity_signerPort')
      .then(outNumber);
  }

  testPassword (account, password) {
    return this._transport
      .execute('parity_testPassword', inAddress(account), password);
  }

  transactionsLimit () {
    return this._transport
      .execute('parity_transactionsLimit')
      .then(outNumber);
  }

  unsignedTransactionsCount () {
    return this._transport
      .execute('parity_unsignedTransactionsCount')
      .then(outNumber);
  }

  upgradeReady () {
    return this._transport
      .execute('parity_upgradeReady');
  }

  versionInfo () {
    return this._transport
      .execute('parity_versionInfo');
  }
}
