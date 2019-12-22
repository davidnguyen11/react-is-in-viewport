import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Viewport } from '../';

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      enterRed: 0,
      focusRed: 0,
      leaveRed: 0,
      enterBlue: 0,
      leaveBlue: 0
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <div style={{ marginTop: '50%' }}>
          <Viewport
            autoTrack
            type="fit"
            onEnter={this.onEnterRed}
            onLeave={this.onLeaveRed}
            onFocusOut={this.onFocusOut}
          >
            <div style={{ height: 100, background: 'red' }}></div>
            <div>Did focus on component: {this.state.focusRed}</div>
            <div>Enter component: {this.state.enterRed}</div>
            <div>Leave component: {this.state.leaveRed}</div>
          </Viewport>
        </div>

        <div style={{ marginTop: '200%' }}>
          <Viewport type="overlap" onEnter={this.onEnterBlue} onLeave={this.onLeaveBlue}>
            <div style={{ height: 100, background: 'blue' }}></div>
            <div>Enter component: {this.state.enterBlue}</div>
            <div>Leave component: {this.state.leaveBlue}</div>
          </Viewport>
        </div>
      </div>
    );
  }

  private onEnterRed = (enterRed: number) => {
    console.log('enter red', enterRed);
    this.setState({ enterRed });
  };

  private onLeaveRed = (leaveRed: number) => {
    console.log('leave red', leaveRed);
    this.setState({ leaveRed });
  };

  private onFocusOut = (focusRed: number) => {
    console.log('out focus red', focusRed);
    this.setState({ focusRed });
  };

  private onEnterBlue = (enterBlue: number) => {
    console.log('enter blue', enterBlue);
    this.setState({ enterBlue });
  };

  private onLeaveBlue = (leaveBlue: number) => {
    console.log('leave blue', leaveBlue);
    this.setState({ leaveBlue });
  };
}

interface State {
  enterRed: number;
  focusRed: number;
  leaveRed: number;
  enterBlue: number;
  leaveBlue: number;
}

ReactDOM.render(<App />, document.getElementById('root'));
