<script setup lang="ts">
import { reactive, ref } from "vue";

interface EmployeeForm {
  firstName: string;
  lastName: string;
  cellphone: string;
  documentType: string;
  documentNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const formData = reactive<EmployeeForm>({
  firstName: "",
  lastName: "",
  cellphone: "",
  documentType: "",
  documentNumber: "",
  password: "",
  confirmPassword: "",
  role: "",
});

const documentType: string[] = ["T.I", "C.C", "Registro Cívil"];

const form = ref<HTMLFormElement | null>(null);


const lettersPattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/;
const numbersPattern = /^[0-9]+$/;

const passwordPattern =
  /^(?=.{8,15}$)(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[!@#$%&*\?\-_,])[A-Za-z\d!@#$%&*\?\-_,]+$/;

  const validatePasswords = () => {
  const confirmPasswordInput = document.getElementById("validationCustomConfirmPassword") as HTMLInputElement;

  if (formData.password === formData.confirmPassword && formData.password !== "") {
    confirmPasswordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.add("is-valid");
  } else {
    confirmPasswordInput.classList.remove("is-valid");
    confirmPasswordInput.classList.add("is-invalid");
  }
};

const handleSubmit = (event: Event) => {
  event.preventDefault();

  const formElement = form.value;
  if (!formElement) return;
  formElement.classList.remove("was-validated");
  let isValid = true;

  if (!lettersPattern.test(formData.firstName) || formData.firstName.length < 3)
    isValid = false;
  
  if (!lettersPattern.test(formData.lastName) || formData.lastName.length < 2)
    isValid = false;
  
  if (!numbersPattern.test(formData.cellphone) || formData.cellphone.length < 10)
    isValid = false;
  
  if (!formData.documentType || !numbersPattern.test(formData.documentNumber))
    isValid = false;

  
  const passwordInput = document.getElementById("validationCustomPassword") as HTMLInputElement;
  const confirmPasswordInput = document.getElementById("validationCustomConfirmPassword") as HTMLInputElement;

  const validPassword = passwordPattern.test(formData.password);
  if (!validPassword) {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    isValid = false;
  } else {
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
  }

  if (formData.password != formData.confirmPassword || formData.confirmPassword == null ) {
    confirmPasswordInput.classList.remove("is-valid");
    confirmPasswordInput.classList.add("is-invalid");
    isValid = false;
  } else {
    confirmPasswordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.add("is-valid");
  }

  if (!formData.role) isValid = false;

  formElement.classList.add("was-validated");

  if (isValid) {
    alert(` Registro exitoso:\n\n` +
      `Nombre: ${formData.firstName}\n` +
      `Apellido: ${formData.lastName}\n` +
      `Celular: ${formData.cellphone}\n` +
      `Tipo de documento: ${formData.documentType} \n` +
      `Tipo de documento:${formData.documentNumber}\n` +
      `Rol: ${formData.role}`);
    Object.keys(formData).forEach((key) => ((formData as any)[key] = ""));
    formElement.classList.remove("was-validated");
    document.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });
  }
};
</script>

<template>
  <form ref="form" class="row g-3 needs-validation" novalidate @submit="handleSubmit">
    <h2>Registro de empleados</h2>

