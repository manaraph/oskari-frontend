Oskari.clazz.define('Oskari.mapframework.publisher.tool.LayerSelectionTool',
    function () {
    }, {
        index: 1,
        allowedLocations: ['top left', 'top center', 'top right'],
        lefthanded: 'top right',
        righthanded: 'top left',
        allowedSiblings: [
            'Oskari.mapframework.bundle.featuredata2.plugin.FeaturedataPlugin',
            'Oskari.mapframework.bundle.mapmodule.plugin.PublisherToolbarPlugin',
            'Oskari.mapframework.bundle.mapmodule.plugin.SearchPlugin'
        ],
        groupedSiblings: false,
        _templates: {
            extraOptions: jQuery(`
            <div class="publisher2 background-layer-selector tool-options">
                <div class="style-selection">
                    <label><input type="checkbox"/><span></span></label>
                </div>
                <div class="info"></div>
                <div class="layers"></div>
            </div>
            `),
            backgroundCheckbox: jQuery('<div class="background-layers"><label>' +
                '    <input class="baselayer" type="checkbox"/>' +
                '  </label><div>')
        },
        _extraOptions: null,

        /**
    * Get tool object.
    * @method getTool
    *
    * @returns {Object} tool description
    */
        getTool: function () {
            return {
                id: 'Oskari.mapframework.bundle.mapmodule.plugin.LayerSelectionPlugin',
                title: 'LayerSelectionPlugin',
                config: {}
            };
        },
        /**
    * Get values.
    * @method getValues
    * @public
    *
    * @returns {Object} tool value object
    */
        getValues: function () {
            var me = this;

            if (me.state.enabled) {
                var pluginConfig = { id: this.getTool().id, config: this.getPlugin().getConfig() };
                var layerSelection = me._getLayerSelection();

                if (layerSelection && !jQuery.isEmptyObject(layerSelection)) {
                    pluginConfig.config.baseLayers = layerSelection.baseLayers;
                    pluginConfig.config.defaultBaseLayer = layerSelection.defaultBaseLayer;
                }
                pluginConfig.config.isStyleSelectable = me.__plugin.getStyleSelectable();
                return {
                    configuration: {
                        mapfull: {
                            conf: {
                                plugins: [pluginConfig]
                            }
                        }
                    }
                };
            } else {
                return null;
            }
        },
        /**
     * Check layer selections
     * @method  @private _checkLayerSelections
     */
        _checkLayerSelections: function () {
            var me = this,
                layers = me._getLayersList();

            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                var selected = jQuery('.background-layers[data-id=' + layer.getId() + '] input:checked');
                if (selected.length > 0) {
                    me.__plugin.addBaseLayer(layer);
                }
            }
            jQuery('.background-layers[data-id=' + layer.getId() + '] input:checked').trigger('change');
        },
        _getLayerSelection: function () {
            var me = this,
                layerSelection = {};
            var pluginValues = me.getPlugin().getBaseLayers();
            if (pluginValues.defaultBaseLayer) {
                layerSelection.baseLayers = pluginValues.baseLayers;
                layerSelection.defaultBaseLayer = pluginValues.defaultBaseLayer;
            }
            return layerSelection;
        },
        /**
     * Get extra options.
     * @method getExtraOptions
     * @public
     *
     * @returns {Object} jQuery element
     */
        getExtraOptions: function () {
            var me = this;
            if (!me._extraOptions) {
                const initialConf = me._getToolPluginMapfullConf();
                const isAllowStyleChange = initialConf && initialConf.config && initialConf.config.isStyleSelectable;
                const extraOptions = me._templates.extraOptions.clone();
                extraOptions.find('.style-selection label span').append(me.__loc.layerselection.allowStyleChange);
                const allowCheckbox = extraOptions.find('.style-selection label input')
                    .on('change', function () {
                        const isChecked = jQuery(this).is(':checked');
                        me.__plugin.setStyleSelectable(isChecked);
                    });
                if (isAllowStyleChange) {
                    allowCheckbox.prop('checked', true).change();
                }
                extraOptions.find('.info').html(me.__loc.layerselection.info);
                me._extraOptions = extraOptions;
                var layers = me._getLayersList();
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    me._addLayer(layer);
                }
                me._checkCanChangeStyle(layers);
            }
            return me._extraOptions;
        },
        /**
     * @method hasPublishRight
     * Checks if the layer can be published.
     * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer} layer layer to check
     * @return {Boolean} true if the layer can be published
     */
        hasPublishRight: function (layer) {
        // permission might be "no_publication_permission"
        // or nothing at all
            return layer.hasPermission('publish');
        },
        /**
     * Returns the published map layer selection
     *
     * @method _getLayersList
     * @private
     * @return {Oskari.mapframework.domain.WmsLayer[]/Oskari.mapframework.domain.WfsLayer[]/Oskari.mapframework.domain.VectorLayer[]/Mixed}
     */
        _getLayersList: function () {
            var me = this;
            return me.__sandbox.findAllSelectedMapLayers();
        },
        eventHandlers: {
        /**
         * @method AfterMapLayerAddEvent
         * @param {Oskari.mapframework.event.common.AfterMapLayerAddEvent} event
         *
         * Updates the layerlist
         */
            AfterMapLayerAddEvent: function (event) {
                this._handleMapLayerAdd(event._mapLayer);
            },

            /**
         * @method AfterMapLayerRemoveEvent
         * @param {Oskari.mapframework.event.common.AfterMapLayerRemoveEvent} event
         *
         * Updates the layerlist
         */
            AfterMapLayerRemoveEvent: function (event) {
                if (!this.hasPublishRight(event._mapLayer)) {
                    return;
                }
                this._handleMapLayerRemove(event._mapLayer);
            }

        },
        /**
     * @method  @private _addLayer Add layer to UI
     * @param {Object} layer added layer
     */
        _addLayer: function (layer) {
            var me = this;
            if (!this.hasPublishRight(layer)) {
                return;
            }

            // if layer selection = ON -> show content
            var closureMagic = function (layer) {
                return function () {
                    var checkbox = jQuery(this),
                        isChecked = checkbox.is(':checked');

                    layer.selected = isChecked;
                    if (isChecked) {
                        me.__plugin.addBaseLayer(layer);
                    } else {
                        me.__plugin.removeBaseLayer(layer);
                    }
                };
            };

            var layerDiv = me._templates.backgroundCheckbox.clone(),
                foundedLayerDiv = me._extraOptions.find('.layers').find('[data-id=' + layer.getId() + ']');

            if (foundedLayerDiv.length > 0) {
                return;
            }

            layerDiv.find('label').append(Oskari.util.sanitize(layer.getName()));
            layerDiv.attr('data-id', layer.getId());
            var input = layerDiv.find('input');
            input.attr('id', 'checkbox' + layer.getId());

            if (me.shouldPreselectLayer(layer.getId())) {
                input.prop('checked', true);
                layer.selected = true;
            }
            input.on('change', closureMagic(layer));
            me._extraOptions.find('.layers').append(layerDiv);
        },
        /**
     * Should preselt layer.
     * @method @private shouldPreselectLayer
     * @param  {Integer} id layer id
     * @return {Boolean} true if layer must be preselect, other false
     */
        shouldPreselectLayer: function (id) {
            const toolPluginMapfullConf = this._getToolPluginMapfullConf();
            if (toolPluginMapfullConf) {
                var isPluginConfig = !!((toolPluginMapfullConf && toolPluginMapfullConf.config &&
                    toolPluginMapfullConf.config.baseLayers));

                if (isPluginConfig) {
                    return toolPluginMapfullConf.config.baseLayers.includes('' + id);
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        /**
         * @private @method _getToolPluginMapfullConf
         * Get map view cofiguration (from mapfull) for this tool
         * @return {Object / null} config or null if not found
         */
        _getToolPluginMapfullConf: function () {
            var me = this;
            var isConfig = !!((me.data && me.data.configuration));
            var isPlugins = !!((isConfig && me.data.configuration.mapfull &&
            me.data.configuration.mapfull.conf && me.data.configuration.mapfull.conf.plugins));
            var toolPlugin = null;
            if (isPlugins) {
                var plugins = me.data.configuration.mapfull.conf.plugins;
                for (var i = 0; i < plugins.length; i++) {
                    var plugin = plugins[i];
                    if (plugin.id === me.getTool().id) {
                        toolPlugin = plugin;
                        break;
                    }
                }
            }
            return toolPlugin;
        },
        /**
     * Handle add map layer event
     * @method  @private handleMapLayerAdd
     * @param  {Object} layer added layer
     */
        _handleMapLayerAdd: function (layer) {
            var me = this;
            me._addLayer(layer);
            me._checkCanChangeStyle();
        },
        /**
     * Handle remove map layer event
     * @method  @private handleMapLayerRemove
     * @param  {Object} layer removed layer
     */
        _handleMapLayerRemove: function (layer) {
            var me = this,
                layerDiv = me._extraOptions.find('.layers').find('[data-id=' + layer.getId() + ']');
            // TODO checked handling
            layerDiv.remove();
            me._checkCanChangeStyle();
        },
        /**
         * @private @method _checkCanChangeStyle
         * Enable / disable checkbox for layer style change
         * @param {AbstractLayer[]} layers that should be checked
         */
        _checkCanChangeStyle: function (layers = this._getLayersList()) {
            if (!this._extraOptions) {
                return;
            }
            const isStyleChangePossible = layers.some((layer) => {
                return typeof layer.getStyles === 'function' && layer.getStyles().length > 1;
            });

            const input = this._extraOptions.find('.style-selection label input');
            input.prop('disabled', !isStyleChangePossible);
        },
        /**
     * @method init
     * Creates the Oskari.userinterface.component.AccordionPanel where the UI is rendered
     */
        init: function (data) {
            var me = this;
            me.data = data;

            if (data.configuration && data.configuration.mapfull && data.configuration.mapfull.conf && data.configuration.mapfull.conf.plugins) {
                const plugins = data.configuration.mapfull.conf.plugins;
                plugins.forEach(function (plugin) {
                    if (me.getTool().id !== plugin.id) {
                        return;
                    }
                    me.setEnabled(true);
                    if (me.__started) {
                        setTimeout(function () {
                            me._checkLayerSelections();
                        }, 300);
                    }
                });
            }

            for (var p in me.eventHandlers) {
                if (me.eventHandlers.hasOwnProperty(p)) {
                    me.__sandbox.registerForEventByName(me, p);
                }
            }
        },
        getName: function () {
            return 'Oskari.mapframework.publisher.tool.LayerSelectionTool';
        },
        /**
     * @method onEvent
     * @param {Oskari.mapframework.event.Event} event a Oskari event object
     * Event is handled forwarded to correct #eventHandlers if found or discarded if not.
     */
        onEvent: function (event) {
            var handler = this.eventHandlers[event.getName()];
            if (!handler) {
                return;
            }
            return handler.apply(this, [event]);
        },
        /**
    * Stop panel.
    * @method stop
    * @public
    **/
        stop: function () {
            var me = this;

            jQuery('.background-layers input:checked').prop('checked', false);
            jQuery('.publisher2.background-layer-selector').parents('.extraOptions').hide();

            for (var p in me.eventHandlers) {
                if (me.eventHandlers.hasOwnProperty(p)) {
                    me.__sandbox.unregisterFromEventByName(me, p);
                }
            }
            if (me.__plugin) {
                if (me.__sandbox) {
                    me.__plugin.stopPlugin(me.__sandbox);
                }
                me.__mapmodule.unregisterPlugin(me.__plugin);
            }
        }
    }, {
        'extend': ['Oskari.mapframework.publisher.tool.AbstractPluginTool'],
        'protocol': ['Oskari.mapframework.publisher.Tool']
    });
