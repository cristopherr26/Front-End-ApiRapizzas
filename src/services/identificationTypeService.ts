import { getRequest } from "./service-http"

interface ApiResponse<T> {
  data: T[]
  messages: string[]
}

export interface IdentificationTypeDTO {
  identificationTypeId: string
  identificationTypeName: string
}

export const getIdentificationTypes = async (): Promise<IdentificationTypeDTO[]> => {
  const { success, error } = await getRequest<ApiResponse<IdentificationTypeDTO>>("/identification-types")

  if (error) throw new Error(error)
  return success?.data || []
}
