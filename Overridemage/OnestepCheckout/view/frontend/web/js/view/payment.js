define([
        'ko',
        'Magento_Checkout/js/model/payment-service',
        'Magento_Checkout/js/view/payment',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Checkout/js/checkout-data'
    ], function(ko, paymentService, Payment, quote, selectPaymentMethodAction, checkoutData) {
        'use strict';

        return Payment.extend({
            isVisible: ko.observable(true),

            initialize: function() {
                this._super();
                console.log('Payment Methods:', paymentService.getAvailablePaymentMethods());
                console.log('Payment Service:', paymentService);
                console.log('Quote:', quote);
                // 检查 paymentGroupsList
                if (this.paymentGroupsList) {
                    console.log('Payment Groups:', this.paymentGroupsList());
                }
                // Force visibility
                this.isVisible(true);
                this.navigate();
                this.setDefaultMethod();

                return this;
            },
            getGroupTitle: function () {
                // 添加调试信息
                console.log('Getting group title');
                return this._super();
            },
            setDefaultMethod: function () {
                try {
                    var methods = paymentService.getAvailablePaymentMethods();
                    console.log('Available Methods:', methods);

                    if (methods && methods.length > 0) {
                        if (!quote.paymentMethod()) {
                            var defaultMethod = checkoutData.getSelectedPaymentMethod();
                            if (!defaultMethod) {
                                defaultMethod = methods[0].method;
                            }

                            var method = methods.find(function(method) {
                                return method.method === defaultMethod;
                            });

                            if (method) {
                                console.log('Setting default method:', method);
                                selectPaymentMethodAction(method);
                                checkoutData.setSelectedPaymentMethod(method.method);
                            }
                        }
                    } else {
                        console.warn('No payment methods available');
                    }
                } catch (error) {
                    console.error('Error in setDefaultMethod:', error);
                }
            },
        });

    }
);
