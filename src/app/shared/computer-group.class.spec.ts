import { ComputerGroup } from './computer-group.class';

describe('ComputerGroup', () => {
  let group: ComputerGroup;

  beforeEach(() => {
    group = new ComputerGroup('computers');
  });

  it('should be created', () => {
    expect(group).toBeDefined();
  });
});
