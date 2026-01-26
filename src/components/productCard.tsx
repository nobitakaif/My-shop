import { ShoppingBagIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import type {
    ProductSelect,
} from "../db/schema"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Skeleton } from "./ui/skeleton"


const inventoryTone = {
    'in-stock' : "bg-emerald-50 text-emerald-600 border-emerald-100",
    'backorder' : "bg-amber-50 text-amber-600 border-amber-100",
    'preorder' : "bg-indigo-50 text-indigo-600 border-indigo-100",
}

export function ProductCard({
    product,
}: {
    product: ProductSelect
}){ 
    return (
        <Suspense fallback={
        <div>
          <h2 className='text-2xl font-bold my-4'>Recommended Products</h2>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({length : 3}).map((_, index)=>(
            <Skeleton  key={index} className='w-full h-48'/> 
          ))}
        </div>
      </div>
      }>
        <Link to="/products/$id" params={{id : product.id}} className="cursor-pointer h-full rounded-full hover:-translate-y-1 hover:shadow-lg transition duration-500">
        <Card className="shadow-xl px-2 py-5">
            <CardHeader className="gap-2">
                <div className="flex items-center gap-2">
                    {product.badge && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                            {product.badge}
                        </span>
                    )}
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                {/* <CardAction>${product.price}</CardAction> */}
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-semibold gap-2 text-sm text-slate-600">{product.rating}</span> 
                    <span className="text-slate-400">{product.reviews}</span>       
                 </div>
                 <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold",
                    inventoryTone[product.inventory],
                 )}>{product.inventory}</span>
            </CardContent>
            <CardFooter className="pt-0 flex items-center justify-between border-t-0 bg-transparent">
                <span>${product.price}</span>
                <Button className="bg-slate-900 text-white hover:bg-slate-800" size={"sm"} variant={"secondary"} onClick={(e)=>{
                    console.log("add to cart")
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                 <ShoppingBagIcon size={16}/>Add to Cart
                </Button>
            </CardFooter>
            
        </Card>
        </Link>
        </Suspense>
    )
}