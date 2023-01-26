import moment from "moment";

/**
 * Implements Moment.js for formatting dates
 * https://momentjs.com/docs/#/displaying/fromnow/
 *
 * @param {{time:Date}} param0 input parameters
 */
const formatTime = ({
  time = "",
  fullDate = false,
  withTime = false,
  ago = true,
}) => {
  if (fullDate) {
    let format = "LL";
    if (withTime) {
      format += "L";
    }
    return moment(time).format(format);
  }
  return moment(time).fromNow(!ago);
};

export default formatTime;

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
