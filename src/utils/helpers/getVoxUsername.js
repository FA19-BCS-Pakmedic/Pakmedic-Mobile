export default function getVoxUsername(user) {
  return `${user.name.split(' ')[0]}-${user._id.toString().slice(0, 5)}`;
}
