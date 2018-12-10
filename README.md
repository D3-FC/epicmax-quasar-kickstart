# Epicmax Kickstarter app

This app is a hybrib app wrapped with Quasar framework (powered with [Vue](https://vuejs.org/)). Read more about quasar framework [here](https://quasar-framework.org/guide/introduction-to-quasar.html)

## Contents
1. [Tools](#markdown-header-1-tools)
2. [Setup](#markdown-header-2-setup)
3. [Mobile App Preparation](#markdown-header-3-mobile-app-prepation)
4. [Theming](#markdown-header-4-theming)
5. [Linting](#markdown-header-5-linting)
6. [Testing](#markdown-header-6-testing)
10. [Building components](#markdown-header-10-building-components)

## 1. Tools
Make sure you have installed the following software/tools.
Look versions requirements in `package.json` section `engines`
1. [node](https://nodejs.org/en/) - Node.js.
2. [yarn](https://yarnpkg.com/en/) - Dependency manager
3. [vue-cli 3](https://cli.vuejs.org/) - Install globally
4. [Quasar CLI](https://quasar-framework.org/guide/quasar-cli.html) - Install globally
5. [cordova](https://cordova.apache.org/) - Install globally
6. [google chrome](https://www.google.com/chrome/) - web browser

## 2. Setup

**IMPORTANT:** Set up backend before you set up the app.

Install project dependencies by running the following command in <PROJECT_ROOT_DIRECTORY>
```shell
yarn
```

Create environment variables files.

Copy `environments/example.json` and rename it to `dev.json` to same directory
```shell
  "API_URL": "http://coplays-content.on.local/api",
  "APPLICATION_ID": "1",
  "CLIENT_ID": "2",
  "CLIENT_SECRET": "",
  "BUGSNAG_API_KEY": "",
  "VUE_ROUTER_MODE": "history",
  "BUILD_ENV": "dev"
```

1. `dev.json` for local development
2. `staging.json` for staging
3. `prod.json` for production

This boilerplate supports several package versions.
Configuration of each package should be specified in according file in 'package/<package_name>.js'
You can look examples of available configurations in 'package/example.js'
Every <key> provided in `config` section will be proxied to `process.env.<key>`


All app configs are declared in `src/config.js`
Do not use `process.env.<*>` in code, use `src/config.js` instead.


 

Run app in the browser
```shell
yarn serve
```
By default `yarn serve` will serve the app in material theme.

To serve app in ios theme
```shell
yarn server -t ios
```
To serve app in material theme
```shell
yarn server -t mat
```

## 3. Mobile App Preparation
Visit https://quasar-framework.org/guide/cordova-preparation.html and setup android develop environment

Run app in android mobile
```shell
# run app in development mode
yarn android:dev
```
```shell
# run app in staging mode, Make sure you have properly configured /environments/staging.js
yarn android:staging
```
```shell
# run app in staging mode, Make sure you have properly configured /environments/prod.js
yarn android:prod
```


## 4. Theming
Visit [Quasar theming](https://quasar-framework.org/guide/quasar-theming.html) and make yourself familiar with it.

Structure
```shell
src
└── css
    └── themes
        ├── common.variables.styl # Theme Shared Quasar Variables
        ├── variables.mat.styl    # Quasar Variables that apply to Material only
        └── variables.ios.styl    # Quasar Variables that apply to iOS only
```

### Overriding default stylus vairables
Read a complete list of all [Stylus variables](https://quasar-framework.org/components/stylus-variables.html) that you can override.
Most of the time overides should be done in `/src/css/themes/common.variables.styl` file unless we need platform specific overrides


## 5. Linting
We are using ESLint with `plugin:vue/essential` and `@vue/standard` presets. `@vue/standard` - is the wrapper over standardjs preset.

#### Usage
 * Linter will be run automatically on commit.
 * If you want to run `lint fix` manually just run `lint` npm script (`yarn lint` or `npm run lint`).

#### IDE support
To have IDE Support of standard code style you may want to install standard plugin for your IDE.

##### Webstorm or other Jetbrains IDE
1. Open settings (`ctrl + alt + s`), go to Editor > Code Style > Javascript push `set from...` and switch `predefined style`
to `Javascript Standard Style`. Example: https://i.imgur.com/GJCGifs.png
2. Open settings (`ctrl + alt + s`), go to Languages and framewors > JavaScript > Code Quality Tools > ESLint and specify 
ESLint package to: `coplays-content-app\node_modules\eslint`. Example: https://i.imgur.com/QkpZeYW.png

#### Under the hood
To run lint on pre-commit we are using `yorkie` in devDependencies


## 6. Testing

For testing we are using `Jest` framework (https://jestjs.io/)

All tests are located in `/src` folder. 
Each test should be placed in the model it is used for.
All tests should have `.spec.js` extension.
For example:
```
UserLoginForm.vue
UserLoginForm.spec.js
```

To run tests `yarn test`




## 10 Building components
Do not use stateful singletons in app. Read quasar [docs](https://quasar-framework.org/guide/ssr-writing-universal-code.html#Avoid-Stateful-Singletons) for more info. Use Vue plugins to provide instances.

All components should be wrapped in `EpicmaxGate` component.
`EpicmaxGate` component provides dependencies like SDK and so on.
Don not use Vue plugins (`this.$axios` or other) inside your custom components, do not import SDK or complicated dependencies in components directly. Use [Inject/Provide](https://vuejs.org/v2/api/#provide-inject) instead.
We are using [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator#providekey-string--symbol--injectoptions--from-injectkey-default-any---injectkey-decorator) code style

##### Provides in EpicmaxGate component

```typescript

import { Component, Provide, Vue } from 'vue-property-decorator'
import {
  OrganizationRepoKey,
  NotifyErrorKey,
} from './src/AppKeys'

import { OrganizationRepository } from './src/sdk/Organization/OrganizationRepository'
import ApiProxy from './src/utilities/Api/ApiProxy'
@Component
export default class EpicmaxGate extends Vue {
  
  @Provide(NotifyErrorKey) notifyError = this.$epicmax.notifyError
  // REPOSITORIES
  @Provide(OrganizationRepoKey) organizationRepo = new OrganizationRepository(
    new ApiProxy(this.$axios)
  )
}

```
for more examples look 'EpicmaxGate' component

##### Injections in EpicmaxOrganisationSaveForm component

```typescript

import { Component , Inject, Prop, Vue, Watch} from 'vue-property-decorator'
import { OrganizationRepository } from './src/sdk/Organization/OrganizationRepository'
import { OrganizationRepoKey } from './src/AppKeys'

@Component
export default class EpicmaxOrganisationSaveForm extends Vue {
  @Inject(OrganizationRepoKey) organizationRepo!: OrganizationRepository

  async save () {
    await this.organizationRepo.save(this.organization)
  }
}
```
For Every hard-logic component write `.demo.vue`.
New created demo can be found in `/demo` route.
For more info read [docs](https://github.com/asvae/vue-book)



## TO BE CONTINUED...

