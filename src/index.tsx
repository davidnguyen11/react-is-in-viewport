import * as React from 'react';
import { throttle } from 'throttle-debounce';
import { isFittedIn, isOverlapping } from './utils';

/**
 * Viewport component allow tracking the component when it appears in the viewport
 */
export class Viewport extends React.Component<Props> {
  public static defaultProps: Partial<DataProps> = {
    type: 'fit',
    delay: 100
  };

  private readonly screenRef = React.createRef<HTMLDivElement>();

  private isInScreen: (size: Size, rect: DOMRect) => boolean;

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
      }
    } else if (this.isEntered && !this.isLeft && this.props.onLeave) {
      this.leaveCount++;
      this.props.onLeave(this.leaveCount);
      this.isLeft = true;
      this.isEntered = false;
    }
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
  children: JSX.Element | string;
  /** Delay time for scroll event */
  delay?: number;
  /** Type of check component if it is in the viewport */
  type?: Type;
  /** Id of element */
  id?: string;
  /** Custom CSS class */
  className?: string;
}

interface EventProps {
  /** When component is in the viewport, event will be executed */
  onEnter: (enterCount?: number) => void;
  /** When component is not in the viewport, event will be executed */
  onLeave?: (leaveCount?: number) => void;
}

export interface Size {
  width: number;
  height: number;
}

type Type = 'fit' | 'overlap';

type Func = {
  [key in Type]: (size: Size, rect: DOMRect) => boolean;
};
