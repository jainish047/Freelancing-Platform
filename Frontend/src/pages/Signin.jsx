import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../context/authSlice.js";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// 1. Create a form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["Developer", "Employer"]),
  type: z.enum(["Individual", "Organization"]).optional(),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading.login);

  // 2. Define the form with react-hook-form and zodResolver
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "Developer",
      type: "Individual",
    },
  });

  const { handleSubmit, register, watch } = form;
  const roleValue = watch("role");
  const { toast } = useToast();

  // 3. Build the form
  const onSubmit = (values) => {
    console.log(values);
    dispatch(signupUser(values))
      .unwrap()
      .then(() => {
        navigate("/auth/waitEmailVerify");
      })
      .catch((error) => {
        // Ensure you handle the error based on the structure you set in the thunk
        const message = error.message || "An error occurred";
        const status = error.status || 500;

        toast({
          variant:"destructive",
          title: `Error ${status}`,
          description: message,
          duration:3000
        });

        console.log("Error in login page:", message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selector */}
            <div className="flex gap-1 bg-gray-200 p-1 rounded text-white my-6">
              <label
                className={`flex-1 p-1 text-center cursor-pointer rounded ${
                  roleValue === "Developer" ? "bg-gray-600" : "bg-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="Developer"
                  {...register("role")}
                  className="hidden"
                />
                Developer
              </label>
              <label
                className={`flex-1 p-1 text-center cursor-pointer rounded ${
                  roleValue === "Employer" ? "bg-gray-600" : "bg-gray-400"
                }`}
              >
                <input
                  type="radio"
                  value="Employer"
                  {...register("role")}
                  className="hidden"
                />
                Employer
              </label>
            </div>

            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="abc123@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employer Type Selection */}
            {roleValue === "Employer" && (
              <div className="space-y-3">
                <FormLabel>Type</FormLabel>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Individual"
                      {...register("type")}
                      defaultChecked
                      className="w-4 h-4"
                    />
                    <span>Individual</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      value="Organization"
                      {...register("type")}
                      className="w-4 h-4"
                    />
                    <span>Organization</span>
                  </label>
                </div>
              </div>
            )}

            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            )}

            <div className="flex items-center my-2 text-gray-400">
              <hr className="flex-grow" />
              <span className="mx-2 text-gray-600">or</span>
              <hr className="flex-grow" />
            </div>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline text-blue-700">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
