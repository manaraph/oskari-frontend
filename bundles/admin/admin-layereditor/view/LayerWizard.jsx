import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Step, Button, Message } from 'oskari-ui';
import { LayerTypeSelection } from './LayerWizard/LayerTypeSelection';
import { LayerURLForm } from './LayerWizard/LayerURLForm';
import { LocaleConsumer, Controller } from 'oskari-ui/util';
import { LayerCapabilitiesListing } from './LayerWizard/LayerCapabilitiesListing';
import styled from 'styled-components';

const WIZARD_STEP = {
    INITIAL: 0,
    SERVICE: 1,
    LAYER: 2,
    DETAILS: 3
};

function setStep (controller, requested) {
    switch (requested) {
    case WIZARD_STEP.INITIAL:
        controller.setType();
        break;
    case WIZARD_STEP.SERVICE:
        controller.setVersion();
        break;
    case WIZARD_STEP.LAYER:
        controller.setLayerName();
        break;
    }
}

function getStep (layer) {
    if (typeof layer.type === 'undefined') {
        return WIZARD_STEP.INITIAL;
    }
    if (typeof layer.version === 'undefined') {
        return WIZARD_STEP.SERVICE;
    }
    if (typeof layer.name === 'undefined') {
        return WIZARD_STEP.LAYER;
    }
    return WIZARD_STEP.DETAILS;
}

const LayerTypeTitle = ({ layer, LabelComponent }) => (
    <React.Fragment>
        <Message messageKey='wizard.type' LabelComponent={LabelComponent} />
        { layer.type && `: ${layer.type}` }
    </React.Fragment>
);
LayerTypeTitle.propTypes = {
    layer: PropTypes.object.isRequired,
    LabelComponent: PropTypes.elementType
};

const Header = styled('h4')``;
const Paragraph = styled('p')``;

const LayerWizard = ({
    controller,
    layer,
    capabilities = {},
    layerTypes = [],
    loading,
    children
}) => {
    const currentStep = getStep(layer);
    const isFirstStep = currentStep === WIZARD_STEP.INITIAL;
    const isDetailsForOldLayer = !layer.isNew && currentStep === WIZARD_STEP.DETAILS;
    return (
        <div>
            { (layer.isNew || currentStep !== WIZARD_STEP.DETAILS) &&
            <Steps current={currentStep}>
                <Step title={<LayerTypeTitle layer={layer}/>} />
                <Step title={<Message messageKey='wizard.service'/>} />
                <Step title={<Message messageKey='wizard.layers'/>} />
                <Step title={<Message messageKey='wizard.details'/>} />
            </Steps>
            }
            { currentStep === WIZARD_STEP.INITIAL &&
                <React.Fragment>
                    <LayerTypeTitle layer={layer} LabelComponent={Header}/>
                    <Message messageKey='wizard.typeDescription' LabelComponent={Paragraph}/>
                    <LayerTypeSelection
                        types={layerTypes || []}
                        onSelect={(type) => controller.setType(type)} />
                </React.Fragment>
            }
            { currentStep === WIZARD_STEP.SERVICE &&
                <React.Fragment>
                    <Message messageKey='wizard.service' LabelComponent={Header}/>
                    <Message messageKey='wizard.serviceDescription' LabelComponent={Paragraph}/>
                    <LayerURLForm
                        layer={layer}
                        loading={loading}
                        controller={controller} />
                </React.Fragment>
            }
            { currentStep === WIZARD_STEP.LAYER &&
                <React.Fragment>
                    <Message messageKey='wizard.layers' LabelComponent={Header}/>
                    <Message messageKey='wizard.layersDescription' LabelComponent={Paragraph}/>
                    <LayerCapabilitiesListing
                        onSelect={(item) => controller.layerSelected(item.name)}
                        capabilities={capabilities} />
                </React.Fragment>
            }
            { currentStep === WIZARD_STEP.DETAILS &&
                <React.Fragment>
                    {children}
                </React.Fragment>
            }
            { !isFirstStep && !isDetailsForOldLayer &&
                <Button onClick={() => setStep(controller, getStep(layer) - 1)}>
                    {<Message messageKey='cancel'/>}
                </Button>
            }
        </div>
    );
};

LayerWizard.propTypes = {
    layer: PropTypes.object.isRequired,
    controller: PropTypes.instanceOf(Controller).isRequired,
    loading: PropTypes.bool,
    capabilities: PropTypes.object,
    layerTypes: PropTypes.array,
    children: PropTypes.any
};

const contextWrap = LocaleConsumer(LayerWizard);
export { contextWrap as LayerWizard };
