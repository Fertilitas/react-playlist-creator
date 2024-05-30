import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/*",
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      <p>Seret file ke sini atau klik untuk mengunggah</p>
    </div>
  );
};

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
};

export default Dropzone;
