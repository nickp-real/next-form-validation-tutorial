import { RegistrationForm } from "./RegistrationForm";
import { Schema, schema } from "./registrationSchema";

export default function Home() {
  const onDataAction = async (data: Schema) => {
    "use server";

    const parsed = schema.safeParse(data);

    console.log(data);
    if (!parsed.success)
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    return { message: "User registered", user: parsed.data };
  };

  const onFormAction = async (
    prevState: { message: string; user?: Schema; issues?: string[] },
    formData: FormData,
  ) => {
    "use server";

    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    console.log(data);
    if (!parsed.success)
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    return { message: "User registered", user: parsed.data };
  };

  return (
    <div className="container mx-auto">
      <RegistrationForm
        onDataAction={onDataAction}
        onFormAction={onFormAction}
      />
    </div>
  );
}
