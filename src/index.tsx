import * as React from 'react';
import { throttle } from 'throttle-debounce';

/**
 * Viewport component allow tracking the component when it appears in the viewport
 */
export class ViewPort extends React.Component<Props> {
  public static defaultProps: Partial<DataProps> = {
    type: 'fit',
    delay: 100
  };

  private readonly viewportRef = React.createRef<HTMLDivElement>();

  private isInViewport: () => boolean;

  private enterCount: number;

  private isEntered: boolean;

  private leaveCount: number;

  private isLeft: boolean;

  constructor(props: Props) {
    super(props);
    this.enterCount = 0;
    this.isEntered = false;
    this.leaveCount = 0;
    this.isLeft = false;
    const func: Func = {
      fit: this.isFittedIn,
      overlap: this.isOverlapping
    };
    this.isInViewport = func[this.props.type];
  }

  public componentDidMount() {
    if (this.props.onEnter) {
      window.addEventListener('scroll', throttle(this.props.delay, this.handleScroll), {
        passive: true
      });
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  public render(): JSX.Element {
    return (
      <div id={this.props.id} ref={this.viewportRef}>
        {this.props.children}
      </div>
    );
  }

  private handleScroll = () => {
    if (this.isInViewport()) {
      if (!this.isEntered && this.props.onEnter) {
        this.enterCount++;
        this.props.onEnter(this.enterCount);
        this.isEntered = true;
        this.isLeft = false;
      }
    } else if (this.isEntered && !this.isLeft && this.props.onLeave) {
      this.leaveCount++;
      this.props.onLeave(this.leaveCount);
      this.isLeft = true;
      this.isEntered = false;
    }
  };

  private isFittedIn = (): boolean => {
    const rect = this.viewportRef.current.getBoundingClientRect();
    const { width, height } = this.getWidthHeight();

    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= height && rect.right <= width;
  };

  private isOverlapping = (): boolean => {
    const rect = this.viewportRef.current.getBoundingClientRect();
    const { width, height } = this.getWidthHeight();

    return (
      rect.top <= height &&
      rect.top + rect.height >= 0 &&
      rect.left <= width &&
      rect.left + rect.width >= 0
    );
  };

  private getWidthHeight(): Size {
    const height = window.innerHeight || document.documentElement.clientHeight;
    const width = window.innerWidth || document.documentElement.clientWidth;
    return { width, height };
  }
}

type Props = DataProps & EventProps;

interface DataProps {
  /** React component node */
  children: JSX.Element;
  /** Delay time for scroll event */
  delay?: number;
  /** Type of check component if it is in the viewport */
  type?: Type;
  /** Id of element */
  id?: string;
}

interface EventProps {
  /** When component is in the viewport, event will be executed */
  onEnter?: (enterCount?: number) => void;
  /** When component is not in the viewport, event will be executed */
  onLeave?: (leaveCount?: number) => void;
}

interface Size {
  width: number;
  height: number;
}

type Type = 'fit' | 'overlap';

type Func = {
  [key in Type]: () => boolean;
};
