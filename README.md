# Instructions to clon this repo

## Install dependencies

* Run composer to install dependencies

```bash
composer install
```

* Run grav install to install plugins and other stuff

```bash
php bin/grav install
```

* Install npm dependencies. You need to execute it in the folder where the `package.json` file is located.

```bash
npm install
```

## Run PHP built-in web server

```
php -S localhost:8000 system/router.php  
```

## Add a new user

```
php -f bin/plugin login newuser
```

## Webpack instructions

## Execute webpack

  ```bash
  cd user/themes/mytheme && npm run dev | build
  ```

## Add landing_commader

  ```bash
  npm install @bysidecar/landing_commander@x.x.x
  ```

## Notes

* Create `scss` and `js` resources into `code` folder. When webpack is running, `js` files are created under `js` folder.

* Add these files as a resource is needed. In the head of the document, add with the correct paths and names.

  ```js
  {% do assets.addJs('theme://js/bysidecar.js') %}

  {% do assets.addCss('theme://assets/main.css') %}
  ```

* In development mode, when execute `npm run dev` no `css` files are created. Instead, these resources are injected directly to DOM with `styles-loader` library.

* In production mode, using Mini CSS Extract Plugin to externalise the CSS. This file is created into custom theme assets folder.

* To use `landing-commander` library, a `.npmrc` file is needed.

* In `eslintrc.json` file slint rules are setted.

* Don't forget to run `npm install` when the project is started. You need to execute it in the folder where the `package.json` file is located.

## Steps after deploying in prod environment

* These are some steps to consider after deploying the project in prod environment
  
In admin panel, go to `Configuration > Security` and add to `Whitelist Permissions` the value `admin.pages`