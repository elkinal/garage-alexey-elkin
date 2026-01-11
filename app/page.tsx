"use client";

import { useState } from "react";
import Image from "next/image";
import { extractUuidFromUrl } from "./lib/utils";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // Extract UUID from URL
      const uuid = extractUuidFromUrl(url);

      if (!uuid) {
        throw new Error("Could not find a valid listing ID in the URL. Make sure you're using a Garage listing URL.");
      }

      // Call our API route to generate PDF
      const response = await fetch(`/api/generate-invoice?id=${uuid}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate invoice");
      }

      // Download the PDF
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `garage-quote-${uuid.slice(0, 8)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-orange-50 relative">
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Header */}
      <header className="w-full py-4 px-6 relative z-10">
        <a href="https://www.shopgarage.com" target="_blank" rel="noopener noreferrer">
          <Image 
            src="/garage-logo.svg" 
            alt="Garage" 
            width={120} 
            height={32}
            className="h-8 w-auto"
          />
        </a>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 -mt-16 relative z-10">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-xl mb-4">
                <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Quote Generator
              </h1>
              <p className="text-gray-500">
                Generate a PDF quote from any Garage listing
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Listing URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError("");
                      setSuccess(false);
                    }}
                    placeholder="https://www.shopgarage.com/listing/..."
                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    required
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => {
                        setUrl("");
                        setError("");
                        setSuccess(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Clear input"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quote generated! Check your downloads.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating Quote...</span>
                  </>
                ) : success ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Generate Another</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Generate PDF Quote</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Works with any listing from{" "}
            <a
              href="https://www.shopgarage.com"
              className="text-orange-500 hover:text-orange-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              shopgarage.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
