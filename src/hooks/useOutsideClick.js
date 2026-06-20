import { useEffect, useRef } from "react";

export default function useOutSideClick(close, handlerListenerCapture = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) close?.();
    }
    document.addEventListener("click", handleClick, handlerListenerCapture);

    return () =>
      document.removeEventListener(
        "click",
        handleClick,
        handlerListenerCapture,
      );
  }, [ref, close, handlerListenerCapture]);

  return { ref };
}
