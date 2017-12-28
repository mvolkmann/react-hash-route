# react-hash-route

This small library provides support for hash-based routing
in the client side of web applications.
It is primarily intended for use in React applications,
but may also be useful with other frameworks.
This is much simpler than using react-router and
does not use JSX-based syntax for route configuration.

## Benefits

* This library is much simpler to learn and use than react-router,
  yet it does everything I need for routing.
* Routing is a kind of configuration that is different from UI markup.
  Using JSX for this feels wrong, so this library doesn't do that.
* This library makes it very easy to change the route inside a component method.
  It just requires a call to the `route` function , passing it a hash name.
* Nothing extra is required to support remembering the route
  if the user refreshes the browser.
  Getting this to work with react-router seems tedious.

## Setup

In the topmost source file, likely named `index.js`,
add the following which assumes the topmost component is `App`:

```js
import {routeSetup} from 'react-hash-route';

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

routeSetup(render);
```

Suppose your app has the following requirements:
* There are pages to login, edit user profile, and place an order.
* A common "header" should be rendered at the top of every page.
* If an unsupported URL hash is used, the app should route to the login page.

In the source file that defines the `App` component
add something like the following:

```js
import {getHash} from 'react-hash-route';
import Header from './header';
import Login from './login';
import Order from './order';
import Profile from './profile';

const componentMap = {
  login: <Login />,
  profile: <Profile />,
  order: <Order />
};

const App = () => (
  <div>
    <Header />
    {componentMap[getHash() || 'login']}
  </div>
);

export default App;
```

Suppose the header component contains links for
navigating to the login, order, and profile pages.
Add something like the following in `header.js`.

```js
import React, {Component} from 'react';
import {route} from '../util/route';

class Header extends Component {

  onLogin = () => route('login');
  onOrder = () => route('order');
  onProfile = () => route('profile');

  render() {
    return (
      <div>
        <a key="login" onClick={this.onLogin}>Login</a>
        <a key="order" onClick={this.onOrder}>Order</a>
        <a key="profile" onClick={this.onProfile}>Profile</a>
      </div>
    );
  }
}
```

Suppose on the order page
we want to verify that the user is logged in
and reroute to the login page if they have not.
Add something like the following in the
`render` method of the `Order` component.

```js
if (!authenticated) return route('login');
```

There are several approaches that can be used to
make data available to component after a route change.
Probably the best is to put data in Redux state
and have other components can access it from there.
Another approach is to use what this library refers to as "hash parameters".
These are just values are appended to the route name and begin with a slash.
For example, `route('order/discount/20')`.
Inside the `Order` component, these "hash parameters"
can be retrieved with the following:

```js
import {getHashParameters} from 'react-hash-route';

// Inside some method ...
const [adjustment, amount] = getHashParameters();
```

That's everything to you need to know to use react-hash-route.
Code simply!

If you like this, also check out
https://www.npmjs.com/package/redux-easy.
