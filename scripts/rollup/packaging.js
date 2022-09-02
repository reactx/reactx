'use strict';

const {existsSync, readdirSync, unlinkSync} = require('fs');
const Bundles = require('./bundles');
const {
  asyncCopyTo,
  asyncExecuteCommand,
  asyncExtractTar,
  asyncRimRaf,
} = require('./utils');

const {UMD_DEV, UMD_PROD} = Bundles.bundleTypes;

function getPackageName(name) {
  name = name.replace('@reactx/', '');
  if (name.indexOf('/') !== -1) {
    return name.split('/')[0];
  }
  return name;
}

function getBundleOutputPaths(bundleType, filename, packageName) {
  return `build/${packageName}/${filename}`;
}

function getTarOptions(tgzName, packageName) {
  // Files inside the `npm pack`ed archive start
  // with "package/" in their paths. We'll undo
  // this during extraction.
  const CONTENTS_FOLDER = 'package';
  return {
    src: tgzName,
    dest: `build/${packageName}`,
    tar: {
      entries: [CONTENTS_FOLDER],
      map(header) {
        if (header.name.indexOf(CONTENTS_FOLDER + '/') === 0) {
          header.name = header.name.substring(CONTENTS_FOLDER.length + 1);
        }
      },
    },
  };
}

async function prepareNpmPackage(name) {
  await Promise.all([
    asyncCopyTo('LICENSE', `build/${name}/LICENSE`),
    asyncCopyTo(`packages/${name}/package.json`, `build/${name}/package.json`),
    asyncCopyTo(`packages/${name}/README.md`, `build/${name}/README.md`),
    asyncCopyTo(`packages/${name}/.npmrc`, `build/${name}/.npmrc`),
    asyncCopyTo(`packages/${name}/npm`, `build/${name}`),
    asyncCopyTo(`build/${name}/${name}`, `build/${name}`),
    asyncCopyTo(`packages/${name}/src/assets`, `build/${name}/src/assets`),
  ]);
  const tgzName = (await asyncExecuteCommand(`npm pack build/${name}/`)).trim();
  await asyncRimRaf(`build/${name}`);
  await asyncExtractTar(getTarOptions(tgzName, name));
  unlinkSync(tgzName);
}
async function prepareNpmPackages() {
  if (!existsSync('build')) {
    // We didn't build any npm packages.
    return;
  }
  const builtPackageFolders = readdirSync('build').filter(
    (dir) => dir.charAt(0) !== '.',
  );
  await Promise.all(builtPackageFolders.map(prepareNpmPackage));
}
module.exports = {
  getPackageName,
  getBundleOutputPaths,
  prepareNpmPackages,
};
