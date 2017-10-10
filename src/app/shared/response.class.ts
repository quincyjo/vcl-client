export class Response {
  public id: number;

  constructor(public code: number = 200) { }
}

/**
 * A error class representing a server error.
 * @param  {number = 400}   code The error code, 400 by default.
 * @param  {string}         msg  An optional human readable error message.
 */
export class Error extends Response {
  /** The error string. **/
  public error: string;

  constructor(
    code: number = 400,
    public msg?: string
  ) {
    super(code);
    if(!this.error) this.error = CODE_MAP[code];
  }

  public setCode(code: number): Error {
    this.code = code;
    return this;
  }

  public setError(error: string): Error {
    this.error = error;
    return this;
  }

  public setMsg(msg: string): Error {
    this.msg = msg;
    return this;
  }
}

/**
 * A error class representing a server success.
 * @param  {number = 400}   code The status code, 200 by default.
 * @param  {string}         msg  An optional human readable status message.
 */
export class Success extends Response {
  /** The status string. **/
  public status: string;
  /** Id of the targeted content for PUT, POST, and DELETE requests. **/

  constructor(
    code: number = 200,
    public msg?: string
  ) {
    super(code);
    if(!this.msg) this.msg = CODE_MAP[code];
    if(!this.status) this.status = CODE_MAP[code];
  }

  public setCode(code: number): Success {
    this.code = code;
    return this;
  }

  public setStatus(status: string): Success {
    this.status = status;
    return this;
  }

  public setMsg(msg: string): Success {
    this.msg = msg;
    return this;
  }
}

/////////////////
// CONSTANTS   //
/////////////////

/** Map from human readable code to number. **/
export const CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  CONFLICT: 409
}

/** Map from code to status string. **/
export const CODE_MAP = {
  200: 'ok',
  201: 'created',
  202: 'accepted',
  204: 'deleted',
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  405: 'not_allowed',
  409: 'update_conflict'
}
