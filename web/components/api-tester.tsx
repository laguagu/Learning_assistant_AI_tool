'use client'

import { useState } from 'react';

export function ApiTester() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('http://localhost:8000/api/users');

  const testApi = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      console.log('Testing API connection to:', url);
      const startTime = Date.now();
      
      const res = await fetch(url, {
        // Add to bypass potential caching issues
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const data = await res.json();
      setResult(
        `SUCCESS (${responseTime}ms):\n${JSON.stringify(data, null, 2)}`
      );
    } catch (error) {
      console.error('API test error:', error);
      setResult(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white dark:bg-black shadow-sm">
      <h3 className="font-bold text-lg mb-2">API Connection Tester</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Test direct API connectivity to diagnose networking issues
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow p-2 border rounded text-sm" 
          placeholder="API URL to test"
        />
        <button 
          onClick={testApi}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
      </div>
      
      {result && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-1">Response:</div>
          <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded border text-xs overflow-auto max-h-60">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}