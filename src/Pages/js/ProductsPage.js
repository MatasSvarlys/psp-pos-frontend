import { useState } from "react";
import ProductsSection from "./ProductsSection";
import ProductVariationsSection from "./ProductVariationsSection";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div>
      <h1>Products Management</h1>

      {/* Tab Navigation */}
      <div>
        <button onClick={() => setActiveTab("products")}>Products</button>
        <button onClick={() => setActiveTab("productVariations")}>Product Variations</button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "products" && <ProductsSection />}
        {activeTab === "productVariations" && <ProductVariationsSection />}
      </div>
    </div>
  );
}
