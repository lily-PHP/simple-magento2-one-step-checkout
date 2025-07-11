/*global define,alert*/
define(
    [
        'Magento_Checkout/js/model/quote',
        'Overridemage_OnestepCheckout/js/model/shipping-save-processor'
    ],
    function (quote, shippingSaveProcessor) {
        'use strict';
        return function () {
            return shippingSaveProcessor.saveShippingInformation(quote.shippingAddress().getType());
        }
    }
);
