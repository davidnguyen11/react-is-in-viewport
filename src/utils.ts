import { Size } from '.';

export function isFittedIn(size: Size, rect: DOMRect): boolean {
  const { width, height } = size;
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= height && rect.right <= width;
}

export function isOverlapping(size: Size, rect: DOMRect): boolean {
  const { width, height } = size;

  return (
    rect.top <= height &&
    rect.top + rect.height >= 0 &&
    rect.left <= width &&
    rect.left + rect.width >= 0
  );
}
