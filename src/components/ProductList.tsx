import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBuyProduct: (product: Product) => void;
}

const ProductList = ({ products, onSelectProduct, onBuyProduct }: ProductListProps) => {
  return (
    <div className="w-full -mx-4 px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              description={product.description}
              availability={product.availability}
              onSelect={() => onSelectProduct(product)}
              onBuy={() => onBuyProduct(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;