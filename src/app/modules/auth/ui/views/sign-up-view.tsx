"use client";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {OctagonIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {FaGithub, FaGoogle} from "react-icons/fa";
import { useState } from "react";
import e from "express";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import {Alert, AlertTitle} from "@/components/ui/alert"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SignUpView = () => {
    const router=useRouter();

    
    const [error,setError]=useState<string|null>(null);
    const [pending,setPending]=useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit=(data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                    
                },
                onError:({error})=> {
                    setError(error.message || "An error occurred during sign up.");
                }
            }
        )
    }

    const onSocial=(provider: "github" |"google") => {
        setError(null);
        setPending(true);

        authClient.signIn.social(
            {
                provider: provider,
                callbackURL: "/",
            },
            {
                onSuccess: () => {
                    setPending(false);
                    
                },
                onError:({error})=> {
                    setError(error.message || "An error occurred during sign up.");
                }
            }
        )
    }


    return(
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0 bg-grey-100">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Let&#39;s Get Started
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create your account
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}

                                <Button disabled={pending} className="w-full " type="submit">
                                    Sign Up
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute
                                 after-inset-0 after:top-1/2 after-flex after:z-0 after:items-center after:border-t">
                                    <span className="text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>

                                    
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            disabled={pending}
                                            onClick={() => onSocial("google")}
                                            variant="outline"
                                            className="w-full"
                                            type="button">
                                                <FaGoogle className="mr-2" />
                                        </Button>
                                        <Button
                                            disabled={pending}
                                            onClick={() => onSocial("github")}
                                            variant="outline"
                                            className="w-full"
                                            type="button">
                                                <FaGithub className="mr-2" />
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                        Already have an account?{" "}<Link href="/sign-in" className="font-medium text-blue-700">Sign In</Link>
                                    </div>
                            </div>

                        </form>
                    </Form>
                   
                   <div className="bg-white relativce hidden md:flex flex-col
                   gap-y-4 items-center justify-center width">
                    <img src="/logo.svg" alt="Logo" className="h-[218px] w-[218px]"></img>
                   </div>
                </CardContent>
                
            </Card>

            
            
        </div>
    )
}