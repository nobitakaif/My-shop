import { ProductSelect } from "@/db/schema"
import { ProductCard } from "./productCard"
import { use } from "react"

export const RecommendedProducts = ({recommendedProducts }:{recommendedProducts : Promise<ProductSelect[]>})=>{
    const recommendedData = use(recommendedProducts)
    return <div>
        <h2 className="text-2xl font-bold">Recommended Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedData.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    </div>
}