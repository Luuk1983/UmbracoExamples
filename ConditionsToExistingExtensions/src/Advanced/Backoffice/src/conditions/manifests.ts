// Instead of registering the condition in the umbraco-package.json file,
// we write our manifest in a typescript file that we can export as a single bundle later.

// We can import our condition strong typed
import { VisibilityDeleteButtonCondition } from './visibility-delete-button-condition';

// We need the extension registry for appending the condition to the existing trash button
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

// Because we use the alias more than once, a constant is always a good idea
// but why not also export it so it can be reused elsewhere when the condition needs to be referenced
export const DELETE_BUTTON_VISIBILITY_CONDITION_ALIAS = 'Luuk.Examples.Condition.VisibilityDeleteButton';

// This is the actual manifest for our condition
// It's an array in case we want to add additional conditions later
export const manifests: Array<UmbExtensionManifest> = [
	{
		type: 'condition',
		name: 'Visibility delete button condition',
		alias: DELETE_BUTTON_VISIBILITY_CONDITION_ALIAS,

		// Instead of just referencing the file in the 'js' property,
        // we can use the string typed condition import on the 'api' property
		api: VisibilityDeleteButtonCondition
	}
];

// Since this is just another javascript file, we can also execute code here.
// Add the delete button visibility condition to the existing Trash button
umbExtensionsRegistry.appendCondition('Umb.EntityAction.Document.RecycleBin.Trash', {
	alias: DELETE_BUTTON_VISIBILITY_CONDITION_ALIAS
});
