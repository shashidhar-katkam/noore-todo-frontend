"use client";
import { useEffect, useState } from "react";
import TaskList from "@/app/components/taskList";
import NoTasks from "@/app/components/noTasks";
import Link from "next/link";
import plusIcon from '@/public/images/plus.svg';
import { deleteTask, getTasks, updateTask } from "@/app/services/tasksService";
import { Task } from "@/app/models/task";
import TaskCounts from "../components/taskCounts";
import Image from "next/image";

export default function TasksHome() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks();

                if (response?.status) {
                    setTasks(response?.data || []);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setDeletingId(null)
            }
        };

        fetchTasks();
    }, []);

    const handleStatusChange = async (id: number, completed: boolean) => {
        try {
            const response = await updateTask(id, { completed });

            if (response?.status) {
                setTasks(tasks?.map((task) => {
                    if (task.id === id) {
                        task.completed = completed;
                    }
                    return task;
                }));
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setDeletingId(null)
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const isConfirmed = confirm("Are you sure you want to delete this task?");

            if (isConfirmed) {
                const response = await deleteTask(id);

                if (response?.status) {
                    setTasks(tasks?.filter((task) => task.id !== id));
                }
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const completedTasksCount = tasks.filter(
        (task) => task.completed === true
    ).length;

    return (
        <>
            <div className="-mt-6 bg-taskButton p-3 rounded-md w-full">
                <Link
                    href={"/add"}
                    className="text-white flex justify-center text-center gap-2">
                    Create Task
                    <Image src={plusIcon.src} width={20} height={20} alt="add" />
                </Link>
            </div>

            <div className="pt-12">
                <TaskCounts totalTasks={tasks.length} completedTasks={completedTasksCount} />
                {tasks.length === 0 ? (
                    <NoTasks />
                ) : (
                    <TaskList tasks={tasks} handleStatusChange={handleStatusChange} handleDelete={handleDelete} deletingId={deletingId} />
                )}
            </div>
        </>
    );
}
