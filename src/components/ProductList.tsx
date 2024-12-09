import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBuyProduct: (product: Product) => void;
}

const ProductList = ({ products, onSelectProduct, onBuyProduct }: ProductListProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 p-2 pb-4 scrollbar-hide">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rating={product.rating}
          description={product.description}
          onSelect={() => onSelectProduct(product)}
          onBuy={() => onBuyProduct(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;