import { ProductT } from "@/typing/products";
import ProductCard from "./ProductCard";

type OurSuggestionsProps = {
  products: ProductT[];
};

const OurSuggestions = ({ products }: OurSuggestionsProps) => {
  if (!products.length) {
    return <div>No results</div>;
  }

  return (
    <div>
      <h2 className="mb-5">Our Suggestions</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OurSuggestions;
