export default function delimiterFormatter(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
