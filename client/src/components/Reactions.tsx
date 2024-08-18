"use client";
import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ReactionButtonsProps {
  beatId: string;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ beatId }) => {
  const { userId } = useAuth();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);

    // Here you would send the reaction to your backend
    await fetch("http://localhost:5000/react/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        beatId,
        liked: !liked,
        disliked: false,
      }),
    });
  };

  const handleDislike = async () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);

    // Here you would send the reaction to your backend
    await fetch("http://localhost:5000/react/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        beatId,
        liked: false,
        disliked: !disliked,
      }),
    });
  };

  return (
    <>
      <button className="text-blue rounded-full" onClick={handleLike}>
        <ThumbsUp size={32} fill={liked ? "white" : "transparent"} />
      </button>
      <button onClick={handleDislike} className="text-white rounded-full">
        <ThumbsDown size={32} fill={disliked ? "white" : "transparent"} />
      </button>
    </>
  );
};

export default ReactionButtons;
