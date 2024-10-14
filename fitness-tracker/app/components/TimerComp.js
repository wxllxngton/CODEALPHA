import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { Text } from 'react-native';

/**
 * Timer component that displays the time elapsed since it was started.
 *
 * @param {Object} props - The props object.
 * @param {Object} ref - The ref object.
 * @returns {JSX.Element} The Timer component.
 */
const Timer = forwardRef((props, ref) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useImperativeHandle(ref, () => ({
        start,
        pause,
        resume,
        stop,
    }));

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
                props.onTimes(time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time, props]);

    const start = () => {
        setIsRunning(true);
    };

    const pause = () => {
        setIsRunning(false);
        props.onPause(time);
    };

    const resume = () => {
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
        setTime(0);
        props.onEnd();
    };
});

/**
 * Countdown component that displays the time remaining until it reaches zero.
 *
 * @param {Object} props - The props object.
 * @param {Object} ref - The ref object.
 * @returns {JSX.Element} The Countdown component.
 */
const Countdown = forwardRef((props, ref) => {
    const [seconds, setSeconds] = useState(props.initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useImperativeHandle(ref, () => ({
        start,
        pause,
        resume,
        stop,
    }));

    useEffect(() => {
        let interval;
        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
                props.onTimes(seconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            props.onEnd();
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds, props]);

    const start = () => {
        setIsRunning(true);
    };

    const pause = () => {
        setIsRunning(false);
        props.onPause(seconds);
    };

    const resume = () => {
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
        setSeconds(props.initialSeconds);
        props.onEnd();
    };
});

export { Timer, Countdown };
