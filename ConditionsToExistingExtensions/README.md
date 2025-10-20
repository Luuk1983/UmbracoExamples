# Example: Add custom condition to existing extension

**Created**: 02-10-2025 | **Last revision:** 20-10-2025 | **Umbraco version:** 16.1.1

This is an example on how to register a custom condition to an existing extension. This is useful for when you need to change the behavior of existing extensions, especially the extensions that ship with a default Umbraco installation.

The example contains a condition that removes the delete button (or actually the 'trash' button) from the menu of a document if a condition is met. In the example, it will remove the delete button if the document type alias of the document is `Homepage`. Ofcourse in real life, the logic would probably be more complex, but this gives a good idea about the functionality.

<figure style="margin:0; margin-bottom:2rem;">
  <img src="images/trashbutton_visible.jpg" alt="Visible delete icon in menu">
  <figcaption>On the 'Test' node, the Trash button is displayed, because it has an alias of 'WebsiteContainer'</figcaption>
</figure>


<figure style="margin:0; margin-bottom:1rem;">
  <img src="images/trashbutton_removed.jpg" alt="Delete icon removed from menu">
  <figcaption>On the 'Home' node, the Trash button is removed, because it has an alias of 'Homepage'</figcaption>
</figure>

To add a condition to an existing extension, you need to do the following
1. Create a custom condition. See the Umbraco docs on [creating custom conditions](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/condition#make-your-own-conditions).
2. Register it using a manifest. See the Umbraco docs on [what a manifest is](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-registry/extension-manifest).
3. Append the custom condition to an existing extension by alias.

I created three version of this example:
* A vanilla Javascript example. I recommend this if you have a very small extension without too much complex logic.
* A TypeScript example. This is the same example as the vanilla javascript example, except that the javascript files are strong types with typescript. It's just for showing what's possible, but I would recommend the advanced example if you need to use npm anyway.
* An advanced example. Here we create the manifest in code and create a [bundle](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/bundle) instead of seperate files.

## Vanilla javascript example
Sometimes you just need something to work and it doesn't need to be pretty, or the work to setup a vite build pipeline is worth the effort. In that case, vanilla (or plain) javascript is fine. I recommend this is  The [VanillaJs folder](src/VanillaJs/) contains an example written entirely in vanilla Javascript, so it does not need any compilation.

* The file [visibility-delete-button-condition.js](src/VanillaJs/wwwroot/App_Plugins/ExampleDeleteButton/visibility-delete-button-condition.js) contains the actual condition. This condition checks if the current entity is a document and tries to get document type of the that document. If the content type is the homepage, the condition is false, effectively hiding the trash/delete button.
* The file [startup.js](src/VanillaJs/wwwroot/App_Plugins/ExampleDeleteButton/startup.js) contains the logic to register our custom condition to the existing Umbraco trash/delete button.
* The file [umbraco-package.json](src/VanillaJs/wwwroot/App_Plugins/ExampleDeleteButton/umbraco-package.json) contains the manifest for the condition and the startup extensions.

### How to use it yourself?
#### Prerequisites
* You need an Umbraco 16+ instance to test this on (although it will probably also work in 15).

#### How to get it to work
If you want to try the code yourself, you can just copy the wwwroot folder to the root folder of your Umbraco instance and it will work. Ofcourse you may need to change the document type alias that the condition checks on, but that is it!

## Typescript example
In most scenarios I recommend to use typescript for it's strong typed types and it's compile time checks of the code. This example is in the [TypeScript folder](src/TypeScript/) and is in essence the same example as the vanilla javascript code. The difference is that the source files are typescript files that need to be compiled.

To be honest, if you are already working with npm and typescript I would recommend to go for the advances/bundle approach that makes it so much easier to create a clean architecture. But this example is simpeler, so I decided to add it.

* The [Backoffice folder](src/TypeScript/Backoffice/) contains the uncompiled typescript files. These files get compiled to the [wwwroot folder](src/TypeScript/wwwroot/) where the umbraco-package.json lives.
* The file [visibility-delete-button-condition.ts](src/TypeScript/Backoffice/src/visibility-delete-button-condition.ts) contains the actual condition. This condition checks if the current entity is a document and tries to get document type of the that document. If the content type is the homepage, the condition is false, effectively hiding the trash/delete button.
* The file [startup.ts](src/TypeScript/Backoffice/src/startup.ts) contains the logic to register our custom condition to the existing Umbraco trash/delete button.
* The file [umbraco-package.json](src/TypeScript/wwwroot/App_Plugins/ExampleDeleteButton/umbraco-package.json) contains the manifest for the condition and the startup extensions.

### How to use it yourself?
#### Prerequisites
* You need an Umbraco 16+ instance to test this on (although it will probably also work in 15).
* You need to have [Node 20.11](https://nodejs.org/en/download) or higher.

#### How to get it to work
1. Copy the contents of the [TypeScript folder](src/TypeScript/) to the root of your local Umbraco instance folder.
2. In your local Umbraco instance, navigate to the **Backoffice** folder. This is the folder that contains the **package.json** file.
3. In the context of that folder, execute the following command to install the required npm packages:  `npm ci`
4. Once all packages are installed, build the typescript files by running the following command in the context of the same folder: `npm run build`.

## Advances example (bundle approach)
This example a [bundle](https://docs.umbraco.com/umbraco-cms/customizing/extending-overview/extension-types/bundle) extension and registers the manifests in code. Although this example only contains a single condition, you can see an architecture that makes it easy to seperate concerns and keep the umbraco-package.json clean. This approach is recommended for extensions that consist of many parts.

* The [Backoffice folder](src/Advanced/Backoffice/) contains all the code that is required. When compiled, these files are compiled to the wwwroot/App_Plugins/
* The [public](src/Advanced/Backoffice/public/) folder gets copied over as-is and contains the umbraco-package.json file.

### How to use it yourself?
#### Prerequisites
* You need an Umbraco 16+ instance to test this on (although it will probably also work in 15).
* You need to have [Node 20.11](https://nodejs.org/en/download) or higher.

#### How to get it to work
1. Copy the contents of the [Advanced folder](src/Advanced) to the root of your local Umbraco instance folder.
2. In your local Umbraco instance, navigate to the **Backoffice** folder. This is the folder that contains the **package.json** file.
3. In the context of that folder, execute the following command to install the required npm packages: `npm ci`
4. Once all packages are installed, build the typescript files by running the following command in the context of the same folder: `npm run build`. This should create the /wwwroot/App_Plugins/ExampleDeleteButton folder and it's content.