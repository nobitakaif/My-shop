import { db } from "@/db"
import { cartItems, products } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const getCartItemsFn = async () =>{
    const cart = await db.select().from(cartItems).innerJoin(
        products, eq(cartItems.productId, products.id)
    )
    return { items : cart.map((item)=>({
            ...item.products,
            quanity: item.cart_items.quantity
        })
    )}
}

async function updateCartItem(productId : string, quanity : number =1){
    const qty = Math.max(1, Math.min(quanity, 99))
    const existingItem= await db.select().from(cartItems).where(eq(cartItems.productId, productId)).limit(1)
    if(existingItem.length>0){
        await db.update(cartItems).set({quantity : qty}).where(eq(cartItems.productId, productId))
    }
}

async function addToCart(productId : string, quanity : number =1){
    const qty = Math.max(1, Math.min(quanity, 99))

    const existingItem = await db.select().from(cartItems).where(eq(cartItems.productId, productId)).limit(1)

    if(existingItem.length>0){
        await updateCartItem(productId, existingItem[0].quantity+qty)
    }else{
        await db.insert(cartItems).values({productId, quantity : qty})
    }
    return getCartItemsFn()
}

export const mutateCartFn= createServerFn({method : "POST"}).inputValidator(
    (data: {
        action : 'add' | 'remove' | 'update' | 'clear'
        productId : string
        quantity : number
    })=> data,
).handler(async ({data})=>{
    switch ( data.action){
        case 'add' : return addToCart(data.productId, data.quantity)
        case 'remove' : 
        case 'update' : return updateCartItem(data.productId, data.quantity)
        case 'clear' :
    }
})