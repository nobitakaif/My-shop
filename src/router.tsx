import { Link, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      queryClient : new QueryClient()
    },

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent:()=>{
      return (
        <div>
          <p>Sorry! This page is still in building phase</p>
          <Link to='/'>Go to home</Link>
        </div>
      )
    }
  })

  return router
}
