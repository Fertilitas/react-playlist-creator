import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowBigRightDash, LoaderCircle } from "lucide-react";
import FileListItem from "@/components/FileListItem";
import NoFileNote from "@/components/NoFileNote";
import FileList from "@/components/FileList";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createZip } from "@/utils/zipFiles";

const PlaylistCreator = () => {
  const [musicFiles, setMusicFiles] = useState([]);
  const [zipMusicFiles, setZipMusicFiles] = useState([]);
  const [mergeLoading, setMergeLoading] = useState(false);

  const handleChange = (e) => {
    const choosenFiles = Array.from(e.target.files).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
    }));
    setMusicFiles((prev) => [...prev, ...choosenFiles]);
    e.target.value = null;
  };

  const handleDeleteMusicFile = (index) => {
    setMusicFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    over && active.id !== over.id
      ? setMusicFiles((prev) => {
          const oldIndex = prev.findIndex((file) => file.id === active.id);
          const newIndex = prev.findIndex((file) => file.id === over.id);
          return arrayMove(prev, oldIndex, newIndex);
        })
      : false;
  };

  const handleMergeAndUpload = async () => {
    setMergeLoading(true);
    // if (fileList.length < 2) {
    //   message.error("Anda harus mengunggah setidaknya 2 file musik.");
    //   return;
    // }

    try {
      const zipBlob = await createZip(musicFiles);
      console.log(typeof zipBlob);
      const formData = new FormData();
      formData.append("file", zipBlob, "playlist.zip");
      setZipMusicFiles((prev) => [...prev, zipBlob]);
    } catch (error) {
      console.error("Error creating zip or uploading", error);
    } finally {
      setMergeLoading(false);
    }
  };

  const handleDownload = (index) => {
    const zipBlob = zipMusicFiles[index];
    if (zipBlob instanceof Blob) {
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `playlist-${index}.zip`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("Expected a Blob object, but received:", zipBlob);
    }
  };

  console.log({ musicFiles });
  console.log({ zipMusicFiles });

  return (
    <div className="container flex flex-col justify-start items-center h-screen">
      <h1 className="font-el-messiri text-5xl text-primary font-bold tracking-widest mt-3 mb-3">
        Playlist Creator
      </h1>
      <p className="text-md text-gray-500 font-light capitalize tracking-wide mb-3">
        Make your playlist in{" "}
        <span className="text-primary font-bold uppercase">one click!</span>
      </p>
      <Input
        id="files"
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      <Label
        htmlFor="files"
        className="w-1/2 py-2 px-4 mb-2 bg-primary border border-primary rounded-lg cursor-pointer text-primary-foreground text-sm text-center font-medium transition-colors duration-400"
      >
        Click to upload
      </Label>
      <div className="w-full h-2/3 py-5 flex flex-row">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={musicFiles}>
            <FileList>
              {musicFiles.length > 0 ? (
                musicFiles.map((file, index) => (
                  <FileListItem
                    key={file.id}
                    file={file}
                    onDelete={() => handleDeleteMusicFile(index)}
                  />
                ))
              ) : (
                <NoFileNote text="No files uploaded" />
              )}
            </FileList>
          </SortableContext>
        </DndContext>

        <div className="w-2/12 h-full flex justify-center items-center">
          <Button
            className="flex flex-row justify-center items-center bg-[#afbe7b]/80 text-white text-2xl font-semibold uppercase hover:bg-[#afbe7b]"
            disabled={!musicFiles.length || mergeLoading === true}
            onClick={handleMergeAndUpload}
          >
            {mergeLoading === true ? (
              <LoaderCircle size={28} className="mr-2 animate-spin" />
            ) : null}
            Create <ArrowBigRightDash size={28} />
          </Button>
        </div>

        <FileList>
          {zipMusicFiles.length > 0 ? (
            zipMusicFiles.map((file, index) => (
              <FileListItem
                key={index}
                file={file}
                onDelete={() => handleDownload(index)}
              />
            ))
          ) : (
            <NoFileNote text="No files are created" />
          )}
        </FileList>
      </div>
    </div>
  );
};

export default PlaylistCreator;
