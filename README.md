# React Is In Viewport

[![codecov](https://codecov.io/gh/davidnguyen179/react-is-in-viewport/branch/master/graph/badge.svg)](https://codecov.io/gh/davidnguyen179/react-is-in-viewport) [![Build Status](https://travis-ci.com/davidnguyen179/react-is-in-viewport.svg?branch=master)](https://travis-ci.com/davidnguyen179/react-is-in-viewport) [![Greenkeeper badge](https://badges.greenkeeper.io/davidnguyen179/react-is-in-viewport.svg)](https://greenkeeper.io/) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/davidnguyen179/react-is-in-viewport/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

<hr />

Component allows to track the React components in the viewport

## Installation

```bash
npm i react-is-in-viewport --save
```

or

```bash
yarn add react-is-in-viewport
```

## Usage

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
