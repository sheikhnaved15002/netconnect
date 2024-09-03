import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [draft, setDraft] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedFileUri = localStorage.getItem("fileuri");
    const savedCaption = localStorage.getItem("caption");

    if (savedFileUri) {
      setImagePreview(savedFileUri);
      // The file should be set again after reloading.
      // Consider using a prompt to select a file if it's not already selected
    }
    if (savedCaption) {
      setCaption(savedCaption);
    }
  }, []);

  const imageFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const dataUri = URL.createObjectURL(file);
      setImagePreview(dataUri);
    } else {
      alert("Please select a valid image.");
    }
  };

  const draftHandler = () => {
    if (!file) {
      toast.error("No file selected for draft");
      return;
    }
    localStorage.setItem("caption", caption);
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("fileuri", reader.result);
    };
    setDraft(true);
    setOpen(false);
    toast.success("Saved to draft");
    reader.readAsDataURL(file);
  };

  const removeDraftHandler = () => {
    toast.success("Removed Successfully");
    setFile(null);
    setImagePreview("");
    setCaption("");
    setDraft(false);

    localStorage.removeItem("fileuri");
    localStorage.removeItem("caption");
  };

  const closeModalHandler = () => {
    setOpen(false);
    if (!draft) {
      setFile(null);
      setImagePreview("");
      setCaption("");
    }
  };

  const createPostHandler = async () => {
    if (!file) {
      toast.error("Please select an image to post.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", file);

      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP}/api/v1/post/addpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res?.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 items-center justify-center bg-gray-600 bg-opacity-50 flex z-50">
          <LoaderCircle className="animate-spin text-white" size={48} />
        </div>
      )}
      <Dialog open={open} onOpenChange={closeModalHandler}>
        <DialogContent onInteractOutside={closeModalHandler}>
          <DialogHeader className={"font-bold"}>Create new post</DialogHeader>
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="img" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs">username</h1>
              <span className="text-xs text-gray-600">bio here...</span>
            </div>
          </div>
          <Textarea
            placeholder="Write caption here.."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border-none focus-visible:ring-transparent"
          />
          <input
            name="image"
            accept="image/*"
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={imageFileHandler}
          />
          <Button
            onClick={() => imageRef.current.click()}
            className="w-fit mx-auto"
          >
            Select from computer
          </Button>
          <div className="mx-auto">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="w-64 h-64 object-contain rounded"
              />
            )}
          </div>
          <div className="mx-auto flex gap-5">
            {file && <Button onClick={draftHandler}>Save as draft</Button>}
            {draft && (
              <Button variant={"destructive"} onClick={removeDraftHandler}>
                Remove from draft
              </Button>
            )}
          </div>
          <Button onClick={createPostHandler}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Post"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
