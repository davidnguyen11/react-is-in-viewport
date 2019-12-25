# React Is In Viewport

[![codecov](https://codecov.io/gh/davidnguyen179/react-is-in-viewport/branch/master/graph/badge.svg)](https://codecov.io/gh/davidnguyen179/react-is-in-viewport) [![Build Status](https://travis-ci.com/davidnguyen179/react-is-in-viewport.svg?branch=master)](https://travis-ci.com/davidnguyen179/react-is-in-viewport) [![Greenkeeper badge](https://badges.greenkeeper.io/davidnguyen179/react-is-in-viewport.svg)](https://greenkeeper.io/) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/davidnguyen179/react-is-in-viewport/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<hr />

The component allows to track the other React components whether or not it is in the Viewport.

## Installation

To install, you can use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/):

```bash
$ npm install react-is-in-viewport
$ yarn add react-is-in-viewport
```

## Props

| Name| Type  | Default value  | Description
|--|--|--|--|
| children | React Node or string |  | React component or string that display in UI  |
| delay | number  | 100  | Delay time to execute scrolling event callback |
| type | 'fit'  or  'overlap'  | fit  | Mode to track component fits in the viewport or overlaps with viewport |
| id | string  |  | Identifier of Viewport |
| className | string  |  | Custom CSS class |
| autoTrack | boolean  | false | It will count how many `seconds` the user spending on the component |
| waitToStartAutoTrack | number  |  | After waiting how many `seconds`, then starting the auto track on the component |

> The `autoTrack` only works with `type = fit`

Here is how `type = 'fit'` and `type = 'overlap'` look like:

**fit**

<img width="150" alt="Screen Shot 2019-12-22 at 17 10 58" src="https://user-images.githubusercontent.com/6290720/71319400-46a9dc00-24e1-11ea-81ee-85e1bd40ca08.png">

**overlap**

<img width="150" alt="Screen Shot 2019-12-22 at 17 11 05" src="https://user-images.githubusercontent.com/6290720/71319410-66d99b00-24e1-11ea-9fe9-96fc68d11aa2.png">


## API

| Name| Type  | Parameter  | Description
|--|--|--|--|
| onLoad | void  |  | When component first appears in the viewport |
| onEnter | void  | enterCount  | When scrolling to a component, the `enterCount` increase 1 |
| onLeave | void  | leaveCount  | When scrolling away from a component, the `leaveCount` increase 1 |
| onFocusOut | void  | focusCount  | When component is not in the viewport, then `onFocusOut` called with seconds user spent on the component |

## Example

**With `overlap` & `fit` mode**

[https://codesandbox.io/s/react-is-in-viewport-fit-overlap-mode-zx897](https://codesandbox.io/s/react-is-in-viewport-fit-overlap-mode-zx897)

```jsx
import ReactDOM from 'react-dom';
import React from 'react';
import { Viewport } from 'react-is-in-viewport';

class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <Viewport
            type="fit"
            onLoad={this.onLoadRed}
            onEnter={this.onEnterRed}
            onLeave={this.onLeaveRed}
          >
            <div style={{ height: 100, background: 'red' }}></div>
          </Viewport>
        </div>

        <div style={{ marginTop: '200%' }}>
          <Viewport type="overlap" onEnter={this.onEnterBlue} onLeave={this.onLeaveBlue}>
            <div style={{ height: 100, background: 'blue' }}></div>
          </Viewport>
        </div>
      </div>
    );
  }

  onLoadRed = () => {
    console.log('component RED loaded')
  };

  onEnterRed = (enterTimes) => {
    console.log('enter red', enterTimes);
  };

  onLeaveRed = (leaveTimes) => {
    console.log('leave red', leaveTimes);
  };

  onEnterBlue = (enterTimes) => {
    console.log('enter blue', enterTimes);
  };

  onLeaveBlue = (leaveTimes) => {
    console.log('leave blue', leaveTimes);
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
```

**With `autoTrack` & `waitToStartAutoTrack` mode**

[https://codesandbox.io/s/react-is-in-viewport-autotrack-mode-9f9vz](https://codesandbox.io/s/react-is-in-viewport-autotrack-mode-9f9vz)

```jsx
import ReactDOM from 'react-dom';
import React from 'react';
import { Viewport } from 'react-is-in-viewport';

class App extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <Viewport
            autoTrack
            waitToStartAutoTrack={2}
            type="fit"
            onLoad={this.onLoadRed}
            onEnter={this.onEnterRed}
            onLeave={this.onLeaveRed}
            onFocusOut={this.onFocusOut}
          >
            <div style={{ height: 100, background: 'red' }}></div>
          </Viewport>
        </div>

        <div style={{ marginTop: '200%' }}>
          <Viewport type="overlap" onEnter={this.onEnterBlue} onLeave={this.onLeaveBlue}>
            <div style={{ height: 100, background: 'blue' }}></div>
          </Viewport>
        </div>
      </div>
    );
  }

  onLoadRed = () => {
    console.log('component RED loaded')
  };

  onEnterRed = (enterTimes) => {
    console.log('enter red', enterTimes);
  };

  onLeaveRed = (leaveTimes) => {
    console.log('leave red', leaveTimes);
  };

  onFocusOut = (focusTimes) => {
    console.log('out focus red', focusTimes);
  };

  onEnterBlue = (enterTimes) => {
    console.log('enter blue', enterTimes);
  };

  onLeaveBlue = (leaveTimes) => {
    console.log('leave blue', leaveTimes);
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
```
