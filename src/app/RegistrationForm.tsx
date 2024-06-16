"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "./registrationSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { useRef } from "react";

export const RegistrationForm = ({
  onDataAction,
  onFormAction,
}: {
  onDataAction: (
    data: Schema,
  ) => Promise<{ message: string; user?: Schema; issues?: string[] }>;
  onFormAction: (
    prevState: { message: string; user?: Schema; issues?: string[] },
    formData: FormData,
  ) => Promise<{ message: string; user?: Schema; issues?: string[] }>;
}) => {
  const [state, formAction] = useFormState(onFormAction, { message: "" });

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipcode: "",
    },
  });

  const onSubmit = async (data: Schema) => {
    console.log(data);
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "appication/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then(console.log);

    // send as formdata
    // const formData = new FormData();
    // formData.append("first", data.first);
    // formData.append("last", data.last);
    // formData.append("email", data.email);

    //   fetch("/api/registerForm", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then(console.log);

    // console.log(await onDataAction(data));

    // send as formdata;
    // const formData = new FormData();
    // formData.append("first", data.first);
    // formData.append("last", data.last);
    // formData.append("email", data.email);
    //
    // console.log(await onFormAction(formData));
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      {state.message && <div>{state.message}</div>}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zipcode</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your zipcode (NNNNN).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
