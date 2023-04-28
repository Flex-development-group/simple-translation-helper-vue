import Translate from "./components/Translate.vue";
import TranslationHub from "./components/TranslationHub.vue";
import './style.css';

export default {
    install: (app, options) => {
        app.component("translate", Translate);
        app.component("translation-hub", TranslationHub);
    }
}