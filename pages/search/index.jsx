/* eslint-disable react/no-unescaped-entities */
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, ArrowUp, AlertCircle } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while fetching search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="mb-8">
              <Search className="w-16 h-16 mx-auto text-primaryMain animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primaryMain to-purple-600 bg-clip-text text-transparent mb-8">
              Search Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Enter a product name in the search bar above to explore our
              curated collection of premium items.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primaryMain to-blue-400 bg-clip-text text-transparent mb-3">
            {loading ? "Searching..." : `Results for "${query}"`}
          </h1>
          {!loading && !error && (
            <p className="text-lg text-gray-600">
              Found {results.length} product{results.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-primaryMain rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Package className="w-6 h-6 text-primaryMain" />
              </div>
            </div>
          </div>
        ) : error ? (
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center text-red-600">
                <AlertCircle className="w-6 h-6 mr-2" />
                <p className="text-center font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        ) : results.length === 0 ? (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="text-center">
                <Search className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  No products found
                </h2>
                <p className="text-gray-600 mb-8">
                  We couldn't find any products matching "{query}"
                </p>
                <div className="max-w-md mx-auto">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Suggestions:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Check spelling",
                      "Try general keywords",
                      "Browse categories",
                    ].map((suggestion, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center space-x-2 text-gray-600"
                      >
                        <span className="w-2 h-2 rounded-full bg-primaryMain"></span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product, index) => (
              <Link
                key={product.productId || index}
                href={product.url}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-primaryMain">
                        {product.productType}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primaryMain transition-colors">
                      {product.productName}
                    </h2>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-600 group-hover:text-primaryMain transition-colors">
                        View details
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-primaryMain transform group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {results.length > 12 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center px-8 py-4 rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primaryMain to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5 mr-2" />
              Back to top
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
