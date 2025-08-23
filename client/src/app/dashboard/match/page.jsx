"use client";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../lib/firebase";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!image) return;

    // create ref
    const imageRef = ref(storage, `images/${image.name}`);

    // upload
    await uploadBytes(imageRef, image);

    // get url
    const downloadURL = await getDownloadURL(imageRef);
    setUrl(downloadURL);
    console.log("Image URL:", downloadURL);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>Image uploaded:</p>
          <img src={url} alt="uploaded" className="w-40" />
        </div>
      )}
    </div>
  );
}
