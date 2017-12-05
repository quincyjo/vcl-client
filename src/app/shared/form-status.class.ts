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
  /** Dirty flag. **/
  public dirty: boolean;
  /** Status code for the status. **/
  public code: number;

  constructor() {
    this.dirty = false;
  }

  /**
   * Sets `icon` to the given value.
   * @param  {string}     icon The desired value for `icon`  .
   * @return {FormStatus}      The FormStatus object.
   */
  public setIcon(icon: string): FormStatus {
    this.icon = icon;
    this.dirty = true;
    return this;
  }

  /**
   * Sets `class` to the given value  .
   * @param  {string}     statusClass The desired value for `class`.
   * @return {FormStatus}             The FormStatus object.
   */
  public setClass(statusClass: string): FormStatus {
    this.class = statusClass;
    this.dirty = true;
    return this;
  }

  /**
   * Sets `message` to the given value  .
   * @param  {string}     statusClass The desired value for `message`.
   * @return {FormStatus}             The FormStatus object.
   */
  public setMessage(statusClass: string): FormStatus {
    this.message = statusClass;
    this.dirty = true;
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
    this.code = STATUS_CODE.SUCCESS;
    this.dirty = true;
    return this;
  }

  /**
   * Check if the status is success.
   * @return {boolean} If the status is success.
   */
  public isSuccess(): boolean {
    return (this.code === STATUS_CODE.SUCCESS);
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
    this.code = STATUS_CODE.WARNING;
    this.dirty = true;
    return this;
  }

  /**
   * Check if the status is warning.
   * @return {boolean} If the status is warning.
   */
  public isWarning(): boolean {
    return (this.code === STATUS_CODE.WARNING);
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
    this.code = STATUS_CODE.ERROR;
    this.dirty = true;
    return this;
  }

  /**
   * Check if the status is error.
   * @return {boolean} If the status is error.
   */
  public isError(): boolean {
    return (this.code === STATUS_CODE.ERROR);
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
    this.code = STATUS_CODE.PENDING;
    this.dirty = true;
    return this;
  }

  /**
   * Check if the status is pending.
   * @return {boolean} If the status is pending.
   */
  public isPending(): boolean {
    return (this.code === STATUS_CODE.PENDING);
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
    this.code = STATUS_CODE.INFO;
    this.dirty = true;
    return this;
  }

  /**
   * Check if the status is info.
   * @return {boolean} If the status is info.
   */
  public isInfo(): boolean {
    return (this.code === STATUS_CODE.INFO);
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

/**
 * Enum for status codes.
 * @type {Object}
 */
export const STATUS_CODE = {
  SUCCESS: 0,
  WARNING: 1,
  ERROR: 2,
  PENDING: 3,
  INFO: 4,
}

/**
 * Array indec for status codes.
 */
export const STATUS = [
  'SUCCESS',
  'WARNING',
  'ERROR',
  'PENDING',
  'INFO'
]
