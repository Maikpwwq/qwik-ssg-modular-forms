import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "~/media/thunder.png?jsx";

export default component$(() => {
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} />
      <h1>
        So implement <span class="highlight">Qwik</span>
        <br />
        to have <span class="highlight">forms</span> here
      </h1>
      <p>Have fun building your App with Qwik.</p>
      <div class={styles["button-group"]}>
        <a
          href="/customer-form"
          class="button button-dark"
        >
          From With MongoDB
        </a>
        <a
          href="/customer-record"
          class="button"
        >
          From With Supabase
        </a>
      </div>
    </div>
  );
});
