import { cn } from "@/lib/utils"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ShoppingBagIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"


const inventoryTone = {
    'in-stock' : "bg-emerald-50 text-emerald-600 border-emerald-100",
    'backorder' : "bg-amber-50 text-amber-600 border-amber-100",
    'preorder' : "bg-indigo-50 text-indigo-600 border-indigo-100",
}

export function ProductCard({
    product,
}: {
    product: {
        name : string
        description : string
        price : string
        badge : string 
        rating : string
        reviews : number 
        image? : string
        inventory : string 
    }
}){ 
    return (
        <Link to="/products/$id" params={{id}} className="cursor-pointer h-full rounded-full hover:-translate-y-1 hover:shadow-lg transition">
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
                    inventoryTone[product.inventory as keyof typeof inventoryTone],
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
    )
}