// Copyright 2015, 2016 Ethcore (UK) Ltd.
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

//! Stratum ipc interfaces specification

use std;
use std::error::Error as StdError;

#[derive(Debug, Clone)]
pub enum Error {
	NoWork,
	NoWorkers,
	Io(String),
}

impl From<std::io::Error> for Error {
	fn from(err: std::io::Error) -> Self {
		Error::Io(err.description().to_owned())
	}
}

/// Interface that can provide pow/blockchain-specific responses for the clients
pub trait JobDispatcher: Send + Sync {
	// json for initial client handshake
	fn initial(&self) -> Option<String> { None }
	// json for difficulty dispatch
	fn difficulty(&self) -> Option<String> { None }
	// json for job update given worker_id (payload manager should split job!)
	fn job(&self, _worker_id: &str) -> Option<String> { None }
}

/// Interface that can handle requests to push job for workers
pub trait PushWorkHandler: Send + Sync {
	/// push the same work package for all workers (`payload`: json of pow-specific set of work specification)
	fn push_work_all(&self, payload: String) -> Result<(), Error>;

	/// push the work packages worker-wise (`payload`: json of pow-specific set of work specification)
	fn push_work(&self, payloads: Vec<String>) -> Result<(), Error>;
}