"use strict";

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

/**
 * A client for making JSON-RPC requests to an Odoo server.
 *
 * @class
 * @param {Object} options Odoo client configuration options.
 * @returns {Client}
 */
class Client {
  constructor({ db, ...options }) {
    this.options = options || {};
    this.objectId = new ObjectId();
    this.db = db;
  }

  /**
   * Retrieves a record from an Odoo model.
   *
   * @param {string} model The name of the Odoo model to retrieve.
   * @param {Object} params The parameters to pass with the request.
   * @param {number[]} params.ids An array of record IDs to retrieve.
   * @param {string[]} params.fields An array of field names to retrieve.
   * @returns {Promise<Object[]>} Promise that resolves with an array of record objects.
   */
  read = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "read",
      args: [params.ids],
      kwargs: {
        fields: params.fields,
        context: this.options?.context,
      },
    });
  };

  /**
   * Writes to a record in a model with the given id and parameters.
   *
   * @param {string} model The name of the Odoo model to write the record in.
   * @param {number} id The ID of the record to update.
   * @param {object} params The new values to set in the record.
   * @returns {Promise} Promise that resolves to the result of the write request.
   */
  write = (model, id, params) => {
    if (id) {
      return this.#request("/web/dataset/call_kw", {
        model: model,
        method: "write",
        args: [[id], params],
        kwargs: {
          context: this.options?.context,
        },
      });
    }
  };

  /**
   * Creates a new record in the specified model with the given parameters.
   *
   * @param {string} model The name of the Odoo model to create the new record in.
   * @param {object} params The values for the fields of the new record.
   * @returns {Promise} Promise that resolves to the ID of the newly created record.
   */
  create = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "create",
      args: [params],
      kwargs: {
        context: this.options?.context,
      },
    });
  };

  /**
   * Deletes a record with the specified ID from the model.
   *
   * @param {string} model The name of the Odoo model to delete the record from.
   * @param {number} id The ID of the record to delete.
   * @returns {Promise<Boolean>} Promise that resolves to the result of the delete request.
   */
  delete = (model, id) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "unlink",
      args: [[id]],
      kwargs: {
        context: this.options?.context,
      },
    });
  };

  /**
   * Searches for records in a model that match the specified domain, optionally limiting the number of results returned.
   *
   * @param {string} model The name of the Odoo model to search.
   * @param {Object} params An object containing search parameters.
   * @param {Array} params.domain An array of domain criteria to search for.
   * @param {number} [params.limit] An optional limit on the number of results to return.
   * @returns {Promise} Promise that resolves to record IDs of the search results.
   */
  search = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "search",
      args: [params.domain],
      kwargs: {
        context: this.options?.context,
        limit: params.limit,
      },
    });
  };

  /**
   *Search for records that match the specified domain and return the fields as specified in the params object.
   *
   * @param {string} model The name of the Odoo model to search.
   * @param {Object} params An object that contains search parameters and field specifications.
   * @param {Array} params.domain An array of domain criteria to search for.
   * @param {number} [params.offset=0] The offset from where the records are to be fetched.
   * @param {number} [params.limit=0] The maximum number of records to return.
   * @param {Array} [params.order] Sorting criteria.
   * @param {Array} [params.fields] Field names to return.
   * @returns {Promise} Promise that resolves to an array of matching records.
   */
  search_read = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "search_read",
      args: [],
      kwargs: {
        context: this.options?.context,
        domain: params.domain,
        offset: params.offset,
        limit: params.limit,
        order: params.order,
        fields: params.fields,
      },
    });
  };

  /**
   * Search for a single record by its ID and return the fields as specified in the params object.
   *
   * @param {string} model The name of the Odoo model to search.
   * @param {number} id The ID of the record to search.
   * @param {Object} [params] An object that contains search parameters and field specifications.
   * @returns {Promise<Array>} Promise that resolves to an array of matching records.
   */
  search_by_id = (model, id, params) => {
    const constructed_params = {
      domain: [["id", "=", id]],
      limit: 1,
      ...params,
    };
    return this.search_read(model, constructed_params);
  };

  /**
   * Generic JSON-RPC call to the provided endpoint with the given parameters. Requires a deeper understanding of the Odoo Web API.
   *
   * @param {string} endpoint The URL of the JSON-RPC endpoint.
   * @param {object} params An object containing the parameters to send.
   * @returns {Promise} Promise that resolves with the result of the JSON-RPC call.
   */
  rpc_call = (endpoint, params) => {
    return this.#request(endpoint, params);
  };

  #request = async (path, params) => {
    params = params || {};

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Openerp-Session-Id": this.options.sessionId,
        Accept: "application/json",
      },
      data: JSON.stringify({
        jsonrpc: "2.0",
        id: new Date().getUTCMilliseconds(),
        method: "rpc_call",
        params: params,
      }),
      withCredentials: false,
      baseURL: this.options.baseURL,
      url: path || "/",
    };

    try {
      const response = await axios(options);

      if (response.data.error) {
        console.error(err);
        return Promise.reject(response.data.error);
      }

      return response.data.result;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };
}

class ObjectId {
  constructor() {
    this.id = uuidv4();
  }

  getTimestamp() {
    const timestamp = parseInt(this.id.substr(0, 8), 16);
    return new Date(timestamp * 1000);
  }

  valueOf() {
    return this.id;
  }
}

module.exports = Client;
