import { OS } from './os.class';

describe('OS', () => {
  let os: OS;

  beforeEach(() => {
    os = new OS('linux');
  });

  it('should be created', () => {
    expect(os).toBeDefined();
    expect(os.name).toEqual('linux');
  });
});
