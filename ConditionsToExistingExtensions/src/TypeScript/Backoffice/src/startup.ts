import type { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

/**
 * Perform any initialization logic when the Backoffice starts
 */
export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {

    // Add the delete button visibility condition to the existing Trash button
    extensionRegistry.appendCondition('Umb.EntityAction.Document.RecycleBin.Trash', {
        alias: 'Luuk.Examples.Condition.VisibilityDeleteButton'
    });
}