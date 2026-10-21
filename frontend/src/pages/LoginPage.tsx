import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/mainButton"
import { loginFormSchema, type TLoginFormSchema } from "@/types/zodFormTypes/TZodLoginForm"
import { useLoginMutation } from '@/hooks/useLoginMutation'
import { Label } from "@/components/ui/label"

export const LoginPage = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const { 
    mutate, 
    isPending, 
    isError, 
    error 
  } = useLoginMutation()

  const onSubmit = (data: TLoginFormSchema) => {
    mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-6 bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold">Login</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-input" className="text-sm font-medium">Email</Label>
            <Input
              id="email-input"
              {...register("email")}
              type="email"
              autoComplete="username email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-input" className="text-sm font-medium">Password</Label>
            <Input
              id="password-input"
              {...register("password")}
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          {isError && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}
        </div>
      </form>
    </div>
  )
} 