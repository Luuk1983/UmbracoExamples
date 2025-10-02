import { UmbConditionBase } from '@umbraco-cms/backoffice/extension-registry';
import { UMB_ENTITY_CONTEXT } from '@umbraco-cms/backoffice/entity';
import { UmbDocumentItemRepository } from '@umbraco-cms/backoffice/document';
import { UmbDocumentTypeDetailRepository } from '@umbraco-cms/backoffice/document-type';

/** 
 * Represents an Umbraco condition that checks if the delete button should be visible
 */
export class VisibilityDeleteButtonCondition extends UmbConditionBase {
    #entityType = undefined;
    #unique = undefined;

    #documentItemRepository = undefined;
    #documentTypeDetailRepository = undefined;

    /**
     * Constructor
     */
    constructor(host, args) {
        super(host, args);

        // Get repositories needed for determining visibility of the delete button
        this.#documentItemRepository = new UmbDocumentItemRepository(this);
        this.#documentTypeDetailRepository = new UmbDocumentTypeDetailRepository(this);

        //By default, the delete button is permitted unless otherwise determined
        //This also makes sure that if something goes wrong, the delete button will be visible
        this.permitted = true;

        //We need the entity context to determine the entity type and unique identifier
        this.consumeContext(UMB_ENTITY_CONTEXT, (instance) => {
            if (!instance) {
                return;
            }

            this.observe(instance.entityType, (entityType) => {
                this.#entityType = entityType;
                this.#updatePermitted();
            });

            this.observe(instance.unique, (unique) => {
                this.#unique = unique;
                this.#updatePermitted();
            });
        });
    }

    /**
     * Updates whether the delete button is permitted based on the entity type and unique identifier.
     */
    async #updatePermitted() {
        //The condition only works for documents (content nodes) with a unique identifier
        if (!this.#unique || this.#entityType !== 'document') {
            this.permitted = true;
            return;
        }

        //Try to get the document (content node) based on its unique identifier
        const documentItem = await this.#getDocumentByUnique(this.#unique);
        if (documentItem === null) {
            this.permitted = true;
            return;
        }

        //Try to get the document type alias based on the document type unique identifier
        const contentTypeAlias = await this.#getDocumentTypeAliasByUnique(documentItem.documentType.unique);
        if (contentTypeAlias === null) {
            this.permitted = true;
            return;
        }

        //When the content type alias is 'HomepageTest', the delete button should not be visible.
        if (contentTypeAlias === 'HomepageTest') {
            this.permitted = false;
        } else {
            this.permitted = true;
        }
    }

    /**
     * Gets a document (content node) based on its unique identifier.
     * @param {string} unique The unique identifier of the document (the key)
     * @returns {Promise<Object|null>} The document item or null if not found or error occurs
     */
    async #getDocumentByUnique(unique) {
        const { data, error } = await this.#documentItemRepository.requestItems([unique]);

        if (error) {
            return null;
        }

        if (data?.length === 0) {
            return null;
        }
        return data[0];
    }

    /**
    * * Gets the alias of a document type based on its unique identifier.
    * @param {string} unique The unique identifier of the document type (the key)
    * @returns {Promise<string|null>} The alias of the document type or null if not found or error occurs
    */
    async #getDocumentTypeAliasByUnique(unique) {
        const { data, error } = await this.#documentTypeDetailRepository.requestByUnique(unique);

        if (error) {
            return null;
        }

        if (!data) {
            return null;
        }

        return data.alias;
    }
}

export default VisibilityDeleteButtonCondition;