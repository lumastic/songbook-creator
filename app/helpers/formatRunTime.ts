/**
 * formats the runtime in seconds to US-EN format.
 */
export const formatRunTime = (runtime: number) => {
  if (runtime < 60) return `${runtime} sec.`;
  let min = runtime / 60;
  min = ~~min;
  const remSec = runtime % 60;
  return `${min} min. ${remSec} sec.`;
};

export default formatRunTime;
