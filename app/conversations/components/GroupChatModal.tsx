"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post(
        "/api/v1/conversations",
        { ...data, isGroup: true },
        {
          withCredentials: true,
          headers: { currentUserHeader: `${session?.data?.user?.email}` },
        }
      );
      router.refresh();
      onClose();
      setIsLoading(false);
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create a group chat
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Create a chat with more than 2 people.
          </p>
          <div className="mt-10 flex flex-col gap-y-8">
            <Input
              label="Name"
              register={register}
              id="name"
              disabled={isLoading}
              errors={errors}
              required
            />
            <Select
              disabled={isLoading}
              label="Members"
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
              onChange={(value) =>
                setValue("members", value, { shouldValidate: true })
              }
              value={members}
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            onClick={onClose}
            type="button"
            secondary
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
