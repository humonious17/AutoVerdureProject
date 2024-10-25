import { useState } from 'react';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({ rating, comment, image });
  };

  const handleRating = (index) => {
    // If the user clicks on the same star again, decrease the rating
    if (rating === index + 1) {
      setRating(0); // Reset the rating
    } else {
      setRating(index + 1); // Set the new rating
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 max-w-xl height-400 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">Add a Review</h2>

      {/* Rating (Label and Stars on the Same Line) */}
      <div className="mb-6 flex items-center space-x-6">
        <label className="text-base font-semibold text-gray-700">Select Rating</label>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleRating(i)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                rating > i ? 'bg-primaryMain text-white' : 'bg-gray-200 text-gray-400'
              } hover:scale-110`}
            >
              <span className="text-xl">★</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mb-6">
        <label className="block mb-2 text-base font-semibold text-gray-700">Add Comments</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm"
          rows="4"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      {/* Add Photos */}
      <div className="mb-6">
        <label className="block mb-2 text-base font-semibold text-gray-700">Add Photos</label>
        <div className="relative w-full h-44 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <>
              <button
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="absolute flex items-center justify-center w-10 h-10 border-2 border-purple-500 text-purple-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-purple-500 hover:text-white transition-colors duration-300"
              >
                +
              </button>
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="py-3 px-12 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-lg"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}
