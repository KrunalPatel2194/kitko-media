'use client';
// src/components/Layout/Layout.tsx
import Link from 'next/link';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                News Management
              </Link>
            </div>
            <div className="flex items-center">
              <Link 
                href="/articles/create" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Article
              </Link>
              <Link 
  href="/articles/generate" 
  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 ml-4"
>
  Generate from Press Release
</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};