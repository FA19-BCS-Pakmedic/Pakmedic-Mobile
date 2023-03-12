export default function getVoxUsername(user) {
  return `${user.name.replace(' ', '_')}-${user._id.toString().slice(0, 5)}`;
}
