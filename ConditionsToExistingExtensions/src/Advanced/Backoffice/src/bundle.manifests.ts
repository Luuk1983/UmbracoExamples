// Job of the bundle is to collect all the manifests and is the starting point of our bundle
// We load this bundle from umbraco-package.json
// Currently, we only have our one condition, but if you have multiple extensions
// this file would get larger.

// Import the conditions manifests
import { manifests as conditions } from './conditions/manifests';

// Export all the manifests as a single array
export const manifests: Array<UmbExtensionManifest> = [
    ...conditions
];