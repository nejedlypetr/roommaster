import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { api } from '@/lib/axios'
import { EBasicRoutes } from '@/enums/routes'
import { TLoginFormSchema } from '@/types/zodFormTypes/TZodLoginForm'
import { TLoginResponse } from '@/types/dto/TLoginResponse'

type TUseLoginMutationArgs = {
  onError?: (error: Error) => void;
}

export const useLoginMutation = ({ onError }: TUseLoginMutationArgs = {}) => {
  const { setCurrentUser, setToken, setRole } = useStore()
  const navigate = useNavigate()

  return useMutation<TLoginResponse, Error, TLoginFormSchema>({
    mutationFn: (data) => api.post("/login", data).then(res => res.data),
    onSuccess: (data) => {
      setToken(data.token)
      setRole(data.user.role)
      setCurrentUser(data.user)
      navigate(EBasicRoutes.ROOMS)
    },
    onError: (error) => {
      console.error("Error:", error)
      onError?.(error)
    }
  })
}
