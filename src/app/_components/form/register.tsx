"use client";

import ENDPOINTS from "@/lib/apiUrls";
import api from "@/lib/interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Image, Input, Tooltip } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Info } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {};

const formSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username is required"),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email(),
    phone: z
      .string({ required_error: "Phone no. is required" })
      .min(1, "Phone no. is required"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Atleast 8 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(8, "Atleast 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"], // Display error message not match only on field "confirmPassword"
  });

export default function RegisterForm({}: Props) {
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
      toast.success("Account is successfully register.");
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
            Register your account now
          </h2>

          <p className="text-sm text-center">
            Please enter all the required field to register as our user
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                label="Username"
                errorMessage={errors.username?.message}
                isInvalid={!!errors.username}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                label="Email"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                label="Phone"
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                type={isVisiblePass ? "text" : "password"}
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm Password"
                type={isVisiblePass ? "text" : "password"}
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
              />
            )}
          />

          <div className="text-center space-y-4 pt-6">
            <Button
              type="submit"
              color="primary"
              fullWidth
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending || !isValid}
            >
              Register me
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Existing user?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-primary hover:text-primary/90"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
