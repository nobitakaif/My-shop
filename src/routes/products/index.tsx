import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware, createServerFn, json } from '@tanstack/react-start'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/productCard'
import { getAllProducts } from '@/data/products'


const loggerMiddleware = createMiddleware().server(async ({ next, request }) => {
  console.log(`---loggerMiddlware---`, request.url, "from ", request.headers.get('origin'))
  return next()
})

const fetchProducts = createServerFn({ method: "GET" }).handler(async () => {
  return await getAllProducts()
})

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: async () => {
    return fetchProducts()
  },
  // ssr : 'data-only', //using this data render on the client side(initially page is empty ) if you're not using this then data comes from the caches
  server: {
    middleware: [loggerMiddleware],
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        return json({ message: "Hello world", body })
      }
    }
  }
})

function RouteComponent() {
  const product = Route.useLoaderData()
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    initialData: product
  })
  return <div className='space-y-8 bg-linear-to-b  flex flex-col items-center justify-center p-6 '>
    <section className='sm:w-[70%] w-[90%] flex flex-col gap-2'>
      <Card className='p-6 shadow-md bg-white/80 '>
        <div className='flex items-center justify-between'>
          <div>
            <CardHeader className='px-0'>
              <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>STARTSHOPP CATALOG</p>
              <CardTitle className='text-2xl font-semibold text-slate-900'>Products built for makers</CardTitle>
            </CardHeader>
            <CardDescription className='text-sm text-slate-600'>
              Browse a minimal, production-flavoured catalog with Tanstack Start server function and typed routes.
            </CardDescription>
          </div>
        </div>
      </Card>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data?.map((product, index) => (
          <ProductCard product={product} key={`product-${index}`} />
        ))}
      </div>


    </section>
  </div>
}
