/**
 * Perform any initialization logic when the Backoffice starts
 */
export const onInit = (host, extensionRegistry) => {
    // Add the delete button visibility condition to the existing Trash button
    extensionRegistry.appendCondition('Umb.EntityAction.Document.RecycleBin.Trash', {
        alias: 'Luuk.Examples.Condition.VisibilityDeleteButton'
    });
}

/**
 * Perform any cleanup logic when the Backoffice and/or the package is unloaded
 */
export const onUnload = (host, extensionRegistry) => {
    // Remove the delete button visibility condition from the existing Trash button
    extensionRegistry.removeCondition('Umb.EntityAction.Document.RecycleBin.Trash', {
        alias: 'Luuk.Examples.Condition.VisibilityDeleteButton'
    });
}