import { isFittedIn, isOverlapping } from '../utils';
import { Size } from '../';

describe('testing "isFittedIn"', () => {
  it('should return true', () => {
    const size: Size = { width: 414, height: 736 };
    const rect: DOMRect = {
      height: 50,
      width: 414,
      left: 10,
      top: 10,
      bottom: 60,
      right: 414,
      x: 0,
      y: 10,
      toJSON: null
    };
    const actual = isFittedIn(size, rect);
    expect(actual).toBe(true);
  });

  it('should return false', () => {
    const size: Size = { width: 414, height: 736 };
    const rect: DOMRect = {
      height: 50,
      width: 414,
      left: 10,
      top: -10,
      bottom: 60,
      right: 414,
      x: 0,
      y: 10,
      toJSON: null
    };
    const actual = isFittedIn(size, rect);
    expect(actual).toBe(false);
  });
});

describe('testing "isOverlapping"', () => {
  it('should return true', () => {
    const size: Size = { width: 414, height: 736 };
    const rect: DOMRect = {
      height: 50,
      width: 414,
      left: 10,
      top: 368,
      bottom: 60,
      right: 414,
      x: 0,
      y: 10,
      toJSON: null
    };
    const actual = isOverlapping(size, rect);
    expect(actual).toBe(true);
  });

  it('should return false', () => {
    const size: Size = { width: 414, height: 736 };
    const rect: DOMRect = {
      height: 50,
      width: 414,
      left: 10,
      top: 1000,
      bottom: 60,
      right: 414,
      x: 0,
      y: 10,
      toJSON: null
    };
    const actual = isOverlapping(size, rect);
    expect(actual).toBe(false);
  });
});
