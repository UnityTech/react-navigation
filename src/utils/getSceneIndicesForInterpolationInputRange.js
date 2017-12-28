/* @flow */

import type {
  NavigationSceneRendererProps,
  NavigationScene,
  SceneIndicesForInterpolationInputRange,
} from '../TypeDefinition';

function getSceneIndicesForInterpolationInputRange(
  props: NavigationSceneRendererProps
): SceneIndicesForInterpolationInputRange | null {
  const { scene, scenes } = props;
  const index = scene.index;
  const lastSceneIndexInScenes = scenes.length - 1;
  const isBack = !scenes[lastSceneIndexInScenes].isActive;

  if (isBack) {
    const currentSceneIndexInScenes = scenes.findIndex(
      (item: NavigationScene) => item === scene
    );
    const targetSceneIndexInScenes = scenes.findIndex(
      (item: NavigationScene) => item.isActive
    );
    const targetSceneIndex = scenes[targetSceneIndexInScenes].index;
    const lastSceneIndex = scenes[lastSceneIndexInScenes].index;

    if (
      index !== targetSceneIndex &&
      currentSceneIndexInScenes === lastSceneIndexInScenes
    ) {
      return {
        first: Math.min(targetSceneIndex, index - 1),
        last: currentSceneIndexInScenes + 1,
      };
    } else if (
      index === targetSceneIndex &&
      currentSceneIndexInScenes === targetSceneIndexInScenes
    ) {
      return {
        first: currentSceneIndexInScenes - 1,
        last: Math.max(lastSceneIndex, currentSceneIndexInScenes + 1),
      };
    } else if (
      index === targetSceneIndex ||
      currentSceneIndexInScenes > targetSceneIndexInScenes
    ) {
      return null;
    } else {
      return {
        first: currentSceneIndexInScenes - 1,
        last: currentSceneIndexInScenes + 1,
      };
    }
  } else {
    const currentSceneIndexInScenes = scenes.findIndex(
      (item: NavigationScene) => item === scene
    );
    return {
      first: currentSceneIndexInScenes - 1,
      last: currentSceneIndexInScenes + 1,
    };
  }
}

export default getSceneIndicesForInterpolationInputRange;
