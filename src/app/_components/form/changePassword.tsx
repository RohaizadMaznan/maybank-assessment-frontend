"use client";

import ENDPOINTS from "@/lib/apiUrls";
import api from "@/lib/interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type Props = {
  onClose: () => void;
};

const formSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(1, "Current password is required"),
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, "Atleast 8 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(8, "Atleast 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password does not match",
    path: ["confirmPassword"], // Display error message not match only on field "confirmPassword"
  });

export default function ChangePasswordForm({ onClose }: Props) {
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
        name="currentPassword"
        render={({ field }) => (
          <Input
            {...field}
            label="Current Password"
            type={isVisiblePass ? "text" : "password"}
            errorMessage={errors.currentPassword?.message}
            isInvalid={!!errors.currentPassword}
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
        name="newPassword"
        render={({ field }) => (
          <Input
            {...field}
            label="New Password"
            type={isVisiblePass ? "text" : "password"}
            errorMessage={errors.newPassword?.message}
            isInvalid={!!errors.newPassword}
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
