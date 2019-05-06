/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export function memoize(fn: () => any): () => any {
  let result: null = null;
  const memoized = () => {
    if (result == null) {
      result = fn();
    }
    return result;
  };
  return memoized;
}

/**
 * drop-in replacement for _.without
 */
export function without(items: any[], item: any) {
  return items.filter(i => i !== item);
}

export function union(itemsA: any[], itemsB: any[]) {
  const set = new Set();
  const insertItem = (item: any) => set.add(item);
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);

  const result: any[] = [];
  set.forEach(key => result.push(key));
  return result;
}
