import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  LayoutGrid,
  List,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "../AuthContext";

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/findAllBlogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const res = await fetch(`/api/findAllBlogs?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setBlogs(blogs.filter((blog) => blog.id !== id));
          showSuccessMessage("Blog deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getUniqueCategories = () => {
    const categories = new Set(blogs.map((blog) => blog.category));
    return ["all", ...Array.from(categories)];
  };

  const handleSort = (sortedBlogs) => {
    let sorted = [...sortedBlogs];

    switch (sortBy) {
      case "date":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;
      case "title":
        sorted.sort((a, b) => {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
        break;
    }

    return sorted;
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedCategory === "all" || blog.category === selectedCategory) &&
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedAndFilteredBlogs = handleSort(filteredBlogs);

  const BlogCard = ({ blog }) => (
    <Card className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
      <div className={`${viewMode === "list" ? "flex flex-1" : ""} p-6`}>
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className={
              viewMode === "list"
                ? "w-48 h-32 object-cover rounded-lg mr-6"
                : "w-full h-48 object-cover rounded-lg mb-4"
            }
          />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {blog.title}
              </h2>
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full mt-2">
                {blog.category}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/blogslist/edit/${blog.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
                onClick={() => handleDelete(blog.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mt-2 line-clamp-2">{blog.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#fffbf7] p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                <p className="text-gray-500 mt-2">Manage your blog content</p>
              </div>
              <Link href="/admin/blogs">
                <Button className="flex items-center gap-2">
                  Create New Post
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="flex-1"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="flex-1"
                >
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <LayoutGrid className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </header>

          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "md:grid-cols-2" : ""
              }`}
            >
              {sortedAndFilteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}

              {sortedAndFilteredBlogs.length === 0 && !isLoading && (
                <div className="text-center py-12 col-span-full">
                  <p className="text-gray-500">
                    No blogs found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
