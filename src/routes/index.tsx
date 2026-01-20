import { Card, CardDescription, CardTitle} from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='space-y-12 bg-linear-to-b w-full flex items-center justify-center p-6'>
      <section className='w-[70%]'>
      <Card className='p-8  shadow-lg bg-white/80'>
        <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Your favourite e-commerce store</p>
        <CardTitle className="text-4xl font-bold leading-tight text-slate-900 dark:text-white max-w-5xl">
        <h1>MyShop - Instant start your shop anywhere, anytime.  <span className='text-blue-500'>Just connect with Us</span></h1>
        </CardTitle>
        <CardDescription >
        <Link to='/produtcs' className='inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl justify-center hover:bg-blue-400'>
          Browse Products
          <ArrowRight size={16} className="" />

        </Link>
        </CardDescription>
      </Card>
      </section>
    </div>
  )
}
