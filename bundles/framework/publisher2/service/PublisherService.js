/*
 * @class Oskari.mapframework.bundle.publisher2.PublisherService
 *
 */
Oskari.clazz.define('Oskari.mapframework.bundle.publisher2.PublisherService',

    /**
     * @method create called automatically on construction
     * @static
     * @param {Oskari.Sandbox} sandbox
     */
    function (sandbox) {
        this.__sandbox = sandbox;
        this.isActive = false;
    }, {
        /**
         * @method getLayersWithoutPublishRights
         * Checks currently selected layers and returns a subset of the list
         * that has the layers that can't be published. If all selected
         * layers can be published, returns an empty list.
         * @return {Oskari.mapframework.domain.AbstractLayer[]} list of layers that can't be published.
         */
        getLayersWithoutPublishRights: function () {
            const selectedLayers = this.__sandbox.findAllSelectedMapLayers();
            return selectedLayers.filter(layer => !this.hasPublishRight(layer));
        },
        /**
         * @method hasPublishRight
         * Checks if the layer can be published.
         * @param
         * {Oskari.mapframework.domain.AbstractLayer} layer layer to check
         * @return {Boolean} true if the layer can be published
         */
        hasPublishRight: function (layer) {
            // permission might be "no_publication_permission"
            // or nothing at all
            return layer.hasPermission('publish');
        },
        /**
         * Stores references to layers that are not available for publishing
         * @param {Oskari.mapframework.domain.AbstractLayer[]} deniedList
         */
        setNonPublisherLayers: function (deniedList) {
            this.disabledLayers = deniedList;
        },
        /**
         * Returns layers that are not available for publishing
         * @return {Oskari.mapframework.domain.AbstractLayer[]}
         */
        getNonPublisherLayers: function () {
            if (!this.disabledLayers) {
                return [];
            }
            return this.disabledLayers;
        },
        /**
         * @method setIsActive
         * Sets publisher into active mode
         * @param {Boolean} isActive
         */
        setIsActive: function (isActive) {
            this.isActive = isActive;
        },
        /**
         * @method getIsActive
         * Get publisher active state
         * @return {Boolean}
         */
        getIsActive: function () {
            return this.isActive;
        },
        /**
         * @method addLayers
         * Adds temporarily removed layers to map
         */
        addLayers: function () {
            var sandbox = this.__sandbox;
            this.getNonPublisherLayers().forEach(layer => {
                sandbox.postRequestByName('AddMapLayerRequest', [layer.getId(), true]);
            });
        },

        /**
         * @method removeLayers
         * Removes temporarily layers from map that the user can't publish
         */
        removeLayers: function () {
            var sandbox = this.__sandbox;
            this.getNonPublisherLayers().forEach(layer => {
                sandbox.postRequestByName('RemoveMapLayerRequest', [layer.getId()]);
            });
        }
    }
);
