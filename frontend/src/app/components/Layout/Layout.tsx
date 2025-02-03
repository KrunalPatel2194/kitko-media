'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, PowerIcon, X } from 'lucide-react';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-[#AE8766] text-white p-2 rounded-md shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 
          w-[280px] sm:w-72 lg:w-64 
          bg-[#494949] 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#5a5a5a] mt-16 lg:mt-0">
            <div className="font-bold text-lg sm:text-xl lg:text-lg text-white">KITKO MEDIA</div>
            <div className="text-gray-300 text-sm lg:text-xs">ADMIN PANEL</div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-sm text-white rounded-md hover:bg-[#AE8766] transition-colors"
            >
              Articles
            </Link>
            <Link 
              href="/articles/create" 
              className="flex items-center px-4 py-3 text-sm text-white rounded-md hover:bg-[#AE8766] transition-colors"
            >
              Create Article
            </Link>
            <Link 
              href="/articles/generate" 
              className="flex items-center px-4 py-3 text-sm text-white rounded-md hover:bg-[#AE8766] transition-colors"
            >
              Generate Article
            </Link>
          </nav>

          <div className="mt-auto">
            <div className="p-4 bg-[#404040] border-t border-[#5a5a5a]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#AE8766] shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center absolute bottom-0 right-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">Krunal Patel</div>
                  <div className="text-xs text-gray-300">Admin</div>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#AE8766] flex items-center justify-center shrink-0">
                  <PowerIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
          {children}
        </div>
      </main>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};