import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { Viewport } from '../';
import * as Utils from '../utils';

const resizeHeightWindow = height => {
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height
  });
  window.dispatchEvent(new Event('resize'));
};

const WINDOW_INNER_HEIGHT = 2000;

describe('testing Viewport component', () => {
  let eventMap;
  let sandboxes;
  let clock;
  let isFittedIn;
  let isOverlapping;
  let onEnter;
  let onLeave;

  beforeEach(() => {
    resizeHeightWindow(WINDOW_INNER_HEIGHT);
    eventMap = {};

    // sinon sandbox
    sandboxes = sinon.createSandbox();
    clock = sandboxes.useFakeTimers();
    isFittedIn = sandboxes.stub(Utils, 'isFittedIn');
    isOverlapping = sandboxes.stub(Utils, 'isOverlapping');
    onEnter = sandboxes.spy();
    onLeave = sandboxes.spy();

    // jest mocks
    window.addEventListener = jest.fn((eventName, callback) => {
      eventMap[eventName] = callback;
    });

    window.removeEventListener = jest.fn(eventName => {
      delete eventMap[eventName];
    });
  });

  afterEach(() => {
    sandboxes.restore();
    jest.clearAllMocks();
  });

  it('should should increase enterCount to 2 && leaveCount 1 with "fit" mode', () => {
    const wrapper = mount(
      <Viewport
        onEnter={enterCount => onEnter(enterCount)}
        onLeave={leaveCount => onLeave(leaveCount)}
      >
        hello world
      </Viewport>
    );
    const { delay, type } = wrapper.props();
    expect(delay).toBe(100);
    expect(type).toBe('fit');

    // Enter component first time
    isFittedIn.returns(true);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onEnter.called).toBeTruthy();
    expect(onEnter.getCall(0).args[0]).toBe(1);

    // Leave component
    isFittedIn.returns(false);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onLeave.called).toBeTruthy();
    expect(onLeave.getCall(0).args[0]).toBe(1);

    // Enter component second time
    isFittedIn.returns(true);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onEnter.called).toBeTruthy();
    expect(onEnter.getCall(1).args[0]).toBe(2);
  });

  it('should should increase enterCount to 2 && leaveCount 1 with "overlap" mode', () => {
    const wrapper = mount(
      <Viewport
        delay={300}
        type="overlap"
        onEnter={enterCount => onEnter(enterCount)}
        onLeave={leaveCount => onLeave(leaveCount)}
      >
        hello world
      </Viewport>
    );
    const { delay, type } = wrapper.props();
    expect(delay).toBe(300);
    expect(type).toBe('overlap');

    // Enter component first time
    isOverlapping.returns(true);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onEnter.called).toBeTruthy();
    expect(onEnter.getCall(0).args[0]).toBe(1);

    // Leave component
    isOverlapping.returns(false);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onLeave.called).toBeTruthy();
    expect(onLeave.getCall(0).args[0]).toBe(1);

    // Enter component second time
    isOverlapping.returns(true);
    eventMap.scroll();

    // Wait for throttling delay
    clock.tick(delay);
    expect(onEnter.called).toBeTruthy();
    expect(onEnter.getCall(1).args[0]).toBe(2);
  });

  it('should remove "scroll" from window events', () => {
    const wrapper = mount(
      <Viewport
        onEnter={enterCount => onEnter(enterCount)}
        onLeave={leaveCount => onLeave(leaveCount)}
      >
        hello world
      </Viewport>
    );
    expect(eventMap).toHaveProperty('scroll');
    wrapper.unmount();
    expect(eventMap).not.toHaveProperty('scroll');
  });
});
