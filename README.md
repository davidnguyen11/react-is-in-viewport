# React Is In Viewport

[![codecov](https://codecov.io/gh/davidnguyen179/react-is-in-viewport/branch/master/graph/badge.svg)](https://codecov.io/gh/davidnguyen179/react-is-in-viewport) [![Build Status](https://travis-ci.com/davidnguyen179/react-is-in-viewport.svg?branch=master)](https://travis-ci.com/davidnguyen179/react-is-in-viewport) [![Greenkeeper badge](https://badges.greenkeeper.io/davidnguyen179/react-is-in-viewport.svg)](https://greenkeeper.io/) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/davidnguyen179/react-is-in-viewport/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<hr />

Component allows to track the other React components whether or not it is in the Viewport.

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
| type | 'fit'  or  'overlap'  | fit  | Mode to track component the component fits in the viewport or overlaps with viewport |
| id | string  |  | Identifier of Viewport |
| className | string  |  | Custom CSS class |

## API

| Name| Type  | Parameter  | Description
|--|--|--|--|
| onEnter | void  | enterCount  | When component is in the Viewport, the `enterCount` increase 1 |
| onLeave | void  | leaveCount  | When component is not in the Viewport, the `leaveCount` increase 1 |

## Example

Here is a simple example of `react-is-in-viewport`

```tsx
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Viewport } from 'react-is-in-viewport';

class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <Viewport type="overlap" onEnter={this.onEnterRed} onLeave={this.onLeaveRed}>
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

  private onEnterRed = (enterTimes: number) => {
    console.log('enter red', enterTimes);
  };

  private onLeaveRed = (leaveTimes: number) => {
    console.log('leave red', leaveTimes);
  };

  private onEnterBlue = (enterTimes: number) => {
    console.log('enter blue', enterTimes);
  };

  private onLeaveBlue = (leaveTimes: number) => {
    console.log('leave blue', leaveTimes);
  };
}

ReactDOM.render(<App />, document.getElementById('root'));
```