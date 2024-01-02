'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FIXEDCSS } from "@/utils"
const RawHTML = () => {
    const [html, setHtml] = useState('');
    const [url, setUrl] = useState('');
    const searchParams = useSearchParams()
    const router = useRouter()

    const search = searchParams.get('query')
    useEffect(() => {
        const fetchHtml = async () => {
            const response = await fetch(`http://localhost:3001/api/fetch?url=${search}`);
            const htmlString = await response.text();
            const parser = new DOMParser();

            // Parse the HTML content
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Access the <head> element and update its content
            const preElement = doc.querySelector('pre').textContent;

            // Convert the updated document back to HTML
            // const updatedHtmlCont = doc.documentElement.;
            setHtml(preElement);
        };
        fetchHtml();


    }, []);


    const handleExtract = () => {
        // Add logic to handle URL extraction here
        // send a query to /search
        router.push(`/search?query=${url}`)
    };

    return (
        <div className='w-full'>
            {/* heading */}
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
            <div dangerouslySetInnerHTML={{ __html: html }} />

        </div>
    );
};

export default RawHTML;
