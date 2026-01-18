import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Home,
  Menu,
  Network,
  ShoppingBag,
  SquareFunction,
  StickyNote,
  X,
} from 'lucide-react'

export default function Header() {
  return (
    <>
      <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80'>
      <div className='max-auto max-w-6xl px-4 py-3 items-center justify-between'>
      
        <div className='flex items-center gap-3 px-4'>
          <Link to='/' className='flex items-center gap-2
          '>
        
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-800'>
            <ShoppingBag size={20}/>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-slate-900 dark:text-white'> 
              My-Shop
            </span>
          </div>
          </Link>
          <nav className='items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex'>
            <Link to='/products' className='rounded-lg px-3 py-1 transition hover:bg-slate-100 dakr:hover:bg-slate-800'>
            Products
            </Link>
          </nav>
        </div>
      </div>
      </header>
    </>
  )
}
