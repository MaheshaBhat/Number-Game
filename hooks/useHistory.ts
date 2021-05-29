import * as React from "react";

export default function useHistory(value: number) {
  const history = React.useRef(value);
  React.useEffect(() => {
    history.current = value;
  }, [value]);

  return history.current;
}
