import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register"], {
    onSuccess() {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type="email"
          placeholder="your-email@example.com"
          {...register("email")}
        />
        <input type="text" placeholder="your-name" {...register("name")} />

        <button type="submit">Register</button>
      </form>

      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
