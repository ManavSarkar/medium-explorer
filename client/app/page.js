'use client'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter()

  const handleExtract = () => {
    // Add logic to handle URL extraction here
    console.log('Extracting from URL:', url);
    // send a query to /search
    router.push(`/search?query=${url}`)
  };

  return (
    <div className="flex items-center mx-12 h-screen  flex-col justify-evenly">
      <h1 className="text-3xl font-semibold mb-4">Medium Explorer</h1>
      <input
        type="text"
        placeholder="Enter URL"
        className="w-full border border-gray-300 p-2 mb-4 rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue w-full"
        onClick={handleExtract}
      >
        Extract
      </button>
    </div>
  )
}
