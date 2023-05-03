export class ProductExtra {
  name = '';
  price = 0;
  id?= ''
}
export class AddProduct {
  branchId = '';
  categoryId = '';
  description = '';
  name = '';
  price = '';
  calories = '';
  isAvailable = false;
  image = {
    defaultFile: null,
    otherImagesFiles: [],
  };

  productsExtraItems: ProductExtra[] = [];
}

export interface CategoryWithProducts {
  id: string
  name: string
  imageUrl: string
  products: Product[]
}

export interface Product {
  [x: string]: any;
  id: string
  name: string
  price: number
  imageUrl: string
  productExtraItems?: ProductExtra[]
}

export interface ShopWithProducts {
  id: string
  name: string
  products: Product[]
}

