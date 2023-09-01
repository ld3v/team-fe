import { useEffect, useState } from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(result)]);

  return data;
};

export default useStore;
