import { useRef } from "react";

const CountRender = () => {
  const render = useRef(0);
  render.current++;
  return <div className="p-4 rounded-lg">Render times: {render.current}</div>;
};

export default CountRender;