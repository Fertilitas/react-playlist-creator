// App.js
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Upload, message } from "antd";
import DraggableUploadListItem from "../components/DraggableUploadListItem";
import { createZip } from "../utils/zipFiles";

const AnotherMergeMusic = () => {
  const [fileList, setFileList] = useState([]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("Files uploaded:", newFileList);
  };

  const handleUpload = ({ file, onSuccess, onError }) => {
    try {
      // Simulasi operasi pengunggahan file
      // Simulate a network request or any other operation before file is added to fileList
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    } catch (error) {
      onError(error);
    }
  };

  const handleMergeAndUpload = async () => {
    if (fileList.length < 2) {
      message.error("Anda harus mengunggah setidaknya 2 file musik.");
      return;
    }

    try {
      const zipBlob = await createZip(fileList);
      const formData = new FormData();
      formData.append("file", new File([zipBlob], "files.zip"));

      console.log("File to be sent to server:", formData.get("file"));

      //   const response = await fetch("YOUR_SERVER_UPLOAD_ENDPOINT", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error("Upload failed");
      //   }

      message.success("Arsip zip berhasil diunggah.");
    } catch (error) {
      console.error("Error uploading zip file:", error);
      message.error("Upload gagal.");
    }
  };

  return (
    <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
      <SortableContext
        items={fileList.map((i) => i.uid)}
        strategy={verticalListSortingStrategy}
      >
        <Upload
          fileList={fileList}
          onChange={onChange}
          customRequest={handleUpload}
          itemRender={(originNode, file) => (
            console.log("file", file),
            (<DraggableUploadListItem originNode={originNode} file={file} />)
          )}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button onClick={handleMergeAndUpload} style={{ marginTop: "16px" }}>
          Merge dan Unggah
        </Button>
      </SortableContext>
    </DndContext>
  );
};

export default AnotherMergeMusic;
