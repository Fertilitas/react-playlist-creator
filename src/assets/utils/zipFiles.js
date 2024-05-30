import JSZip from "jszip";

export const createZip = async (files) => {
  const zip = new JSZip();
  console.log("files", files);
  // Tambahkan setiap file ke dalam arsip zip
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Kita harus mengambil konten file sebagai Blob atau ArrayBuffer
    const fileData = await file.originFileObj.arrayBuffer();
    zip.file(file.name, fileData);
  }

  // Buat arsip zip sebagai Blob
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
};
