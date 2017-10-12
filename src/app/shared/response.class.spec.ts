import { Response, Error, Success, CODE, CODE_MAP } from './response.class';

describe('Error', () => {
  let error: Error;

  beforeEach(() => {
    error = new Error();
  });

  it('should be a bad request', () => {
    expect(error.code).toEqual(CODE.BAD_REQUEST);
    expect(error.error).toEqual(CODE_MAP[CODE.BAD_REQUEST]);
  });

  it('should have a setable code and be dot chainable', () => {
    let chained = error.setCode(404);
    expect(error.code).toEqual(404);
    expect(chained).toBe(error);
  });

  it('should have a setable error and be dot chainable', () => {
    let chained = error.setError('an_error');
    expect(error.error).toEqual('an_error');
    expect(chained).toBe(error);
  });

  it('should have a setable msg and be dot chainable', () => {
    let chained = error.setMsg('a message!');
    expect(error.msg).toEqual('a message!');
    expect(chained).toBe(error);
  });
});

describe('Success', () => {
  let success: Success;

  beforeEach(() => {
    success = new Success();
  });

  it('should be a ok', () => {
    expect(success.code).toEqual(CODE.OK);
    expect(success.status).toEqual(CODE_MAP[CODE.OK]);
  });

  it('should have a setable code and be dot chainable', () => {
    let chained = success.setCode(201);
    expect(success.code).toEqual(201);
    expect(chained).toBe(success);
  });

  it('should have a setable error and be dot chainable', () => {
    let chained = success.setStatus('a_status');
    expect(success.status).toEqual('a_status');
    expect(chained).toBe(success);
  });

  it('should have a setable msg and be dot chainable', () => {
    let chained = success.setMsg('a message!');
    expect(success.msg).toEqual('a message!');
    expect(chained).toBe(success);
  });
});
