// @flow

const {getHash, getHashParameters, onHashChange, route, routeSetup} = require('./index');

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
    const render = jest.fn();
    routeSetup(render);
    expect(global.addEventListener).toBeCalledWith('hashchange', expect.any(Function));
    expect(render).toBeCalled();
    global.addEventListener = save;
  });

  describe('onHashChange', () => {
    let globalEvtListener;

    beforeAll(() => {
      globalEvtListener = global.addEventListener;
      jest.useFakeTimers();
    });

    afterAll(() => {
      global.addEventListener = globalEvtListener;
      jest.useRealTimers();
    });

    beforeEach(() => {
      global.addEventListener = jest.fn();
    });

    test('calls handlers on change', () => {
      const render = jest.fn();
      const handler = jest.fn();

      // Do Setup
      routeSetup(render);

      // Register a change handler
      const unsub = onHashChange(handler);

      expect(global.addEventListener).toBeCalledWith(
        'hashchange',
        expect.any(Function)
      );
      expect(render).toBeCalled();

      const [[, evtListener]] = global.addEventListener.mock.calls;

      const name = 'some-hash';
      const p1 = 'param1';
      const p2 = 'param2';
      const hash = `${name}/${p1}/${p2}`;

      // Set a hash with params.
      route(hash);

      // Fire the event
      evtListener();

      // Run timers
      jest.runAllTimers();

      // Handler should be called
      expect(handler).toBeCalledWith(name, ['param1', 'param2']);

      // Reset Handler and Un-subscribe
      handler.mockReset();
      unsub();

      // Fire event
      evtListener();

      jest.runAllTimers();

      // Handler not called
      expect(handler).not.toBeCalled();
    });
  });

});
