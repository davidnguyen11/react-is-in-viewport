# React In Screen

[![Build Status](https://travis-ci.com/davidnguyen179/viewport.svg?branch=master)](https://travis-ci.com/davidnguyen179/viewport) [![Greenkeeper badge](https://badges.greenkeeper.io/davidnguyen179/viewport.svg)](https://greenkeeper.io/)

<hr />

Screen component allows to track the React components in the viewport

## Installation

```bash
npm i react-in-screen --save
```

or

```bash
yarn add react-in-screen
```

## Usage

```tsx
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Screen } from 'react-in-screen';

class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <Screen type="overlap" onEnter={this.onEnterRed} onLeave={this.onLeaveRed}>
            <div style={{ height: 100, background: 'red' }}></div>
          </Screen>
        </div>

        <div style={{ marginTop: '200%' }}>
          <Screen type="overlap" onEnter={this.onEnterBlue} onLeave={this.onLeaveBlue}>
            <div style={{ height: 100, background: 'blue' }}></div>
          </Screen>
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
