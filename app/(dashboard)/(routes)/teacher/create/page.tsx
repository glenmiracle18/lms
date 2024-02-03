"use client"

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import toast from 'react-hot-toast';
import {
    Form,
    FormControl,
    FormLabel,
    FormDescription,
    FormField,
    FormMessage,
    FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


// form schema
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
});


// main functional component
const Create = () => {

    

    return (
        <div>Create a course</div>
    )
}

export default Create