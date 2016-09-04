import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {ShoppingBagModule} from './shopping-bag-module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(ShoppingBagModule);