    <div class="col-md-4">
      <label for="validationCustomFirstName" class="form-label">Ingrese su primer nombre</label>
      <input
        v-model.trim="formData.firstName"
        type="text"
        class="form-control"
        id="validationCustomFirstName"
        placeholder="Primer nombre"
        minlength="3"
        maxlength="25"
        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$"
        required
      />
      <div class="invalid-feedback">Por favor ingrese su primer nombre</div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomLastName" class="form-label">Ingrese su primer apellido</label>
      <input
        v-model.trim="formData.lastName"
        type="text"
        class="form-control"
        id="validationCustomLastName"
        placeholder="Primer apellido"
        minlength="2"
        maxlength="25"
        pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$"
        required
      />
      <div class="invalid-feedback">Por favor ingrese su primer apellido</div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomCellphoneNumber" class="form-label">Ingrese su número de teléfono móvil</label>
      <input
        v-model="formData.cellphone"
        type="text"
        class="form-control"
        id="validationCustomCellphoneNumber"
        placeholder="Número de teléfono"
        minlength="10"
        maxlength="15"
        pattern="^[0-9]+$"
        required
      />
      <div class="invalid-feedback">Por favor ingrese su número de teléfono</div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomDocumentType" class="form-label">Seleccione su tipo de documento</label>
      <select
        v-model="formData.documentType"
        class="form-select"
        id="validationCustomDocumentType"
        required
      >
        <option selected disabled value="">Seleccione</option>
        <option v-for="type in documentType">{{type}}</option>
      </select>
      <div class="invalid-feedback">Seleccione un Tipo de documento válido</div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomDocumentNumber" class="form-label">Ingrese su número de Documento</label>
      <input
        v-model="formData.documentNumber"
        type="text"
        class="form-control"
        id="validationCustomDocumentNumber"
        placeholder="Número de documento"
        minlength="10"
        maxlength="12"
        pattern="^[0-9]+$"
        required
      />
      <div class="invalid-feedback">Por favor ingrese su número de documento</div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomPassword" class="form-label">Ingrese su contraseña</label>
      <input
        v-model="formData.password"
        type="password"
        class="form-control"
        id="validationCustomPassword"
        pattern="^(?=.{8,15}$)(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[!@#$%&*\?\-_,])[A-Za-z\d!@#$%&*\?\-_,]+$"
        aria-describedby="passwordHelp"
        placeholder="Contraseña"
        minlength="8"
        maxlength="15"
        required
      />
      <div class="form-text" id="passwordHelp">
        La contraseña debe tener entre 8 y 15 caracteres.
      </div>
      <div class="invalid-feedback">
        <ul>
          <li>Debe tener entre <b>8 y 15 caracteres</b>.</li>
          <li>Debe incluir <b>al menos una letra mayúscula</b></li>
          <li>Debe incluir <b>al menos un número</b></li>
          <li>Debe incluir <b>al menos un carácter especial</b></li>
        </ul>
      </div>
    </div>

    <div class="col-md-4">
      <label for="validationCustomConfirmPassword" class="form-label">Confirme su contraseña</label>
      <input
        v-model="formData.confirmPassword"
        type="password"
        class="form-control"
        id="validationCustomConfirmPassword"
        placeholder="Confirme su contraseña"
        minlength="8"
        maxlength="15"
        required
        @input="validatePasswords"
      />
      <div class="invalid-feedback">Las contraseñas no coinciden.</div>
    </div>

    <div class="col-md-4">
      <label class="form-label d-block mb-2">Seleccione su rol</label>
      <div class="form-check form-check-inline">
        <input
          v-model="formData.role"
          class="form-check-input"
          type="radio"
          name="Administrator-Waiter"
          id="waiter"
          value="waiter"
          required
        />
        <label class="form-check-label" for="waiter">Mesero</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          v-model="formData.role"
          class="form-check-input"
          type="radio"
          name="Administrator-Waiter"
          id="administrator"
          value="administrator"
        />
        <label class="form-check-label" for="administrator">Administrador</label>
      </div>
      <div class="invalid-feedback">Debe seleccionar un rol antes de continuar.</div>
    </div>

    <div class="col-12">
      <button class="btn btn-primary" type="submit">Registrar</button>
    </div>
  </form>
</template>

<style scoped>
form {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.form-label {
  font-weight: 600;
  color: #333;
}
input::placeholder,
select {
  color: #888;
}
.btn-primary {
  width: 100%;
  font-weight: bold;
  background-color: #0069d9;
}
.btn-primary:hover {
  background-color: #004fa3;
}
h2 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 25px;
  color: #000000;
}
</style>
