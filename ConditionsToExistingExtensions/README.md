# Example: Add custom condition to existing extension
<table>
<tr><td>Created/Tested in:</td><td>v16.1.1</td></tr>
</table>

This is an example on how to register a custom condition to an existing extension. This is useful for when you need to change the behavior of existing extensions, especially the extensions that ship with Umbraco.

The example contains a condition that removes the delete button from the context menu of a document if the document type alias of the document is `Homepage`. Ofcourse in real life, the logic would probably be more complex, but this gives a good idea about the functionality.

To add a condition to an existing extension, you need to do the following
1. Create a custom condition
2. Register it using a manifest
3. Append the custom condition to an existing extension by alias.

## VanillaJs example
The VanillaJs folder contains the example written entirely in vanilla Javascript, so it does not need any compilation. This means that you can copy the App_Plugins folder to the wwwroot folder of your Umbraco instance and it will work. I highly recommend using typescript to prevent runtime surpises, but sometimes the effort for setting up a typescript build pipeline is not always with the effort.

## Typescript example (TBA)
This example is not yet created. This will be the same example as the VanillaJs example, but with typescript annotations and types.

## Advances example (TBA)
This example is not yet created. This will show a more advanced example using javascript to register the manifest so there is no need for the backoffice entry point.