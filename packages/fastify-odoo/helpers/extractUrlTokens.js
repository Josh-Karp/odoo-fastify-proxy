"use strict";

function extractUrlTokens(url) {
  const match = url.match(/(https?):\/\/([^:]+):(\d+)/);
  if (!match) {
    return null;
  }
  return {
    protocol: match[1],
    host: match[2],
    port: match[3],
  };
}

module.exports = extractUrlTokens;
