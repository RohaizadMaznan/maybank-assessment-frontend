"use client";

import ENDPOINTS from "@/lib/apiUrls";
import api from "@/lib/interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {
  onClose: () => void;
  mode: "create" | "update";
  defaultValues?: {
    id?: number;
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    skillsets?: string[];
    hobby?: string[];
  };
};

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
    skillsets: z
      .string({ required_error: "Skillsets is required" })
      .min(1, "Skillsets is required"),
    hobby: z
      .string({ required_error: "Hobby is required" })
      .min(1, "Hobby is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"], // Display error message not match only on field "confirmPassword"
  });

export default function CreateUserForm({
  onClose,
  mode = "create",
  defaultValues,
}: Props) {
  const [isVisiblePass, setVisiblePass] = React.useState(false);
  const toggleVisiblePass = () => setVisiblePass(!isVisiblePass);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultValues?.username,
      email: defaultValues?.email,
      phone: defaultValues?.phone,
      skillsets: String(defaultValues?.skillsets?.join(", ")),
      hobby: String(defaultValues?.hobby?.join(", ")),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await api.post(ENDPOINTS.postExample(), data);
    },
    onSuccess: () => {
      onClose();
      toast.success("User is created.");
    },
    onError: (errors) => {
      toast.error(errors.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="createNewUser"
      className="space-y-4"
    >
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
        name="skillsets"
        render={({ field }) => (
          <Input
            {...field}
            label="Skillsets"
            placeholder="Front-end development, NextJS 14, API Integration"
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
          />
        )}
      />

      <Controller
        control={control}
        name="hobby"
        render={({ field }) => (
          <Input
            {...field}
            label="Hobby"
            placeholder="Cycling, badminton, swimming"
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
          />
        )}
      />

      <Divider />

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
    </form>
  );
}
