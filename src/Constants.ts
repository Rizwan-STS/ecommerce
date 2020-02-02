import { environment } from "./environments/environment";


export const Constants = Object.freeze({
  BASE_API_URL : environment.production ? 'https://www.ridekaart.com/api' : 'https://www.ridekaart.com/api',
  SESSION_EXPIRED : 'Please login to continue',
  DIALOGWIDTH: '500px'
});
export class Constant {
  static ROOT_LOADER = false;
  static COUNT = 0;
  static COLOR = 'theme';
  static BGCOLOR = 'red';
  static SNACKBAR_DURATION = {
    duration: 4000
  };
}
