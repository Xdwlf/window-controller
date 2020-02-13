import React from 'react';
import EventEmitter from './index';

describe('Event Emitter', () => {
    test('Event Emitter should be able to subscribe to events', () => {
        const eventSystem = new EventEmitter();
        const fn = jest.fn();
        eventSystem.subscribe('test-event', fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(2);
    });
    test('Event Emitter should be able to subscribe to with multiple events', () => {
        const eventSystem = new EventEmitter();
        const fn = jest.fn();
        eventSystem.subscribe(['test-event', 'test-event1'], fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.emit('test-event1');
        expect(fn).toBeCalledTimes(2);
    });
    test('Event Emitter should be able to unSubscribe successfully with one event', () => {
        const eventSystem = new EventEmitter();
        const fn = jest.fn();
        eventSystem.subscribe('test-event', fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.unSubscribe('test-event', fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
    });
    test('Event Emitter should be able to unSubscribe successfully with many events', () => {
        const eventSystem = new EventEmitter();
        const fn = jest.fn();
        eventSystem.subscribe(['test-event', 'test-event1'], fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.unSubscribe(['test-event', 'test-event1'], fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
    });
    test('Event Emitter should be able to unSubscribe successfully from one event', () => {
        const eventSystem = new EventEmitter();
        const fn = jest.fn();
        eventSystem.subscribe(['test-event', 'test-event1'], fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.unSubscribe('test-event', fn);
        eventSystem.emit('test-event');
        expect(fn).toBeCalledTimes(1);
        eventSystem.emit('test-event1');
        expect(fn).toBeCalledTimes(2);
    });
});
