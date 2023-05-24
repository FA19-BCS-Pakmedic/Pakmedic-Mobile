export const googleConfig = {
  scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '1065457387343-vb9fmbvje9ltbi76fsr01dju0vktfuae.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  androidClientId:
    '222038428703-56sugje3nvqenb7kuahmqi21vhpb3enj.apps.googleusercontent.com',
  offlineAccess: true,
};