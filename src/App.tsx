import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Viewport } from './';

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
