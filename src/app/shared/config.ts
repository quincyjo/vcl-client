/**
 * Global and constant app configuration object.
 *
 * Unlike the settings provider, these are read-only and or neither meant to
 * change during runtime nor be editable through the application.
 */
export const CONFIG = {
  /**
   * The root relative or absolute URL to the VCL instance the app should
   * target. Each provider is responsible for appending their target endpoint
   * to this value.
   * E.g: If this value is an empty string, the providers will target absolute
   * from their hosted address, such as '/api/reservations' for the reservations
   * endpoint. If targeting a VCL instance on another server, this should be
   * the URL of that server. If located at https://www.myvcl.com and that VCL
   * instance is running the API, this value would be set to
   * 'https://www.myvcl.com' and the reservations endpoint would be determined
   * as 'https://www.myvcl.com/api/reservations'.
   */
  // API_ROOT: '/api',
  API_ROOT: 'http://169.55.9.45:8000/api',
}
