// @flow

const {getHash, getHashParameters, route, routeSetup} = require('./index');

describe('route', () => {
  test('route and getHash work', () => {
    const name = 'some-hash';
    const p1 = 'param1';
    const p2 = 'param2';
    const hash = `${name}/${p1}/${p2}`;
    route(hash);
    expect(getHash()).toBe(name);
    expect(getHashParameters()).toEqual([p1, p2]);
  });

  test('routeSetup', () => {
    const save = global.addEventListener;
    global.addEventListener = jest.fn();
    const render = () => {};
    routeSetup(render);
    expect(global.addEventListener).toBeCalledWith('hashchange', render);
    global.addEventListener = save;
  });
});
