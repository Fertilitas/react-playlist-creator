import JSZip from "jszip";

export const createZip = async (files) => {
  try {
    const zip = new JSZip();
    console.log("files", files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.file) {
        const fileData = await readFile(file.file);
        zip.file(file.file.name, fileData);
      } else {
        console.error(`File at index ${i} does not have 'file' property`);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return zipBlob;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
