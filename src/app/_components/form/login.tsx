"use client";

import ENDPOINTS from "@/lib/apiUrls";
import api from "@/lib/interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input, Tooltip } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Info } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {};

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(2, "Email is required")
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(2, "Password is required"),
});

export default function LoginForm({}: Props) {
  const router = useRouter();
  const [isVisiblePass, setVisiblePass] = React.useState(false);
  const toggleVisiblePass = () => setVisiblePass(!isVisiblePass);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await api.post(ENDPOINTS.postExample(), data);
    },
    onSuccess: () => {
      toast.success("Welcome back.");
      router.push("/dashboard/users");
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png"
            alt="NextJS logo"
          />
        </div>

        <div className="space-y-1">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="text-center text-sm flex items-center justify-center space-x-1">
            <p>This is for Maybank Front-end Assessment</p>{" "}
            <Tooltip content={<TooltipContent />}>
              <Info className="min-h-4 w-4 text-primary" />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                className="col-span-2"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                type={isVisiblePass ? "text" : "password"}
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                label="Password"
                className="col-span-2"
                endContent={
                  isVisiblePass ? (
                    <Eye
                      className="w-4 mb-[6px] cursor-pointer"
                      onClick={toggleVisiblePass}
                    />
                  ) : (
                    <EyeOff
                      className="w-4 mb-[6px] cursor-pointer"
                      onClick={toggleVisiblePass}
                    />
                  )
                }
              />
            )}
          />

          <div className="text-center space-y-4 pt-6">
            <Button
              type="submit"
              className="col-span-2"
              color="primary"
              fullWidth
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isValid}
            >
              Login
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a user?{" "}
          <a
            href="/register"
            className="font-semibold leading-6 text-primary hover:text-primary/90"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}

const TooltipContent = () => {
  return (
    <div className="space-y-2">
      <p className="font-bold text-md">Assessment Info</p>

      <p>This assessment will consist of modules:</p>

      <ul className="space-y-1 list-disc list-inside text-sm">
        <li>Login</li>
        <li>Register</li>
        <li>Users datatable (Create, Read, Update, Delete)</li>
      </ul>

      <p>There will be no database usage in this web application.</p>
    </div>
  );
};
