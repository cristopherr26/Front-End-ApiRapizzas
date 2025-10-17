<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { Modal } from "bootstrap";

interface LoginForm {
  documentType: string;
  documentNumber: string;
  password: string;
}

const formData = reactive<LoginForm>({
  documentType: "",
  documentNumber: "",
  password: "",
});

const form = ref<HTMLFormElement | null>(null);
let loginModal: Modal | null = null;

onMounted(() => {
  const modalElement = document.getElementById("employeeLoginModal");
  if (modalElement) loginModal = new Modal(modalElement);
});

const numbersPattern = /^[0-9]+$/;
const passwordPattern =
  /^(?=.{8,15}$)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?_\-])[A-Za-z\d!@#$%&*?_\-]+$/;

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const formElement = form.value;
  if (!formElement) return;

  formElement.classList.remove("was-validated");
  let isValid = true;

  if (!formData.documentType) isValid = false;
  if (!numbersPattern.test(formData.documentNumber)) isValid = false;

  const passwordInput = document.getElementById("validationLoginPassword") as HTMLInputElement;
  const validPassword = passwordPattern.test(formData.password);
  if (!validPassword) {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    isValid = false;
  } else {
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
  }

  formElement.classList.add("was-validated");

  if (isValid) {
    alert(
      `Inicio de sesión exitoso:\n\n` +
      `Tipo de documento: ${formData.documentType}\n` +
      `Número de documento: ${formData.documentNumber}`
    );

    Object.keys(formData).forEach((key) => ((formData as any)[key] = ""));
    formElement.classList.remove("was-validated");
    document.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });
    if (loginModal) loginModal.hide();
  }
};
</script>

<template>
  <div
    class="modal fade"
    id="employeeLoginModal"
    tabindex="-1"
    aria-labelledby="employeeLoginLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-semibold" id="employeeLoginLabel">Login Empleado</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Cerrar"
          ></button>
        </div>
        <form
          ref="form"
          class="row g-3 needs-validation p-3"
          novalidate
          @submit="handleSubmit"
        >
          <div class="col-12">
            <label for="validationLoginDocumentType" class="form-label">Tipo de documento</label>
            <select
              v-model="formData.documentType"
              class="form-select"
              id="validationLoginDocumentType"
              required
            >
              <option selected disabled value="">Seleccione</option>
              <option>T.I</option>
              <option>C.C</option>
              <option>Registro Civil</option>
            </select>
            <div class="invalid-feedback">Seleccione un tipo de documento válido.</div>
          </div>

          <div class="col-12">
            <label for="validationLoginDocumentNumber" class="form-label">Número de documento</label>
            <input
              v-model="formData.documentNumber"
              type="text"
              class="form-control"
              id="validationLoginDocumentNumber"
              placeholder="Número de documento"
              minlength="4"
              maxlength="12"
              pattern="^[0-9]+$"
              required
            />
            <div class="invalid-feedback">Ingrese un número de documento válido.</div>
          </div>

          <div class="col-12">
            <label for="validationLoginPassword" class="form-label">Contraseña</label>
            <input
              v-model="formData.password"
              type="password"
              class="form-control"
              id="validationLoginPassword"
              placeholder="Ej: 11Arroyojuan*"
              minlength="8"
              maxlength="15"
              required
            />
            <div class="form-text">
              Entre 8 y 15 caracteres, 1 mayúscula, 1 número y 1 carácter especial (! @ # $ % & * ? - _)
            </div>
            <div class="invalid-feedback">
              La contraseña debe tener entre 8 y 15 caracteres, incluir una mayúscula, un número y un carácter especial.
            </div>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-content {
  border-radius: 1rem;
}
</style>
