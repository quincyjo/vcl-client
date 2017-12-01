/**
 * Wrapper class for from status messages. Allows settimgs of state messages
 * with autmatic updates of pther control options accordingly.
 */
export class FormStatus {
  /** The icon to display for the status. **/
  public icon: string;
  /** The message to display for the status. **/
  public message: string;
  /** The class apply to the status. **/
  public class: string;

  constructor() {

  }

  /**
   * Sets `icon` to the given value.
   * @param  {string}     icon The desired value for `icon`  .
   * @return {FormStatus}      The FormStatus object.
   */
  public setIcon(icon: string): FormStatus {
    this.icon = icon;
    return this;
  }

  /**
   * Sets `class` to the given value  .
   * @param  {string}     statusClass The desired value for `class`.
   * @return {FormStatus}             The FormStatus object.
   */
  public setClass(statusClass: string): FormStatus {
    this.class = statusClass;
    return this;
  }

  /**
   * Sets `message` to the given value  .
   * @param  {string}     statusClass The desired value for `message`.
   * @return {FormStatus}             The FormStatus object.
   */
  public setMessage(statusClass: string): FormStatus {
    this.message = statusClass;
    return this;
  }

  /**
   * Sets the status to success and `message` to the given value.
   * @param  {string}     message The desired value for `message`.
   * @return {FormStatus}         The FormStatus object.
   */
  public success(message: string): FormStatus {
    this.message = message;
    this.icon = STATUS_ICON.SUCCESS;
    this.class = STATUS_CLASS.SUCCESS;
    return this;
  }

  /**
   * Sets the status to warning and `message` to the given value.
   * @param  {string}     message The desired value for `message`.
   * @return {FormStatus}         The FormStatus object.
   */
  public warning(message: string): FormStatus {
    this.message = message;
    this.icon = STATUS_ICON.WARNING;
    this.class = STATUS_CLASS.WARNING;
    return this;
  }

  /**
   * Sets the status to error and `message` to the given value.
   * @param  {string}     message The desired value for `message`.
   * @return {FormStatus}         The FormStatus object.
   */
  public error(message: string): FormStatus {
    this.message = message;
    this.icon = STATUS_ICON.ERROR;
    this.class = STATUS_CLASS.ERROR;
    return this;
  }

  /**
   * Sets the status to pending and `message` to the given value.
   * @param  {string}     message The desired value for `message`.
   * @return {FormStatus}         The FormStatus object.
   */
  public pending(message: string): FormStatus {
    this.message = message;
    this.icon = STATUS_ICON.PENDING;
    this.class = STATUS_CLASS.PENDING;
    return this;
  }

  /**
   * Sets the status to info and `message` to the given value.
   * @param  {string}     message The desired value for `message`.
   * @return {FormStatus}         The FormStatus object.
   */
  public info(message: string): FormStatus {
    this.message = message;
    this.icon = STATUS_ICON.INFO;
    this.class = STATUS_CLASS.INFO;
    return this;
  }
}

/**
 * Enum for icons based on status state.
 */
export const STATUS_ICON = {
  SUCCESS: 'check',
  WARNING: 'warning',
  ERROR: 'error_outline',
  PENDING: 'access_time',
  INFO: 'info_outline',
}

/**
 * Enum for classes based on status state.
 */
export const STATUS_CLASS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  PENDING: 'pending',
  INFO: 'info',
}
