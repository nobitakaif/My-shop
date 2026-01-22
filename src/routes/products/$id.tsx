import { sampleProducts } from '@/db/seed'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader : async ({params})=>{
    return sampleProducts
  }
})

function RouteComponent() {
    const {id}= Route.useParams()
  return <div>Hello {`${id}`}</div>
}
