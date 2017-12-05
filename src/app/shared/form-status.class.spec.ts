import { FormStatus, STATUS_ICON, STATUS_CLASS } from './form-status.class';

describe('FormStatus', () => {
  let status: FormStatus;

  beforeEach(() => {
    status = new FormStatus();
  });

  it('should be created blank and clean', () => {
    expect(status).toBeDefined();
    expect(status.icon).toBeUndefined();
    expect(status.message).toBeUndefined();
    expect(status.class).toBeUndefined();
    expect(status.dirty).toEqual(false);
  });

  it('should have a settable icon', () => {
    status.setIcon('icon');
    expect(status.icon).toEqual('icon');
    expect(status.dirty).toEqual(true);
  });

  it('should have a settable class', () => {
    status.setClass('class');
    expect(status.class).toEqual('class');
    expect(status.dirty).toEqual(true);
  });

  it('should have a settable message', () => {
    status.setMessage('message');
    expect(status.message).toEqual('message');
    expect(status.dirty).toEqual(true);
  });

  it('should be settable to success', () => {
    status.success('success');
    expect(status.message).toEqual('success');
    expect(status.icon).toEqual(STATUS_ICON.SUCCESS);
    expect(status.class).toEqual(STATUS_CLASS.SUCCESS);
    expect(status.isSuccess()).toBeTruthy();
    expect(status.dirty).toEqual(true);
  });

  it('should be settable to warning', () => {
    status.warning('warning');
    expect(status.message).toEqual('warning');
    expect(status.icon).toEqual(STATUS_ICON.WARNING);
    expect(status.class).toEqual(STATUS_CLASS.WARNING);
    expect(status.isWarning()).toBeTruthy();
    expect(status.dirty).toEqual(true);
  });

  it('should be settable to error', () => {
    status.error('error');
    expect(status.message).toEqual('error');
    expect(status.icon).toEqual(STATUS_ICON.ERROR);
    expect(status.class).toEqual(STATUS_CLASS.ERROR);
    expect(status.isError()).toBeTruthy();
    expect(status.dirty).toEqual(true);
  });

  it('should be settable to pending', () => {
    status.pending('pending');
    expect(status.message).toEqual('pending');
    expect(status.icon).toEqual(STATUS_ICON.PENDING);
    expect(status.class).toEqual(STATUS_CLASS.PENDING);
    expect(status.isPending()).toBeTruthy();
    expect(status.dirty).toEqual(true);
  });

  it('should be settable to info', () => {
    status.info('info');
    expect(status.message).toEqual('info');
    expect(status.icon).toEqual(STATUS_ICON.INFO);
    expect(status.class).toEqual(STATUS_CLASS.INFO);
    expect(status.isInfo()).toBeTruthy();
    expect(status.dirty).toEqual(true);
  });
});
