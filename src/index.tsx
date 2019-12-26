import * as React from 'react';
import { throttle } from 'throttle-debounce';
import { isFittedIn, isOverlapping } from './utils';

/**
 * Viewport component allow tracking the component when it appears in the viewport
 */
export class Viewport extends React.Component<Props> {
  public static defaultProps: Partial<DataProps> = {
    type: 'fit',
    delay: 100,
    autoTrack: false
  };

  private readonly screenRef = React.createRef<HTMLDivElement>();

  private isInScreen: (size: Size, rect: DOMRect) => boolean;

  private timer: number;

  private counter: Counter;

  private flag: Flag;

  constructor(props: Props) {
    super(props);

    this.counter = {
      enter: 0,
      focus: 0,
      leave: 0
    };

    this.flag = {
      isEntered: false,
      isLeft: false,
      isVisited: false
    };

    const func: Func = {
      fit: isFittedIn,
      overlap: isOverlapping
    };

    this.isInScreen = func[this.props.type];
  }

  public componentDidMount() {
    window.addEventListener('scroll', throttle(this.props.delay, this.handleScroll), {
      passive: true
    });
    /*
     * Check component is in viewport
     * Start increase enter times
     * Start the counter if `autoTrack` turns on
     */
    this.handleLoad();
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.resetTimer();
  }

  public render(): JSX.Element {
    return (
      <div className={this.props.className} id={this.props.id} ref={this.screenRef}>
        {this.props.children}
      </div>
    );
  }

  private handleScroll = () => {
    const size = this.getWidthHeight();
    const rect = this.screenRef.current.getBoundingClientRect();

    if (this.isInScreen(size, rect)) {
      this.handleEnter();
    } else {
      this.handleLeave();
    }
  };

  private handleLoad = () => {
    this.handleEnter(() => {
      this.setInternalFlag({ isVisited: true });
      if (this.props.onLoad) {
        this.props.onLoad();
      }
    });
  };

  private handleEnter = (callback?: () => void) => {
    const size = this.getWidthHeight();
    const rect = this.screenRef.current.getBoundingClientRect();

    if (this.isInScreen(size, rect)) {
      if (!this.flag.isEntered && !this.flag.isVisited && this.props.onEnter) {
        this.setInternalCounter({ enter: this.counter.enter + 1 });
        this.setInternalFlag({ isLeft: false, isEntered: true });
        this.props.onEnter(this.counter.enter);
        callback && callback();

        /*
         * Only start the auto track when it is in the `fit` mode
         */
        this.props.type === 'fit' && this.startTimer();
      }
    }
  };

  private handleLeave = () => {
    if (this.flag.isEntered && !this.flag.isLeft && this.props.onLeave) {
      this.setInternalCounter({ leave: this.counter.leave + 1 });
      this.setInternalFlag({
        isLeft: true,
        isEntered: false,
        isVisited: false
      });
      this.props.onLeave(this.counter.leave);
      this.resetTimer();
    }
  };

  private getWidthHeight(): Size {
    const height = window.innerHeight || document.documentElement.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth;
    return { width, height };
  }

  private async startTimer() {
    if (this.props.autoTrack === false) return;

    if (this.props.waitToStartAutoTrack > 0) {
      await this.sleep();
    }

    this.timer = window.setInterval(() => {
      this.setInternalCounter({ focus: this.counter.focus + 1 });
    }, 1000);
  }

  private resetTimer() {
    if (!this.props.autoTrack) return;

    if (this.props.onFocusOut) {
      this.props.onFocusOut(this.counter.focus);
    }

    clearInterval(this.timer);
    this.setInternalCounter({ focus: 0 });
  }

  private sleep() {
    return new Promise(resolve => setTimeout(resolve, this.props.waitToStartAutoTrack * 1000));
  }

  private setInternalFlag = (flag: Flag) => {
    this.flag = {
      ...this.flag,
      ...flag
    };
  };

  private setInternalCounter = (counter: Counter) => {
    this.counter = {
      ...this.counter,
      ...counter
    };
  };
}

type Props = DataProps & EventProps;

interface DataProps {
  /** React component node */
  children: React.ReactNode;
  /** Delay time for scroll event */
  delay?: number;
  /** Type of check component if it is in the viewport */
  type?: Type;
  /** Id of element */
  id?: string;
  /** Custom CSS class */
  className?: string;
  /** Enable auto track, this feature only work in "fit" mode */
  autoTrack?: boolean;
  /** Wait to start counter for auto track, this feature only work in "fit" mode */
  waitToStartAutoTrack?: number;
}

interface EventProps {
  /** When component is mounted */
  onLoad?: () => void;
  /** When component is in the viewport, event will be executed */
  onEnter?: (enterTimes?: number) => void;
  /** When component is not in the viewport, event will be executed */
  onLeave?: (leaveTimes?: number) => void;
  /** When component is not focused the viewport, event will be executed */
  onFocusOut?: (focusTimes?: number) => void;
}

export interface Size {
  width: number;
  height: number;
}

interface Counter {
  enter?: number;
  focus?: number;
  leave?: number;
}

interface Flag {
  isEntered?: boolean;
  isLeft?: boolean;
  isVisited?: boolean;
}

type Type = 'fit' | 'overlap';

type Func = {
  [key in Type]: (size: Size, rect: DOMRect) => boolean;
};
