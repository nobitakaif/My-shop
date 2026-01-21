import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'

export default function Header() {
  return (
    <>
    <div className='w-full flex justify-center items-center '>
      <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 flex justify-center gap-4 w-full h-full items-center '>
      <div className='max-auto w-full  px-4 py-3 items-center  justify-center sm:gap-110 gap-4 flex'>
      
        <div className='flex items-center gap-3 px-4 '>
          <Link to='/' className='flex items-center gap-2
          '>
        
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-800 hover:bg-blue-500  '>
            <ShoppingBag size={20} />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-900 dark:text-white'> 
              My-Shop
            </span>
          </div>
          </Link>
          <nav className='hidden items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex'>
            <Link to='/home' className='rounded-lg px-3 py-1 transition hover:bg-slate-100 dakr:hover:bg-slate-800'>
              Home
            </Link>
            <Link to='/home' className='rounded-lg px-3 py-1 transition hover:bg-slate-100 dakr:hover:bg-slate-800'>
              Products
            </Link>
            <Link to='/home' className='rounded-lg px-3 py-1 transition hover:bg-slate-100 dakr:hover:bg-slate-800'>
              Craete-Product
            </Link>
           

          </nav>
           
        </div>
        <div className='flex items-center gap-2'>
              <Link to='/cart' className='inline-flex items-center gap-2 rounded-full px-2 py-2 text-xs font-semibold  border border-slate-200 hover:bg-blue-400 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md bg-black text-white'>
                <span>Cart</span>
                <span className='flex items-center  rounded-2xl  px-1 py-0.5 '>0</span>
                <span className='hidden text-[11px] font-medium text-white sm:inline'>$10</span>
              </Link>
        </div>
      </div>
      </header>
    </div>
    </>
  )
}
