# react-hash-route

This small library provides support for hash-based routing
in the client side of web applications.
It is primarily intended for use in React applications,
but may also be useful with other frameworks.
This is much simpler than using react-router and
does not use JSX-based syntax for route configuration.

## Setup

In the topmost source file, likely named `index.js`,
add the following which assumes the topmost component is `App`:

```js
import {routeSetup} from 'react-hash-route';

function render() {
  ReactDOM.render(<App />, getElementById('root'));
}

routeSetup(render);
```

Suppose your app has the following requirements:
* There pages to login, edit the user profile, and place an order.
* A common "header" should be rendered at the top of every page.
* If an unsupported URL hash is used, the app should route to the login page.

In the source file that defines the `App` component (
add something like the following:

```js
import {getHash} from 'react-hash-route';
import Header from './header';
import Login from './login';
import Order from './order';
import Profile from './profile';

const componentMap = {
  'login': <Login />,
  'profile': <Profile />,
  'order': <Order />
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
import {getHash, route} from '../util/route';

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
and reroute to the login page they have not.
Add something like the following in the
`render` method of the `Order` component.

```js
if (!authenticated) return route('login');
```

There are several approaches that can be used
to make data available to a route.
Probably the best is to put data in Redux state
that other components can access.
Another approach is to use what this package refers to as "hash parameters".
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
Keep on coding simply!
