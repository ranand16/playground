const { useState, useEffect, useRef } = require("react")

const useIdle = (delay) => {
    const [isIdle, setIsIdle] = useState(false);
    const timerId = useRef();

    const goInactive = () => {
        setIsIdle(true);
    }

    const setActive = () => {
        setIsIdle(false);
        startTimer();
    }

    const setup = () => {
        document.addEventListener("mousemove", resetTimer, false);
        document.addEventListener("mousedown", resetTimer, false);
        document.addEventListener("mousewheel", resetTimer, false);
        document.addEventListener("keypress", resetTimer, false);
        document.addEventListener("touchmove", resetTimer, false);
        document.addEventListener("DOMMouseWheel", resetTimer, false);
        document.addEventListener("MSPointerMove", resetTimer, false);

        window.addEventListener("blur", startTimer, false);
        window.addEventListener("focus", resetTimer, false);

    }

    const clear = () => {
        document.removeEventListener("mousemove", resetTimer, false);
        document.removeEventListener("mousedown", resetTimer, false);
        document.removeEventListener("mousewheel", resetTimer, false);
        document.removeEventListener("keypress", resetTimer, false);
        document.removeEventListener("touchmove", resetTimer, false);
        document.removeEventListener("DOMMouseWheel", resetTimer, false);
        document.removeEventListener("MSPointerMove", resetTimer, false);

        window.removeEventListener("blur", startTimer, false);
        window.removeEventListener("focus", resetTimer, false);
        clearTimeout(timerId.current);
    }

    const resetTimer = () => {
        clearTimeout(timerId.current);
        setActive();
    }

    const startTimer = () => {
        goInactive();
        timerId.current = setTimeout(goInactive, delay)
    }

    useEffect(()=>{
        setup();

        return () => {
            clear();
        }
    })

    return isIdle;
}

