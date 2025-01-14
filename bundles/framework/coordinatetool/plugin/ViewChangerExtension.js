/**
 * @class Oskari.mapframework.bundle.coordinatetool.plugin.ViewChangerExtension
 * Provides a coordinate display for map
 */
Oskari.clazz.define('Oskari.mapframework.bundle.coordinatetool.plugin.ViewChangerExtension',
    /**
     * @method create called automatically on construction
     * @static
     * @param {Object} config
     *      JSON config with params needed to run the plugin
     */
    function (instance, config, locale, mapmodule, sandbox) {
        this._locale = locale;
        this._config = config || {};
        this._mapmodule = mapmodule;
        this._sandbox = sandbox;
        this._instance = instance;
        this._clazz =
            'Oskari.mapframework.bundle.coordinatetool.plugin.ViewChangerExtension';
        this._templates = {
            projectionSelect: jQuery(
                '<div class="clear"></div>' +
                '<div class="projectionchange">' +
                '   <div class="coordinatetool-divider"></div>' +
                '   <div class="coordinatetool-projection-change-header"></div>' +
                '   <div class="margintop">' +
                '       <div class="projection-label coordinate-label floatleft"></div>' +
                '       <div class="floatleft">' +
                '           <select id="projection" class="lon-input projection-select"></select>' +
                '       </div>' +
                '   </div>' +
                '   <div class="clear"/>' +
                '   <div class="coordinate-tool-projection-change-confirmation margintop" style="display:none;">' +
                '       <div class="projection-change-confirmation-message"></div>' +
                '       <div>' +
                '           <div class="floatright">' +
                '               <button class="projection-change-button-cancel oskari-button oskari-formcomponent"></button>' +
                '               <button class="projection-change-button-ok oskari-button oskari-formcomponent primary"></button>' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            ),
            projectionSelectOption: jQuery('<option></option>')
        };
    }, {
        /**
         * Loads the view with the uuid corresponding to the selected projection
         * @param {String} uuid uuid of the view to load
         * @method @private _changeProjection
         */
        _changeProjection: function (uuid) {
            if (!uuid) {
                return;
            }
            var url = window.location.origin;
            if (window.location.pathname && window.location.pathname.length) {
                url += window.location.pathname;
            }
            url += '?uuid=' + uuid + '&noSavedState=true';

            window.location.href = url;
        },
        /**
         * Generates the element for the projection change based on config
         * @method @public initCoordinatesTransformChange
         * @param {Object} popupContent
         * @return {Object} projectionSelect
         */
        initProjectionChange: function (popup) {
            const me = this;

            me._popup = popup;
            const config = this._config || {};
            const hasMoreProjConfigs = config.supportedProjections && Object.keys(config.supportedProjections) > 1;

            if (!hasMoreProjConfigs) {
                return;
            }
            me._popup.dialog.find('.actions').after(me._templates.projectionSelect.clone());
            me._popup.dialog.find('.coordinatetool-projection-change-header').html(me._locale('display.projectionChange.header'));
            me._popup.dialog.find('.projection-label').html(me._locale('display.projectionChange.projection'));
            me._popup.dialog.find('.projection-change-confirmation-message').html(me._locale('display.projectionChange.confirmationMessage'));
            me._popup.dialog.find('.projection-change-button-cancel').html(me._locale('display.projectionChange.buttons.cancel'));
            me._popup.dialog.find('.projection-change-button-ok').html(me._locale('display.projectionChange.buttons.ok'));

            me._projectionSelect = me._popup.dialog.find('.projection-select');
            me._populateProjectionSelect(me._projectionSelect);
            me._projectionSelect.on('change', function (event) {
                me._toggleProjectionSelectionConfirmation(true);
            });

            me._popup.dialog.find('.projection-change-button-ok').off('click');
            me._popup.dialog.find('.projection-change-button-ok').on('click', function () {
                me._changeProjection(me._projectionSelect.val());
            });

            me._popup.dialog.find('.projection-change-button-cancel').off('click');
            me._popup.dialog.find('.projection-change-button-cancel').on('click', function () {
                me._toggleProjectionSelectionConfirmation(false);
            });

            // set default value
            me._resetProjectionSelect();
        },
        /**
         * Generates the options for the projection change select based on config, or hides control if no options
         * @method @private _populateProjectionSelect
         * @param {Object} popupContent
         */
        _populateProjectionSelect: function (select) {
            const config = this._config || {};
            const keys = Object.keys(config.supportedProjections || {}).sort();
            keys.forEach((key) => {
                var option = this._templates.projectionSelectOption.clone();
                option.val(config.supportedProjections[key]);
                option.html(key);
                select.append(option);
            });
        },
        /**
         * Toggles the projections change confirmation panel
         * @method @private _toggleProjectionSelectionConfirmation
         */
        _toggleProjectionSelectionConfirmation: function (display) {
            const cssDisplay = display ? 'block' : 'none';
            this._popup.dialog.find('.coordinate-tool-projection-change-confirmation').css('display', cssDisplay);
            if (!display) {
                this._resetProjectionSelect();
            }
        },
        /**
         * Resets the projection select to current map projection
         * @method @private _resetProjectionSelect
         */
        _resetProjectionSelect: function () {
            const currentProjection = this._mapmodule.getProjection();

            // select the option with projection text
            jQuery(this._projectionSelect).find('option').filter(function () {
                return jQuery(this).text() === currentProjection;
            }).prop('selected', true);
        }
    }, {
        'extend': ['Oskari.mapping.mapmodule.plugin.BasicMapModulePlugin'],
        /**
         * @static @property {string[]} protocol array of superclasses
         */
        'protocol': [
            'Oskari.mapframework.module.Module',
            'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
        ]
    });
