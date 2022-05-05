import { isProduction } from './isProduction';

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomain = () => {
  const prodUrl = 'https://sopra-fs22-group-15-server.herokuapp.com/v1';
  const devUrl = 'http://localhost:8080/v1';

  return isProduction() ? prodUrl : devUrl;
};