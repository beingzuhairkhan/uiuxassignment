import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "../../../store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { useRef } from "react";

interface ModalProps {
  setOpen: (open: boolean) => void;
}

const Modal = ({ setOpen }: ModalProps) => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const newTaskType = useBoardStore((state) => state.newTaskType);
  const newTaskInput = useBoardStore((state) => state.newTaskInput);
  const setNewTaskInput = useBoardStore((state) => state.setNewTaskInput);

  const image = useBoardStore((state) => state.image);
  const setImage = useBoardStore((state) => state.setImage);
  const addTask = useBoardStore((state)=> state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    addTask(newTaskInput ,newTaskType , image);
    setImage(null)
    setOpen(false); 
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setOpen(false)} // Click outside to close
    >
      <div
        className="w-4/5 max-w-md bg-white rounded-lg p-6 relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button onClick={() => setOpen(false)}>
            <XCircleIcon className="h-8 w-8 text-gray-500 hover:text-red-600 transition" />
          </button>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {/* Task Title Input */}
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Task Type Selection */}
          <TaskTypeRadioGroup />

          {/* Image Upload */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => imagePickerRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-gray-200 transition focus:ring-2 focus:ring-blue-500"
            >
              <PhotoIcon className="h-6 w-6 text-gray-500" />
              Upload Image
            </button>

            {/* Show selected image preview */}
            {image && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Task Preview"
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200"
                >
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              ref={imagePickerRef}
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.type.startsWith("image/")) {
                  setImage(file);
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!newTaskInput.trim()}
            className="w-full bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
