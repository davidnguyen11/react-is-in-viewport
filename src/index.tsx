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

  private enterCount: number;

  private focusCount: number;

  private counter: number;

  private isEntered: boolean;

  private leaveCount: number;

  private isLeft: boolean;

  constructor(props: Props) {
    super(props);
    this.enterCount = 0;
    this.focusCount = 0;
    this.isEntered = false;
    this.leaveCount = 0;
    this.isLeft = false;
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
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.resetCounter();
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
      if (!this.isEntered && this.props.onEnter) {
        this.enterCount++;
        this.props.onEnter(this.enterCount);
        this.isEntered = true;
        this.isLeft = false;

        /*
         * Only start the auto track when it is in the `fit` mode
         */
        this.props.type === 'fit' && this.startCounter();
      }
    } else if (this.isEntered && !this.isLeft && this.props.onLeave) {
      this.leaveCount++;
      this.props.onLeave(this.leaveCount);
      this.isLeft = true;
      this.isEntered = false;
      this.resetCounter();
    }
  };

  private getWidthHeight(): Size {
    const height = window.innerHeight || document.documentElement.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth;
    return { width, height };
  }

  private async startCounter() {
    if (this.props.autoTrack === false) return;

    if (this.props.waitToStartAutoTrack > 0) {
      await this.sleep();
    }

    this.counter = window.setInterval(() => {
      this.focusCount++;
    }, 1000);
  }

  private resetCounter() {
    if (!this.props.autoTrack) return;

    if (this.props.onFocusOut) {
      this.props.onFocusOut(this.focusCount);
    }

    clearInterval(this.counter);
    this.focusCount = 0;
  }

  private sleep() {
    return new Promise(resolve => setTimeout(resolve, this.props.waitToStartAutoTrack * 1000));
  }
}

type Props = DataProps & EventProps;

interface DataProps {
  /** React component node */
  children: JSX.Element | JSX.Element[] | string;
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
  /** When component is in the viewport, event will be executed */
  onEnter: (enterCount?: number) => void;
  /** When component is not in the viewport, event will be executed */
  onLeave?: (leaveCount?: number) => void;
  /** When component is not focused the viewport, event will be executed */
  onFocusOut?: (focusCount?: number) => void;
}

export interface Size {
  width: number;
  height: number;
}

type Type = 'fit' | 'overlap';

type Func = {
  [key in Type]: (size: Size, rect: DOMRect) => boolean;
};
