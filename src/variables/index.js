let GAME_HOST;
let SECURE = 's';
switch (window.location.hostname) {
  case 'localhost':
    GAME_HOST = 'localhost:3000';
    SECURE = '';
    break;
  case 'playcodewords.com':
  case 'www.playcodewords.com':
    GAME_HOST = 'codewords-server.herokuapp.com';
    break;
  default:
    GAME_HOST = window.location.hostname.replace('game', 'server');
}

export const API_ROOT = `http${SECURE}://${GAME_HOST}/api`;
export const API_WS_ROOT = `ws${SECURE}://${GAME_HOST}/cable`;
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
