let hashSubs;

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

function setupListener(render) {
  hashSubs = [];

  window.addEventListener('hashchange', () => {
    render();
    const hash = getHash();
    const parameters = getHashParameters();
    hashSubs.forEach(sub => {
      setTimeout(sub, 0, hash, parameters);
    });
  });
}

/**
 * Can add a handler to be called when the
 * hash changes.
 *
 * On a change event, the handler will be
 * called with an object that contains the
 * current `hash` and `parameters`.
 *
 * Returns a function that can be called
 * to unsubscribe the handler.  If this
 * is being used in a component, the
 * unsubscribe should be called when the
 * component is unmounted to prevent
 * memory leaks.
 *
 */
function onHashChange(handler) {
  hashSubs = hashSubs.concat(handler);
  return () => {
    hashSubs = hashSubs.filter(sub => sub !== handler);
  };
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
  setupListener(render);
  render();
}

module.exports = {getHash, getHashParameters, onHashChange, route, routeSetup};
