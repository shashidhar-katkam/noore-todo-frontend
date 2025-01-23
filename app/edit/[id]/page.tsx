'use client'
import React from "react"
import { useParams } from 'next/navigation';
import AddOrEditTask from "@/app/components/addOrEdit";


export default function EditTask() {
    const { id } = useParams();
    return (<AddOrEditTask id={id?.toString()} />);
}
