"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var constants_1 = require('./constants');
var ShoppingBagComponent = (function () {
    function ShoppingBagComponent() {
        this.isModalVisible = false;
        this.PROMO_CODES = {
            SN00: 0,
            SN05: 5,
            SN10: 10,
            SN25: 25
        };
        this.productJson = constants_1.CONSTANTS.PRODUCT_LIST;
        this.productList = this.productJson['productsInCart'];
        this.itemsInCart = this.productList.length;
        this.updateSubTotal();
        this.updateEstimatedTotal();
        this.modalStyle = { 'top': '0px' };
    }
    ShoppingBagComponent.prototype.updateSubTotal = function () {
        this.subTotal = this.getSubTotal();
    };
    ShoppingBagComponent.prototype.updateEstimatedTotal = function () {
        this.estimatedTotal = this.getEstimatedTotal();
    };
    ShoppingBagComponent.prototype.getTotalProducts = function () {
        var totalProducts = 0, products = this.productList, length = products.length, i;
        for (i = 0; i < length; i++) {
            totalProducts = totalProducts + Number(products[i].p_quantity);
        }
        return totalProducts;
    };
    ShoppingBagComponent.prototype.getSubTotal = function () {
        var totalPrice = 0, products = this.productList, productLength = products.length, i;
        for (i = 0; i < productLength; i++) {
            totalPrice = totalPrice + (products[i].p_quantity * products[i].p_price);
        }
        return totalPrice;
    };
    ShoppingBagComponent.prototype.getEstimatedTotal = function () {
        var estimatedTotal, subTotal, totalSelectedProducts, discount;
        subTotal = this.getSubTotal();
        totalSelectedProducts = this.getTotalProducts();
        discount = this.getDiscount(totalSelectedProducts);
        this.discountAmount = (discount * subTotal) / 100;
        estimatedTotal = subTotal - this.discountAmount;
        return estimatedTotal;
    };
    ShoppingBagComponent.prototype.getDiscount = function (numberOfProducts) {
        var discount;
        if (numberOfProducts < 3) {
            this.discountCode = 'SN00';
        }
        else if (numberOfProducts === 3) {
            this.discountCode = 'SN05';
        }
        else if (numberOfProducts > 3 && numberOfProducts < 6) {
            this.discountCode = 'SN10';
        }
        else if (numberOfProducts > 6) {
            this.discountCode = 'SN25';
        }
        discount = this.PROMO_CODES[this.discountCode];
        return discount;
    };
    ShoppingBagComponent.prototype.updateTotals = function () {
        this.updateSubTotal();
        this.updateEstimatedTotal();
    };
    ShoppingBagComponent.prototype.onProductQuantityChange = function (e, product) {
        product.p_quantity = e.target.value;
        this.updateTotals();
    };
    ShoppingBagComponent.prototype.removeProductFromList = function (e, product) {
        var index = this.productList.indexOf(product);
        this.productList.splice(index, 1);
        this.updateTotals();
    };
    ShoppingBagComponent.prototype.editProduct = function (e, product) {
        var top;
        this.isModalVisible = true;
        this.productToEdit = product;
        this.newEdittedColor = this.productToEdit.p_variation;
        this.newEditedQuantity = this.productToEdit.p_quantity;
        this.newEditedSize = this.productToEdit.p_selected_size.code;
        console.log(product);
        top = document.body.scrollTop + 100;
        this.modalStyle['top'] = top + 'px';
    };
    ShoppingBagComponent.prototype.onEditProductSizeChange = function (e) {
        var newSize = e.target.value;
        this.newEditedSize = newSize;
    };
    ShoppingBagComponent.prototype.onEditProductQuantityChange = function (e) {
        var newQuantity = e.target.value;
        this.newEditedQuantity = newQuantity;
    };
    ShoppingBagComponent.prototype.onSavingEditedProduct = function (e) {
        this.productToEdit.p_quantity = this.newEditedQuantity;
        this.productToEdit.p_variation = this.newEdittedColor;
        this.productToEdit.p_selected_size.code = this.newEditedSize;
        this.updateTotals();
        this.closeModal();
    };
    ShoppingBagComponent.prototype.onKeyDownEvent = function (e) {
        console.log('event captured');
    };
    ShoppingBagComponent.prototype.onCrossClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
    };
    ShoppingBagComponent.prototype.closeModal = function () {
        this.isModalVisible = false;
    };
    ShoppingBagComponent.prototype.onBackDropClick = function () {
        this.closeModal();
    };
    ShoppingBagComponent.prototype.onNewColorClick = function (event, color) {
        this.newEdittedColor = color.name;
    };
    ShoppingBagComponent = __decorate([
        core_1.Component({
            selector: 'shopping-bag',
            templateUrl: 'app/shopping-bag.html',
            styleUrls: ['app/shopping-bag.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], ShoppingBagComponent);
    return ShoppingBagComponent;
}());
exports.ShoppingBagComponent = ShoppingBagComponent;
//# sourceMappingURL=shopping-bag-component.js.map