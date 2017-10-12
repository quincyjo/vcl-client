import { Image } from './image.class';

describe('Image', () => {
  let image: Image;

  beforeEach(() => {
    image = new Image('an image');
  });

  it('should be created', () => {
    expect(image).toBeDefined();
    expect(image.name).toEqual('an image');
  });
});
