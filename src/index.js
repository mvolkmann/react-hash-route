function getHash() {
  const {hash} = window.location;
  const parts = hash.split('/'); // separates hash parameters
  return parts[0].substring(1); // removes leading #
}

/**
 * All the parts of the hash separated by slashes
 * except the first part are treated as "hash parameters".
 */
function getHashParameters() {
  const {hash} = window.location;
  const parts = hash.split('/');
  parts.shift(); // removes first part
  return parts;
}

/**
 * Changes the current "route"
 * and returns null so render methods can
 * return the result of calling this
 * to render nothing AND change the route.
 */
function route(hash) {
  window.location.hash = hash;
  return null; // Don't remove this!
}

function routeSetup(render) {
  window.addEventListener('hashchange', render);
}

module.exports = {getHash, getHashParameters, route, routeSetup};
