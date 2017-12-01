import { ImageGroup } from './image-group.class';

describe('ImageGroup', () => {
  let group: ImageGroup;

  beforeEach(() => {
    group = new ImageGroup('images');
  });

  it('should be created', () => {
    expect(group).toBeDefined();
  });
});
