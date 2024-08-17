"use server";

const BASE_URL = process.env.API_URL;

export async function generateNewBeat() {
  const response = await fetch(BASE_URL + "generate-audio", {
    method: "POST",
  });
  if (response.ok) {
    // Convert the response to a blob
    const blob = await response.blob();
    // Create a URL for the blob
    return blob;
  }
  throw Error("Response error");
}
