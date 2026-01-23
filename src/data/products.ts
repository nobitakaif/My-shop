import { db } from "@/db"
import { products } from "@/db/schema"

export async function getRecommendedProducts(){
    try{
        const productData = await db.select().from(products).limit(3)
        return productData
    }catch(e){
        console.log(`Error getting recommended products : `, e)
        return [];
    }
}