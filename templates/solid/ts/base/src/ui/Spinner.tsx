import { Component } from "solid-js";
import styles from "./spinner.module.css";

const Spinner: Component = () => {
    return (
        <div id="qv-spinner" class={styles.spinner_overlay}>
            <div class={styles.spinner_container} />
        </div>
    );
};

export default Spinner;
