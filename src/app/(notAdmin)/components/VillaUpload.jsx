"use client";
import { useState, useEffect } from "react";

const VillaAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    location: "",
    pricePerNight: "",
    description: "",
    area: 100,
    bathroom: 1,
    people: 2,
    images: [],
    highlights: [],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const [numHighlights, setNumHighlights] = useState(0);
  const [highlights, setHighlights] = useState([]);

  const handleNumHighlightsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumHighlights(value);
    const newHighlights = Array(value).fill("");
    setHighlights(newHighlights);
    setFields((prevFields) => ({
      ...prevFields,
      highlights: newHighlights,
    }));
  };

  const handleHighlightChange = (e, index) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = e.target.value;
    setHighlights(updatedHighlights);
    setFields((prevFields) => ({
      ...prevFields,
      highlights: updatedHighlights,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const updatedImages = [...fields.images];

    for (const file of files) {
      updatedImages.push(URL.createObjectURL(file));
    }

    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };

  

  return (
    mounted && (
      <form
      action={ `${process.env.NEXT_PUBLIC_API_URL}/api/villa`}
        method="POST"
        encType="multipart/form-data"
        className="p-2"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Villa Name
          </label>
          <input
            type="text"
            name="name"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g., Beautiful Villa"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            name="location"
            className="border rounded w-full py-2 px-3"
            placeholder="e.g., Miami Beach"
            required
            value={fields.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Price Per Night
          </label>
          <input
            type="number"
            name="pricePerNight"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.pricePerNight}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Describe the villa"
            required
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Area (in sq ft)
          </label>
          <input
            type="number"
            name="area"
            className="border rounded w-full py-2 px-3"
            value={fields.area}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Number of Bathrooms
          </label>
          <input
            type="number"
            name="bathroom"
            className="border rounded w-full py-2 px-3"
            value={fields.bathroom}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Number of People
          </label>
          <input
            type="number"
            name="people"
            className="border rounded w-full py-2 px-3"
            value={fields.people}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Images</label>
          <input
            type="file"
            name="images"
            className="border rounded w-full py-2 px-3"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Number of Highlights
          </label>
          <input
            type="number"
            name="numHighlights"
            className="border rounded w-full py-2 px-3"
            value={numHighlights}
            onChange={handleNumHighlightsChange}
          />
        </div>

        {Array.from({ length: numHighlights }, (_, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Highlight {index + 1}
            </label>
            <input
              type="text"
              name={`highlight_${index}`}
              className="border rounded w-full py-2 px-3"
              value={highlights[index]}
              onChange={(e) => handleHighlightChange(e, index)}
            />
          </div>
        ))}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full max-w-44 w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Villa
        </button>
      </form>
    )
  );
};

export default VillaAddForm;
