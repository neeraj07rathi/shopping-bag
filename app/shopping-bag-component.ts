import { Component } from '@angular/core';
import {CONSTANTS} from './constants';

@Component({
    selector: 'shopping-bag',
    templateUrl: 'app/shopping-bag.html',
    styleUrls: ['app/shopping-bag.css'],
})
export class ShoppingBagComponent {
    public productJson: Object;
    public isModalVisible: boolean = false;
    public productList: Array<any>;
    public totalProducts: number;
    public itemsInCart: number;
    public totalPrice: number;
    public subTotal: number;
    public estimatedTotal: number;
    public discountCode: string;
    public discountAmount: number;
    public productToEdit: any;
    public PROMO_CODES: any = {
        SN00: 0,
        SN05: 5,
        SN10: 10,
        SN25: 25
    };
    public modalStyle: {'top': string};
    public newEdittedColor: string;
    public newEditedQuantity: number;
    public newEditedSize: string;

    constructor() {
      this.productJson = CONSTANTS.PRODUCT_LIST;
      this.productList = <Array<any>> this.productJson['productsInCart'];
      this.itemsInCart = this.productList.length;
      this.updateSubTotal();
      this.updateEstimatedTotal();
      this.modalStyle = {'top': '0px'};
    }

    public updateSubTotal() {
      this.subTotal = this.getSubTotal();
    }

    public updateEstimatedTotal() {
      this.estimatedTotal = this.getEstimatedTotal();
    }

    public getTotalProducts(): number {
        let totalProducts = 0,
            products = this.productList,
            length = products.length,
            i;

        for (i = 0; i < length; i++) {
            totalProducts = totalProducts + Number(products[i].p_quantity);
        }

        return totalProducts;
    }

    public getSubTotal(): number {
        let totalPrice = 0,
            products = this.productList,
            productLength = products.length,
            i: number;

        for (i = 0; i < productLength; i++) {
            totalPrice = totalPrice + (products[i].p_quantity * products[i].p_price);
        }

        return totalPrice;
    }

    public getEstimatedTotal(): number {
        let estimatedTotal: number,
            subTotal: number,
            totalSelectedProducts: number,
            discount: number;

        subTotal = this.getSubTotal();
        totalSelectedProducts = this.getTotalProducts();
        discount = this.getDiscount(totalSelectedProducts);
        this.discountAmount = (discount * subTotal) / 100;
        estimatedTotal = subTotal - this.discountAmount;

        return estimatedTotal;
    }

    public getDiscount(numberOfProducts: number): number {
        let discount: number;

        if (numberOfProducts < 3) {
            this.discountCode = 'SN00';
        } else if (numberOfProducts === 3) {
            this.discountCode = 'SN05';
        } else if (numberOfProducts > 3 && numberOfProducts < 6) {
            this.discountCode = 'SN10';
        } else if (numberOfProducts > 6) {
            this.discountCode = 'SN25';
        }

        discount = this.PROMO_CODES[this.discountCode];

        return discount;
    }

    public updateTotals() {
         this.updateSubTotal();
         this.updateEstimatedTotal();
    }

    public onProductQuantityChange(e, product) {
        product.p_quantity = e.target.value;

        this.updateTotals();
    }

    public removeProductFromList(e, product) {
        let index = this.productList.indexOf(product);

        this.productList.splice(index, 1);

        this.updateTotals();
    }

    public editProduct(e, product) {
        let top: number;

        this.isModalVisible = true;
        this.productToEdit = product;
        this.newEdittedColor = this.productToEdit.p_variation;
        this.newEditedQuantity = this.productToEdit.p_quantity;
        this.newEditedSize = this.productToEdit.p_selected_size.code;
        console.log(product);
        top = document.body.scrollTop + 100;

        this.modalStyle['top'] = top + 'px';
    }

    public onEditProductSizeChange(e) {
        let newSize = e.target.value;

        this.newEditedSize = newSize;
    }

    public onEditProductQuantityChange(e) {
        let newQuantity = e.target.value;

        this.newEditedQuantity = newQuantity;
    }

    public onSavingEditedProduct(e) {
        this.productToEdit.p_quantity = this.newEditedQuantity;
        this.productToEdit.p_variation = this.newEdittedColor;
        this.productToEdit.p_selected_size.code = this.newEditedSize;

        this.updateTotals();

        this.closeModal();
    }

    public onKeyDownEvent(e) {
      console.log('event captured');
    }

    public onCrossClick(e) {
      e.preventDefault();
      e.stopPropagation();

      this.closeModal();
    }

    public closeModal() {
      this.isModalVisible = false;
    }

    public onBackDropClick() {
      this.closeModal();
    }

    public onNewColorClick(event, color) {
      this.newEdittedColor = color.name;
    }
}
