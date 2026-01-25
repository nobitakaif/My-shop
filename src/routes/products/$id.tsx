
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeftIcon, ShoppingBag, SparkleIcon } from 'lucide-react'
import { getProductById, getRecommendedProducts } from '@/data/products'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RecommendedProducts } from '@/components/RecommendedProducts'
import { ProductSelect } from '@/db/schema'
import { Suspense } from 'react'

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader : async ({params})=>{
    const recommendedProducts = getRecommendedProducts()
    const product =  await getProductById(params.id)
    if(!product){
      throw notFound()
    }
    return {product, recommendedProducts : recommendedProducts}
  },
  head : async({loaderData : data})=>{
    const { product } = data as {
      product : ProductSelect,
      recommendedProducts : Promise<ProductSelect[]>
    }
    if(!product){
      return {}
    }
    return {
      meta :[
        { name : 'description', content : product?.description},
        { name : 'image', content : product?.image},
        { name : 'title', content : product?.name},
        { 
          name : 'canonical',
          content : process.env.NODE_ENV === 'production' ? `https://stackshop-prod.appwrite.network/products/${product.id}` : `http://localhost:3000/products/${product.id}` || `localhost:3000/products/${product.id}`,
        },{
          title : product.name
        },{
          description : product.description
        }
      ]
    }

  },
  
})

function RouteComponent() {
  // const { id } = Route.useParams()
  const {product, recommendedProducts} = Route.useLoaderData()
  return  <div>
    <Card className='max-w-4xl mx-auto p-4'>
       <Link to='/products' className='inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700'>
          <ArrowLeftIcon size={16}/>
          Back to products
        </Link>
      <Card>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-4 p-2'>
          <div className='aspect-4/3 overflow-hidden rounded-xl border bg-linear-to-br  from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:to-slate-900'>
            <img src={product?.image} alt={product?.name} className='h-full w-full object-contain p-6' loading='lazy' />
          </div>
          </div>
          <div className='space-y-3'>
            <CardHeader className='flex items-center gap-2 sm:flex-row flex-col '>
              
              <CardTitle className='flex items-start gap-2'>
                <h1 className='text-2xl font-semibold'>
                  {product?.name}
                </h1>
                <div className='flex items-center gap-2'>
                  {product?.badge && (
                    <span className='rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white'>
                      {product.badge}
                    </span>
                  )}
                </div>
              </CardTitle>
                
            </CardHeader>
            <CardContent className='flex items-start flex-col'>
            <CardDescription className='text-lg'>
              {product?.description}
            </CardDescription>
              <p className='text-3xl font-bold'>$ {product?.price}</p>
              <span>Rated {product?.rating} ({product?.reviews} reviews) </span>
              <div className='flex items-center gap-3 rounded-xl border bg-slate-50 p-4 text-sm font-medium dark:border-slate-800 dark:bg-slate-800'>
                <SparkleIcon size={18} className='text-amber-500'/>
                {product?.inventory == 'in-stock' ? 'Ships in 1-2 busines days.' : product?.inventory == 'backorder' ? 'Backordered - shipping in ~2 weeks.' : 'Preorder -shipping in the next drop'}
              </div>
            </CardContent>
            <CardFooter className=''>
              <div className='flex flex-wrap gap-3'>
                <Button className='bg-slate-900 px-4 text-white hover:shadow-md dark:bg-white dark:text-slate-900 hover:bg-blue-500'>
                  <ShoppingBag size={16} className='mr-2'/>Add to cart
                </Button>
                <Button variant={'outline'} className='border-slate-200 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800 dark:text-slate-100'>
                  Save for later
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
      <Suspense fallback={<div>Loading recommended Product</div>}>
        <RecommendedProducts recommendedProducts={recommendedProducts}/>
      </Suspense>
    </Card>
    
  </div>
}
