import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Input } from '@/components/ui/input'
import { mutateCartFn } from '@/data/cart'
import { CartItemSelect } from '@/db/schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Minus, Plus, ShoppingBag } from 'lucide-react'

const fetchCartItems = createServerFn({method : 'GET'}).handler(async()=>{
    const { getCartItemsFn} = await import ("@/data/cart")
    const data = await getCartItemsFn()
    return data
})

export const Route = createFileRoute('/products/cart')({
  component: CartPage,
  loader : async ()=>{
    return fetchCartItems()
  }
})


function CartPage() {
    
    const cart =Route.useLoaderData()
    const shipping = cart.items.length > 0 ? 8 : 0
    const subtotal = cart.items.reduce((acc : number, item:CartItemSelect)=> acc + Number(item.price) * item.quantity,0)
    const total = Number(subtotal) + Number(shipping)

    if(cart.items.length ===0 ){
        return <div className='mx-auto max-w-4xl'>
            <Card>
                <CardContent>
                    <Empty>
                        <EmptyMedia variant={"icon"}>
                            <ShoppingBag/>
                        </EmptyMedia>
                        <EmptyHeader>
                            <EmptyTitle> Your car is empty</EmptyTitle>
                            <EmptyDescription>
                                Add a few items from the catalog to see them here.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Link to='/products' className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-white dark:text-slate-900'>
                                Browse products
                            </Link>
                        </EmptyContent>
                    </Empty>
                </CardContent>
            </Card>
        </div> 
    } 

    return <div className='mx-auto grid max-w-5xl gap-6 rounded-2xl border bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[2fr,1fr]'>
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-semibold'>Cart</h1>
                    <p className='text-sm text-slate-600 dark:text-slate-300'> Review your picks before checking out</p>
                </div>
                <Button variant={"ghost"} size={"sm"}> Clear cart</Button>
            </div>
            <div className='divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-950/40'>
                {cart.items.map((item)=>(
                    <div key={item.id} className=' flex justify-between sm:m-4 gap-4'>
                       <div> 
                            <div className='hidden h-20 w-20 items-center border justify-center rounded-lg border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 sm:flex'>
                                <img src={item.image} alt={item.name} className='h-12 w-12 object-contain' loading='lazy' />
                            </div>
                            <div className='space-y-1'>
                                <Link to='/products/$id' params={{id : item.id}} className='text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400'>
                                    {item.name}
                                </Link>
                            <div className='flex items-center gap-3 text-sm font-semibold'>
                                <span>
                                    ${Number(item.price).toFixed(2)}
                                </span>
                                <span className='text-slate-400'>.</span>
                                <span className='text-slate-600 dark:text-slate-300'>
                                    {item.inventory === 'in-stock' ? "In stock" : item.inventory === 'backorder' ? 'Backorder' : 'Preorder'}
                                </span>
                            </div>
                        </div>
                        </div>
                        <div className='flex flex-col items-end gap-3 sm:items-center sm:justify-between sm:gap-2 sm:text-right'>
                            <div className='flex items-center gap-2'>
                                <Button size={"icon-sm"} variant={"outline"} aria-label={`Decrease ${item.name}`} onClick={()=>{async()=>{
                                    await mutateCartFn({
                                        data : {
                                            action : 'remove',
                                            productId : item.id,
                                            quantity : item.quanity - 1
                                        }
                                    })
                                }}}>
                                    <Minus size={14}/>
                                    
                                </Button>
                                <Input type='number' min={1} max={90} value={item.quanity} onChange={(e)=>{}} className='h-9 w-14 rounded-md border border-slate-200 bg-white text-center text-sm font-semibold shadow-xs dark:border-slate-800 dark:bg-slate-900'/>
                                <Button size={"icon-sm"} variant={"outline"} aria-label={`Increase ${item.name}`} onClick={async ()=>{
                                    await mutateCartFn({
                                        data: {
                                            action : 'add',
                                            productId : item.id,
                                            quantity : item.quanity + 1
                                        }
                                    })
                                }}>
                                    <Plus size={14}/>
                                </Button>
                            </div>
                            <div className='text-sm font-semibold'>
                                ${(Number(item.price) * item.quanity).toFixed(2)}
                            </div>
                            <Button size={"sm"} variant={"ghost"} className='text-slate-500 hover:text-red-500' onClick={()=>{}}>
                                Remove
                            </Button>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className='divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-950/40'>
                <Card>
                    <CardHeader className='text-xl font-bold'>
                        Order Summary
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                        <div className='flex justify-between items-center '>
                            <h3 className='font-semibold'>
                                Subtitle 
                            </h3>
                            <h1 className='font-semibold'>
                            ${Number(subtotal)} 
                            </h1>
                        </div>
                        <div className='flex justify-between items-center '>
                            <h3 className='font-semibold'>
                                Shipping
                            </h3>
                            <h1 className='font-semibold'>
                            ${shipping} 
                            </h1>
                        </div>
                    </CardContent>
                    <div className='divide-y divide-slate-200 rounded-xl border  mx-4 border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-950/40'></div>
                    <CardContent>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-bold  '>
                                Total
                            </h1>
                            <h1>
                                ${total}
                            </h1>
                        </div>
                    </CardContent>
                    <Button className='mx-4'>
                        Checkout 
                    </Button>
                    <p className='text-slate-500 text-center'>
                        Your cart is stored inthe database and synced with Tanstack Query 
                    </p>
                </Card>
            </div>
        </div>

    </div>
}
