import { RadioGroup } from "@headlessui/react";
import { useBoardStore } from "../../../store/BoardStore";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently in progress",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
  {
    id: "Backlog",
    name: "Backlog",
    description: "A task that is pending completion",
    color: "bg-blue-500",
  },
];

const TaskTypeRadioGroup = () => {
  const setNewTaskType = useBoardStore((state) => state.setNewTaskType);
  const newTaskType = useBoardStore((state) => state.newTaskType);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={setNewTaskType}>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ checked }) =>
                  `flex cursor-pointer items-center rounded-lg px-4 py-2 border ${
                    checked ? "border-black ring-2 ring-black" : "border-gray-300"
                  } transition duration-200`
                }
              >
                {() => (
                  <>
                    <div
                      className={`w-6 h-6 rounded-full ${type.color} flex-shrink-0`}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium">{type.name}</p>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaskTypeRadioGroup;
