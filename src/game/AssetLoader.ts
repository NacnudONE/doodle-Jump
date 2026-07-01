import type { AssetMap } from './types';

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

export const AssetLoader = {
  load: (): Promise<AssetMap> =>
    Promise.all([
      loadImage('/assets/background.png'),
      loadImage('/assets/doodler.png'),
      loadImage('/assets/platform.png'),
    ]).then(([background, player, platform]) => ({ background, player, platform })),
};
