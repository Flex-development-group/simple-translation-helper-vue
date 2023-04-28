import Translate from "./components/Translate.vue";
import TranslationHub from "./components/TranslationHub.vue";
import './style.css';
import TranslationStore from "./stores/TranslationStore.js";

export default {
    install: (app, options) => {
        if (!options?.method) {
            throw new Error("You must provide the method name used to translate the text. Example: app.use(TranslationPlugin, {method: 'translate'})");
        }

        app.component("translate", Translate);
        app.component("translation-hub", TranslationHub);
        TranslationStore.value.translateMethod = app.config.globalProperties[`$${options.method}`]
    }
}