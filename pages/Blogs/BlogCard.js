import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <Link href={`/Blogs/${blog.id}`} className="block max-w-xs rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {blog.imageUrl && (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm">{blog.description}</p>
      </div>
    </Link>
  );
}
