// import * as React from 'react';
// import { mount } from 'enzyme';
// import * as sinon from 'sinon';
// import { Viewport } from '../';
// import * as Utils from '../utils';

// function resizeWindow(height?: number, width?: number) {
//   Object.defineProperty(window, 'innerHeight', {
//     writable: true,
//     configurable: true,
//     value: height
//   });

//   Object.defineProperty(window, 'innerWidth', {
//     writable: true,
//     configurable: true,
//     value: width
//   });

//   window.dispatchEvent(new Event('resize'));
// }

// const WINDOW_INNER_HEIGHT = 2000;

// describe('testing Viewport component', () => {
//   let eventMap;
//   let sandboxes;
//   let clock;
//   let isFittedIn;
//   let isOverlapping;
//   let onLoad;
//   let onEnter;
//   let onLeave;
//   let onFocusOut;

//   beforeEach(() => {
//     resizeWindow(WINDOW_INNER_HEIGHT);
//     eventMap = {};

//     // sinon sandbox
//     sandboxes = sinon.createSandbox();
//     clock = sandboxes.useFakeTimers();
//     isFittedIn = sandboxes.stub(Utils, 'isFittedIn');
//     isOverlapping = sandboxes.stub(Utils, 'isOverlapping');
//     onLoad = sandboxes.spy();
//     onEnter = sandboxes.spy();
//     onLeave = sandboxes.spy();
//     onFocusOut = sandboxes.spy();

//     // jest mocks
//     window.addEventListener = jest.fn((eventName, callback) => {
//       eventMap[eventName] = callback;
//     });

//     window.removeEventListener = jest.fn(eventName => {
//       delete eventMap[eventName];
//     });
//   });

//   afterEach(() => {
//     sandboxes.restore();
//     jest.clearAllMocks();
//   });

//   it('should should increase enterCount to 2 && leaveCount 1 with "fit" mode - window', () => {
//     const wrapper = mount(
//       <Viewport
//         onLoad={onLoad}
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     const instance = wrapper.instance();

//     const { delay, type } = wrapper.props();
//     expect(delay).toBe(100);
//     expect(type).toBe('fit');

//     // Enter component first time
//     isFittedIn.returns(true);

//     instance.componentDidMount();
//     expect(onLoad.called).toBeTruthy();

//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(0).args[0]).toBe(1);

//     // Leave component
//     isFittedIn.returns(false);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onLeave.called).toBeTruthy();
//     expect(onLeave.getCall(0).args[0]).toBe(1);

//     // Enter component second time
//     isFittedIn.returns(true);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(1).args[0]).toBe(2);
//   });

//   it('should should increase enterCount to 1 with "fit" mode - document', () => {
//     resizeWindow(undefined, undefined);
//     const wrapper = mount(
//       <Viewport
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     const { delay, type } = wrapper.props();
//     expect(delay).toBe(100);
//     expect(type).toBe('fit');

//     // Enter component first time
//     isFittedIn.returns(true);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(0).args[0]).toBe(1);
//   });

//   it('should should increase enterCount to 2 && leaveCount 1 with "overlap" mode', () => {
//     const wrapper = mount(
//       <Viewport
//         delay={300}
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     const { delay, type } = wrapper.props();
//     expect(delay).toBe(300);
//     expect(type).toBe('overlap');

//     // Enter component first time
//     isOverlapping.returns(true);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(0).args[0]).toBe(1);

//     // Leave component
//     isOverlapping.returns(false);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onLeave.called).toBeTruthy();
//     expect(onLeave.getCall(0).args[0]).toBe(1);

//     // Enter component second time
//     isOverlapping.returns(true);
//     eventMap.scroll();

//     // Wait for throttling delay
//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(1).args[0]).toBe(2);
//   });

//   it('should remove "scroll" from window events', () => {
//     const wrapper = mount(
//       <Viewport
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     expect(eventMap).toHaveProperty('scroll');
//     wrapper.unmount();
//     expect(eventMap).not.toHaveProperty('scroll');
//   });

//   it('should increase focusCount to 2', () => {
//     const wrapper = mount(
//       <Viewport
//         autoTrack
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//         onFocusOut={focusCount => onFocusOut(focusCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     const { delay, type } = wrapper.props();
//     expect(delay).toBe(100);
//     expect(type).toBe('fit');

//     // Enter component first time
//     isFittedIn.returns(true);
//     eventMap.scroll();

//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(0).args[0]).toBe(1);

//     clock.tick(2000);

//     // Leave component first time
//     isFittedIn.returns(false);
//     eventMap.scroll();
//     expect(onLeave.called).toBeTruthy();
//     expect(onLeave.getCall(0).args[0]).toBe(1);

//     expect(onFocusOut.called).toBeTruthy();
//     expect(onFocusOut.getCall(0).args[0]).toBe(2);

//     // Enter component second time
//     isFittedIn.returns(true);
//     eventMap.scroll();

//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(1).args[0]).toBe(2);
//     expect(onFocusOut.getCall(1)).toBe(null);

//     clock.tick(1000);

//     // Leave component second time
//     isFittedIn.returns(false);
//     eventMap.scroll();
//     expect(onLeave.called).toBeTruthy();
//     expect(onLeave.getCall(1).args[0]).toBe(2);

//     expect(onFocusOut.called).toBeTruthy();
//     expect(onFocusOut.getCall(1).args[0]).toBe(1);
//   });

//   it('should sleep 2 seconds and then call onFocusOut', () => {
//     const wrapper = mount(
//       <Viewport
//         autoTrack
//         waitToStartAutoTrack={2}
//         onEnter={enterCount => onEnter(enterCount)}
//         onLeave={leaveCount => onLeave(leaveCount)}
//         onFocusOut={focusCount => onFocusOut(focusCount)}
//       >
//         hello world
//       </Viewport>
//     );
//     const { delay, type, waitToStartAutoTrack } = wrapper.props();
//     expect(delay).toBe(100);
//     expect(type).toBe('fit');
//     expect(waitToStartAutoTrack).toBe(2);

//     // Enter component first time
//     isFittedIn.returns(true);
//     eventMap.scroll();

//     clock.tick(delay);
//     expect(onEnter.called).toBeTruthy();
//     expect(onEnter.getCall(0).args[0]).toBe(1);

//     clock.tick(1000);

//     // Leave component first time
//     isFittedIn.returns(false);
//     eventMap.scroll();

//     expect(onLeave.called).toBeTruthy();
//     expect(onLeave.getCall(0).args[0]).toBe(1);
//     expect(onFocusOut.called).toBeTruthy();
//   });
// });
