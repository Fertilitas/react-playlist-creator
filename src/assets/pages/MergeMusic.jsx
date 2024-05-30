import { useState } from "react";
import Dropzone from "../components/Dropzone";
import { createZip } from "../utils/zipFiles";

const MergeMusic = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    // file yang diupload
    console.log("Files uploaded:", acceptedFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Anda harus mengunggah setidaknya 2 file musik.");
      return;
    }

    setError("");

    try {
      const zipBlob = await createZip(files);
      const formData = new FormData();
      formData.append("file", new File([zipBlob], "Merge-music.zip"));
      console.log("formData", formData);

      //   file yang akan dikirim
      console.log("File to be sent to server:", formData.get("file"));

      //   const response = await fetch("YOUR_SERVER_UPLOAD_ENDPOINT", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error("Upload failed");
      //   }

      console.log("Arsip zip berhasil diunggah.");
    } catch (error) {
      console.error("Error uploading zip file:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Unggah File Musik</h2>
      <Dropzone onDrop={handleDrop} />
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      <button onClick={handleMerge}>Merge dan Unggah</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MergeMusic;
