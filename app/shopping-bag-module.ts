import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShoppingBagComponent }   from './shopping-bag-component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ ShoppingBagComponent ],
  bootstrap:    [ ShoppingBagComponent ]
})

export class ShoppingBagModule { }
