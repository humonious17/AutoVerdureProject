/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, ImagePlus, FileText, Eye, X, CheckCircle2 } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const initialBlogState = {
  title: '',
  description: '',
  content: '',
  imageUrl: '',
  selectedBlogId: '',
  category: ''
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(initialBlogState);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Learning', 'Guides', 'Article'];

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/addblogs');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleContentChange = (content) => {
    setNewBlog({ ...newBlog, content });
  };

  const handleCategoryChange = (value) => {
    setNewBlog({ ...newBlog, category: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
          setNewBlog({ ...newBlog, imageUrl: data.secure_url });
        }
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const resetForm = () => {
    setNewBlog(initialBlogState);
    // Reset the ReactQuill editor by setting content to empty
    handleContentChange('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/addblogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (res.ok) {
        const blog = await res.json();
        setBlogs([...blogs, blog]);
        setShowSuccess(true);
        resetForm();
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to submit the blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const PreviewContent = () => (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {newBlog.imageUrl && (
        <img 
          src={newBlog.imageUrl} 
          alt="Blog preview" 
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <div className="space-y-4">
        <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
          {newBlog.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-900">{newBlog.title}</h1>
        <p className="text-xl text-gray-600">{newBlog.description}</p>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newBlog.content }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-500 mt-2">Share your thoughts with the world</p>
        </header>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Blog post published successfully! Your content is now live.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newBlog.title}
                    onChange={handleInputChange}
                    placeholder="Enter your blog title"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={newBlog.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of your blog post"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newBlog.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="w-5 h-5" />
                  Featured Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImagePlus className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {newBlog.imageUrl && (
                  <div className="mt-4">
                    <img
                      src={newBlog.imageUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg mx-auto"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[400px]">
                  <ReactQuill
                    theme="snow"
                    value={newBlog.content}
                    onChange={handleContentChange}
                    placeholder="Start writing your amazing blog post..."
                    className="h-[350px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Preview Blog Post</DialogTitle>
                  </DialogHeader>
                  <PreviewContent />
                </DialogContent>
              </Dialog>

              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
                {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}