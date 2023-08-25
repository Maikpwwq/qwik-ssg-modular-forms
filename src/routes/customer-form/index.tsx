import { component$, $, useTask$ } from "@builder.io/qwik"; // , useSignal
import { isServer } from "@builder.io/qwik/build";
// import { connectionDB } from "~/services/mongo-init";
import clsx from "clsx";
import {
  routeLoader$,
  z,
} from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik"; 
import {
  useForm,
  formAction$,
  zodForm$,
  reset,
} from "@modular-forms/qwik";
import styles from "~/components/modular-forms/modularForm.module.css";
import { MUITypography, MUIPaper } from "~/integrations/react/mui";
import { TextInput } from "~/components/modular-forms/TextInput";

import mongoose from "mongoose";
const DB_USER = `${import.meta.env.VITE_DB_USER}`;
const DB_PASSWORD2 = `${import.meta.env.VITE_DB_PASSWORD2}`;
const DB_NAME = `${import.meta.env.VITE_DB_NAME}`;
const MONGODB_COLLECTION = `${import.meta.env.VITE_MONGODB_COLLECTION}`;
const MONGO_HOST = `${import.meta.env.VITE_MONGO_HOST}`;

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  issue: String,
  message: String,
});

const options = {
  dbName: DB_NAME,
  user: DB_USER,
  pass: DB_PASSWORD2,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectionDB = $(async (contactData: LoginForm) => {
  console.log("connectionDB", contactData, MONGO_HOST, MONGODB_COLLECTION);
  try {
    await mongoose.connect(MONGO_HOST, options).catch((error) => {
      console.log("mongoose connection error", error);
    });

    const userModel = mongoose.model(MONGODB_COLLECTION, messageSchema);

    return await userModel
      .create(contactData)
      .then((data) => {
        const _id = data._id.toString();
        console.log("create userModel", _id, typeof _id);
        return _id;

      })
      .catch((err) => {
        console.error("err", err);
        throw new Error("Error mientras se retorno _id de registro.");
      });
  } catch (error) {
    console.error("error", error);
    throw new Error("Error mientras se accedio a crear un nuevo registro.");
  }
});

type LoginForm = {
  name: string;
  email: string;
  phone: string;
  issue: string;
  message: string;
};

const loginSchema = z.object({
  name: z.string().min(1, "Por favor introduzca su nombre."),
  email: z
    .string()
    .min(1, "Por favor introduzca su email.")
    .email("The email address is badly formatted."),
  phone: z
    .string()
    .min(1, "Por favor introduzca su teléfono.")
    .min(10, "Tu teléfono debe tener 10 caracteres o más."),
  issue: z.string().min(1, "Por favor introduzca su asunto."),
  message: z
    .string()
    .min(1, "Por favor introduzca su mensaje.")
    .min(8, "Tu mensaje debe tener 8 caracteres o más."),
});

// Also posible infer typos
// type LoginForm = z.infer<typeof loginSchema>;

// can only be declared in `layout.tsx`, `index.tsx` and `plugin.tsx` inside the src/routes directory
export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  name: "",
  email: "",
  phone: "",
  issue: "",
  message: "",
}));

type ResponseData = {
  customerId: string;
};

export const useFormAction = formAction$<LoginForm, ResponseData>(
  async (values: LoginForm) => {
    // Runs on SERVER
    console.log("useFormAction", values);
    try {
      const recordID = await connectionDB(values);
      console.log("Promise message", recordID);
      return {
        status: "success",
        message: `Gracias, su mensaje ha sido recibido. ${recordID}`,
        data: { customerId: recordID },
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        message: `No se ha podido enviar su mensaje. ${error}`,
        data: { customerId: "" },
      };
    }
  },
  zodForm$(loginSchema)
); // valiForm$(LoginSchema)

export default component$(() => {
  // const nav = useNavigate();

  // , FieldArray
  const [loginForm, { Form, Field }] = useForm<LoginForm, ResponseData>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(loginSchema),
  });

  const handleSubmit = $<SubmitHandler<LoginForm>>(
    async (values: LoginForm, event: any) => {
      // Runs on CLIENT
      console.log("handleSubmit", values, event);
    }
  );

  const successData = $(async () => {
    console.log(
      "handleSubmitSuccess",
      loginForm.submitted,
      loginForm.submitting,
      loginForm.response
    );
    alert(loginForm.response.message);
    reset(loginForm); // , useFormLoader
    // clearResponse(loginForm);
    // const value = getValue(form, name, options);
    // await nav("/");
  });

  const errorData = $(async () => {
    console.log(
      "handleSubmitError",
      loginForm.submitted,
      loginForm.submitting,
      loginForm.response,
    );
    alert(loginForm.response.message);
  });

  useTask$(({ track }) => {
    track(() => loginForm.response.status);
    if (isServer) {
      return; // Server guard
    }
    if (
      loginForm.submitted &&
      loginForm.submitting === false &&
      loginForm.response.status === "success"
    ) {
      successData();
    } else if (
      loginForm.submitted &&
      loginForm.submitting === false &&
      loginForm.response.status === "error"
    ) {
      errorData();
    }
  });

  return (
    <div class="container container-center flex justify-center" style={{}}>
      <MUIPaper className={styles.cardContactForm} elevation={16}>
        <div class={styles.sheetFormStyle}>
          <MUITypography
            variant="h6"
            color={"var(--qwik-dark-blue)"}
            align="center"
          >
            Formulario de contacto
          </MUITypography>
          <MUITypography variant="body1" className="pt-2 pb-4" align="center">
            Solicita información adicional o una presentación de nuestros
            servicios.
          </MUITypography>
          <Form
            class={styles.formFlex}
            onSubmit$={handleSubmit}
            // preventdefault:submit
            // reloadDocument={true}
          >
            <Field
              name="name"
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="text"
                  label="Nombre:"
                  placeholder="Nombre"
                  required
                />
              )}
            </Field>
            <Field
              name="email"
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="email"
                  label="Email:"
                  placeholder="Correo electrónico"
                  required
                />
              )}
            </Field>
            <Field
              name="phone"
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="tel"
                  label="Teléfono:"
                  placeholder="+57"
                  required
                />
              )}
            </Field>
            <Field
              name="issue"
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="text"
                  label="Asunto:"
                  placeholder="Asunto"
                  required
                />
              )}
            </Field>
            <Field
              name="message"
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="text"
                  label="Mensaje:"
                  placeholder="Mensaje"
                  required
                />
              )}
            </Field>
            <button
              type="submit"
              class={clsx("mx-3 lg:mx-5", styles.btnStyle)}
            >
              Enviar
            </button>
          </Form>
        </div>
      </MUIPaper>
    </div>
  );
});
