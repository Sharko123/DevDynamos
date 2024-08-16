"use client";
import React, { useState } from "react";

const UploadForm: React.FC = () => {
  const [beatFile, setBeatFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setBeatFile(file);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // We check for the last value if that is a comma if it is then we append the
    // Genre to the list of genres and make it display on the ui
    const value = event.target.value;
    if (value.endsWith(",")) {
      if (value.replaceAll(",", "").trim() != "") {
        setGenres([...genres, genreInput.replaceAll(",", "").trim()]);
        setGenreInput("");

        return;
      }
      setGenreInput("");
    }
    setGenreInput(event.target.value);
  };

  const handleAddGenre = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && genreInput.trim() !== "") {
      setGenres([...genres, genreInput.trim()]);
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (index: number) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Upload Your Beat</h1>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Beat File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="border border-gray-600 rounded-md w-full p-2 bg-gray-800 text-white"
        />
        {beatFile && (
          <div className="mt-4">
            <audio controls className="w-full bg-gray-800 rounded-md">
              <source
                src={URL.createObjectURL(beatFile)}
                type={beatFile.type}
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-600 rounded-md w-full p-2 bg-gray-800 text-white"
          placeholder="Enter beat title"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Genres</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <input
            type="text"
            value={genreInput}
            onChange={handleGenreChange}
            onKeyDown={handleAddGenre}
            className="border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
            placeholder="Press Enter to add genre"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full flex items-center"
            >
              {genre}
              <button
                type="button"
                onClick={() => handleRemoveGenre(index)}
                className="ml-2 text-red-400"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
        Upload Beat
      </button>
    </div>
  );
};

export default UploadForm;
