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

import { action, computed, observable, transaction } from 'mobx';

import { newError } from '~/redux/actions';
import { validateName } from '~/util/validation';

export default class Store {
  @observable address = null;
  @observable isAccount = false;
  @observable description = null;
  @observable meta = null;
  @observable name = null;
  @observable nameError = null;
  @observable passwordHint = null;
  @observable tags = null;

  constructor (api, account) {
    const { address, name, meta, uuid } = account;

    this._api = api;

    transaction(() => {
      this.isAccount = !!uuid;
      this.address = address;
      this.meta = meta || {};
      this.name = name || '';

      this.description = this.meta.description || '';
      this.passwordHint = this.meta.passwordHint || '';
      this.tags = this.meta.tags && this.meta.tags.peek() || [];
    });
  }

  @computed get hasError () {
    return !!(this.nameError);
  }

  @action setDescription = (description) => {
    this.description = description;
  }

  @action setName = (_name) => {
    const { name, nameError } = validateName(_name);

    transaction(() => {
      this.name = name;
      this.setNameError(nameError);
    });
  }

  @action setNameError = (nameError) => {
    this.nameError = nameError;
  }

  @action setPasswordHint = (passwordHint) => {
    this.passwordHint = passwordHint;
  }

  @action setTags = (tags) => {
    this.tags = tags.slice();
  }

  save () {
    const meta = {
      description: this.description,
      tags: this.tags.peek()
    };

    if (this.isAccount) {
      meta.passwordHint = this.passwordHint;
    }

    return Promise
      .all([
        this._api.parity.setAccountName(this.address, this.name),
        this._api.parity.setAccountMeta(this.address, Object.assign({}, this.meta, meta))
      ])
      .catch((error) => {
        console.error('onSave', error);

        newError(error);
      });
  }
}
