import { postRequest } from "./service-http";
import type { IdentificationTypeDTO } from "./identificationTypeService";

interface ApiResponse<T> {
  data?: T | T[];
  messages?: string[];
}

export interface EmployeeDTO {
  name: string;
  lastName: string;
  identificationType: Pick<IdentificationTypeDTO, "identificationTypeId">;
  identificationNumber: string;
  cellPhoneNumber: string;
  administrator: boolean;
  employeePassword: string;
}

export const registerEmployee = async (employee: EmployeeDTO) => {
  try {
    
    const { success, error } = await postRequest<ApiResponse<unknown>>(
      "/employees",
      employee
    );

    if (error) {
      throw error;
    }

    return success;
  } catch (err: any) {
    if (err.response) {
      throw err;
    } else {
      throw new Error(`Error inesperado al registrar empleado: ${err.message || err}`);
    }
  }

};
