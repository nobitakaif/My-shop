import { Card } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='space-y-12'>
      <Card>
        <p>Your favourite e-commerce store</p>
        <h1>MyShop - Your one-stop shop for all you needs</h1>
        <Link to='/produtcs'>
          Browse Products
          <ArrowRight size={16} />
        </Link>
      </Card>
    </div>
  )
}
