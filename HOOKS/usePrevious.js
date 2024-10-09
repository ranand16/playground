const { useEffect, useRef } = require("react")

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(()=>{
        ref.current = value;
    }, [value]);

    return ref.current;
}