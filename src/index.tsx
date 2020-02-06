import * as React from 'react';

/**
 * Viewport component allow tracking the component when it appears in the viewport
 */
export class Viewport extends React.Component<Props> {
  public static defaultProps: Partial<DataProps> = {
    autoTrack: false,
    observerOptions: {
      threshold: 1.0
    }
  };

  private readonly screenRef = React.createRef<HTMLDivElement>();

  private timer: number;

  private counter: Counter;

  private observer: IntersectionObserver;

  constructor(props: Props) {
    super(props);

    this.counter = {
      enter: 0,
      focus: 0,
      leave: 0
    };
  }

  public componentDidMount() {
    this.startObserver();
  }

  public componentWillUnmount() {
    if (this.observer && this.screenRef && this.screenRef.current) {
      this.observer.unobserve(this.screenRef.current);
    }

    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  public render(): JSX.Element {
    return (
      <div className={this.props.className} id={this.props.id} ref={this.screenRef}>
        {this.props.children}
      </div>
    );
  }

  private startObserver() {
    this.observer = new IntersectionObserver(this.handleIntersect, this.props.observerOptions);
    this.observer.observe(this.screenRef.current);
  }

  private handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const { threshold } = this.props.observerOptions;
    const thresholds = !Array.isArray(threshold) ? [threshold] : threshold;

    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const result = thresholds.some(item => entry.intersectionRatio >= item);

        if (result) {
          this.handleEnter(entry);
        }
      } else {
        const result = thresholds.some(item => entry.intersectionRatio < item);
        if (entry.intersectionRatio !== 0 && result) {
          this.handleLeave();
        }
      }
    });
  };

  private handleEnter = (entry?: IntersectionObserverEntry) => {
    this.setInternalCounter({ enter: this.counter.enter + 1 });
    this.props.onEnter(this.counter.enter);

    /*
     * Only start the auto track when component is fully fitted in the viewport
     */
    entry.intersectionRatio === 1 && this.startTimer();
  };

  private handleLeave = () => {
    if (this.props.onLeave) {
      this.setInternalCounter({ leave: this.counter.leave + 1 });
      this.props.onLeave(this.counter.leave);
      this.resetTimer();
    }
  };

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

  private setInternalCounter = (counter: Counter) => {
    this.counter = {
      ...this.counter,
      ...counter
    };
  };
}

export type Props = DataProps & EventProps;

interface DataProps {
  /** React component node */
  children: React.ReactNode;
  /** Id of element */
  id?: string;
  /** Custom CSS class */
  className?: string;
  /** Enable auto track, this feature only work in "fit" mode */
  autoTrack?: boolean;
  /** Wait to start counter for auto track, this feature only work in "fit" mode */
  waitToStartAutoTrack?: number;
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   * Intersection Observer options
   */
  observerOptions?: IntersectionObserverInit;
}

interface EventProps {
  /** When component is in the viewport, event will be executed */
  onEnter?: (enterTimes?: number) => void;
  /** When component is not in the viewport, event will be executed */
  onLeave?: (leaveTimes?: number) => void;
  /** When component is not focused the viewport, event will be executed */
  onFocusOut?: (focusTimes?: number) => void;
}

interface Counter {
  enter?: number;
  focus?: number;
  leave?: number;
}
