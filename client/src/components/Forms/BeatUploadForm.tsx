"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import CustomAudioPlayer from "../Audio/AudioPlayer";
import CustomFileUpload from "../ui/Fileupload";
import TextInput from "../ui/Input";

// This form has 3 inputs the first one if for the file upload of the beat file
// It only accepts the audio filetypes
// Then there is an input for the title
// And there is an tag based input which is like you enter comma separated values
// and it adds them to a list which can be then submitted to the backend server

const UploadForm: React.FC = () => {
  const [beatFile, setBeatFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  // Events for inputs
  const handleFileChange = (file: File | null) => {
    // const file = event.target.files?.[0] || null;
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
  // End events

  const handleAddGenre = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && genreInput.trim() !== "") {
      setGenres([...genres, genreInput.trim()]);
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (index: number) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleFormSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // This is temporary and will be replaced by the api
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Upload Your Beat</h1>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Beat File</label>
        {!beatFile && (
          <CustomFileUpload
            onFileChange={handleFileChange}
            fileTypes="audio/*"
          />
        )}
        {beatFile && (
          <>
            <div className="flex justify-between w-full">
              <span>{beatFile.name}</span>
              <button
                type="button"
                onClick={() => setBeatFile(null)}
                className="ml-2 text-red-400 text-lg"
                disabled={loading}
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <CustomAudioPlayer src={URL.createObjectURL(beatFile)} />
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Title</label>
        <TextInput
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-600 rounded-md w-full p-2 bg-gray-800 text-white"
          placeholder="Enter beat title"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Genres</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <TextInput
            value={genreInput}
            onChange={handleGenreChange}
            onKeyDown={handleAddGenre}
            className="border border-gray-600 rounded-md p-2 bg-gray-800 text-white"
            placeholder="Press Enter to add genre"
            disabled={loading}
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
                disabled={loading}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button onClick={handleFormSubmit} loading={loading}>
        Upload Beat
      </Button>
    </div>
  );
};

export default UploadForm;
