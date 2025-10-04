import React, { useState } from "react";
import { DeleteIcon, Plus, Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { addTask, deleteTask, updateTask } from "../../redux/tasks/tasksSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { ITask } from "../../types/global";
import { v4 as uuidv4 } from "uuid";

export default function Tasks() {
  const tasks = useAppSelector((state) => state.task.task);
  const dispatch = useAppDispatch();

  // Local state for dialogs
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
  });

  // 🧩 Handle Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: ITask = {
      id: uuidv4(), // Generate unique ID
      title: formData.title,
      description: formData.description,
      isCompleted: false,
      dueDate: formData.dueDate,
      priority: formData.priority,
    };

    dispatch(addTask(newTask));
    setFormData({ title: "", description: "", dueDate: "", priority: "" }); // Reset
    setOpenAdd(false);
  };

  const handleEdit = (task: ITask) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
    setOpenEdit(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      dispatch(updateTask({ ...selectedTask, ...formData }));
      setOpenEdit(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <Button onClick={() => setOpenAdd(true)} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">ID</TableHead>
            <TableHead className="w-[150px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium">{t.id}</TableCell>
              <TableCell className="font-medium">{t.title}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>{t.dueDate}</TableCell>
              <TableCell className="text-right">{t.priority}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button
                  onClick={() => dispatch(deleteTask(t))}
                  variant="outline"
                  size="icon"
                >
                  <DeleteIcon />
                </Button>

                <Button
                  onClick={() => handleEdit(t)}
                  variant="outline"
                  size="icon"
                >
                  <Upload />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTask && (
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update your task details and click “Save changes.”
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="border rounded p-2"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="">Select priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Fill in task details and click “Add Task” to save.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="border rounded p-2"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="">Select priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
