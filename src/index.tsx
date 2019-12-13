import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ViewPort } from './components/viewport/index';

class App extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <ViewPort type='overlap' onEnter={this.onEnterRed} onLeave={this.onLeaveRed}>
            <div style={{ height: 100, background: 'red' }}></div>
          </ViewPort>
        </div>

        <div style={{ marginTop: '200%' }}>
          <ViewPort type='overlap' onEnter={this.onEnterBlue} onLeave={this.onLeaveBlue}>
            <div style={{ height: 100, background: 'blue' }}></div>
          </ViewPort>
        </div>
      </div>
    );
  }

  private onEnterRed = (enterTimes: number) => {
    console.log('enter red', enterTimes);
  }

  private onLeaveRed = (leaveTimes: number) => {
    console.log('leave red', leaveTimes);
  }

  private onEnterBlue = (enterTimes: number) => {
    console.log('enter blue', enterTimes);
  }

  private onLeaveBlue = (leaveTimes: number) => {
    console.log('leave blue', leaveTimes);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
