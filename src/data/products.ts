import { eq } from "drizzle-orm"
import { db } from "@/db"
import {  ProductInsert, products, ProductSelect } from "@/db/schema"

export async function getAllProducts(){
    try{
        const product = await db.select().from(products);
        return product
    }catch(e){
        console.log("Error white getting all the product")
        return []
    }
}

export async function getRecommendedProducts(){
    try{
        await new Promise((resolve)=> setTimeout(resolve,1000))
        const productData = await db.select().from(products).limit(3)
        return productData
    }catch(e){
        console.log(`Error getting recommended products : `, e)
        return [];
    }
}

export async function getProductById(id: string){
    try{
        const product = await db.select().from(products).where(eq(products.id, id)).limit(1)
        return product[0] ?? null
    }catch(e){
        console.log('Error getting products by id : ', e)
        return null
    }
}


export async function createProduct(
    data : ProductInsert,
) : Promise<ProductSelect> {
    try{
        const result = await db.insert(products).values(data).returning()
        const product = result[0]
        if(!product){
            throw new Error('Failed to create product : no product returned from database')
        }
        return product
    }catch(e){
        console.log("Error while create product ", e)
        throw e
    }
}
 