import { sampleProducts } from 'script/seed'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowRight, ArrowRightIcon, Car, CardSimIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/productCard'

const fetchProductsFn = createServerFn({method : "GET"}).handler(async ()=>{
  const { getRecommendedProducts } = await import("@/data/products")
  const products = await getRecommendedProducts()
  return products
})

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    // this run on server during SSR and on client during navigation

    return fetchProductsFn()
  }
})


// export const getServerTime = createServerFn().handler(async () => {
//   return
// })

function App() {
  const products  = Route.useLoaderData()
  return (
    <div className='space-y-8 bg-linear-to-b  flex flex-col items-center justify-center p-6 '>
      <section className='sm:w-[70%] w-[90%]'>
        <Card className='p-8  shadow-lg bg-white/80'>
          <p className='text-sm font-semibold uppercase tracking-wide text-blue-600 hidden sm:block'>Your favourite e-commerce store</p>
          <CardTitle className="text-4xl w-full font-bold leading-tight text-slate-900 dark:text-white max-w-5xl">
            <h1><span className='hover:text-blue-500 hover:cursor-no-drop'>MyShop</span> - Instant start your shop <span className='hidden sm:inline'> anywhere, anytime. </span>  <span className='text-blue-500 hidden md:block '>Just connect with Us</span></h1>
          </CardTitle>
          <CardDescription >
            <Link to='/products' className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl justify-center hover:bg-blue-400'>
              Browse Products
              <ArrowRight size={16} className="" />

            </Link>
          </CardDescription>
        </Card>
      </section>
      <section className='sm:w-[70%] w-[90%] flex flex-col gap-2'>
        <Card className='p-6 shadow-md bg-white/80 '>
          <div className='flex items-center justify-between'>
            <div>
              <CardHeader className='px-0'>
                <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Recommended</p>
                <CardTitle className='text-2xl font-semibold text-slate-900'>Starter picks from the catalogs</CardTitle>
              </CardHeader>
              <CardDescription className='text-sm text-slate-600'>
                Curated items to try the cart and details pages quickly.
              </CardDescription>
            </div>
            <div>
              <Link to='/products' className='hidden items-center  rounded-full border border-slate-200 px-4 text-xs font-semibold w-28 gap-4 h-8 felx bg-black text-white  sm:inline-flex transition hover:-translate-y-0.5 hover:shadow-xl'>
                View All <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product, _index) => (
              <ProductCard product={product} />
            ))}
          </div>
        </Card>


      </section>
    </div>
  )
}
