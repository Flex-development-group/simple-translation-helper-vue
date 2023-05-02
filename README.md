# Simple translation helper for Vue 3

This package provides a simple translation helper for Vue 3.

## Installation
```bash
npm i simple-translation-helper-vue
```

Add dependencies to your `main.js`:

```javascript
import Vue           from 'vue'
import SimpleTranslation from 'simple-translation-helper-vue'
import 'simple-translation-helper-vue/dist/style.css'

Vue.use(SimpleTranslation, {
    method: 't', // The translation method name to use. The `translate` component will use the $t method to translate text.
})
```

If you want the ability to display the translation keys  add the `translation-hub` component to your `App.vue`:

```vue
<translation-hub :active="conditionToShowHub"/>
```

## Translation hub
The `translation-hub` is a button that you can use to display the translation keys. This is useful for debugging and for providing a way for translators to see the keys that need to be translated.

### Props

| Prop      | Type      | Default | Description                                                  |
| --------- | --------- | ------- | ------------------------------------------------------------ |
| active    | `Boolean` | `false` | Determines whether the component is active or not.           |
| position  | `String`  | `"top-right"` | Determines the position of the component on the page. It must be one of `"top-left"`, `"top-right"`, `"bottom-left"`, or `"bottom-right"`. |

### Slots

The component has one default slot that can be used to provide custom content to be displayed instead of the translation keys toggle button. The slot can receive the following property:

| Property                  | Type     | Description                                                  |
| -------------------------| -------- | ------------------------------------------------------------ |
| `toggle-translation-keys` | `Function` | A function that toggles the display of translation keys. It can be called when needed to toggle the state.|


### Example Usage with slots

```vue

<template>
  <div>
    <translation-hub active :position="'top-right'">
      <template #default="{ toggleTranslationKeys }">
        <button @click="toggleTranslationKeys">
          Toggle Translation Keys
        </button>
      </template>
    </translation-hub>
  </div>
</template>
```

## Translate Component

The `translate` component designed to display translations of text and give you the option to display the translation key.

### Props


| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `translationKey` | String | Yes | The translation key used to look up the translated text |
| `defaultText` | String | Yes | The default text to display if no translation is available |
| `as` | String | No | The HTML tag to use for rendering the component. The default is `span` |
| `options` | Object | No | Additional options to pass to the translation method |

## Slots

The `translate` component has one default slot, which can be used to provide custom content for the component.

## Usage example

Here is an example of how you can use the `translate` component:
```
<template>
  <translate translationKey="greeting" defaultText="Hello, world!" />
</template>
```

In this example, the component will look up the translation for the greeting key with your translation method. If a translation is found, it will be displayed. Otherwise, the default text "Hello, world!" will be displayed.

You can also use the default slot to provide custom content:
```vue
<template>
  <translate translationKey="dashboard.title" defaultText="Welcome to my dashboard">
    <h1>{{$t("dashboard.title")}</h1>
  </translate>
</template>
```

Finally, you can use the `as` prop to specify the HTML element to use for the rendered output:
```vue
<template>
  <translate translationKey="greeting" defaultText="Hello, world!" as="h1" />
</template>

```
