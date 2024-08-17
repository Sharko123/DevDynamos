"use server";
import api from "./api.ts";

export async function generateNewBeat() {
    const beat = await api.post("/generate-audio");
    // Convert the response to a blob
    const blob = await response.blob();
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    return url;
}