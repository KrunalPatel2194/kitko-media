// src/components/articles/PressReleaseForm.tsx
'use client'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
// import { ArticleService } from '@/services/api';
import { useRouter } from 'next/navigation';
import { ArticleService } from '@/app/services/api';

export const PressReleaseForm = () => {
 const [pressRelease, setPressRelease] = useState('');
 const router = useRouter();

 const { mutate, isLoading } = useMutation({
   mutationFn: (data: { pressRelease: string }) => ArticleService.generateFromPress(data),
   onSuccess: (data) => {
     router.push(`/articles/preview?id=${data.id}`);
   }
 });

 return (
   <div className="max-w-4xl mx-auto p-6">
     <h1 className="text-2xl font-bold mb-4">Generate Article from Press Release</h1>
     <form onSubmit={(e) => {
       e.preventDefault();
       mutate({ pressRelease });
     }}>
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Press Release Content
           </label>
           <textarea 
             value={pressRelease}
             onChange={(e) => setPressRelease(e.target.value)}
             rows={10}
             className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
             placeholder="Paste your press release here..."
             required
           />
         </div>
         <button 
           type="submit"
           disabled={isLoading}
           className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
         >
           {isLoading ? 'Generating Article...' : 'Generate Article'}
         </button>
       </div>
     </form>
   </div>
 );
};