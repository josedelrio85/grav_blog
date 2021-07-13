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

### Execute webpack

  ```bash
  cd user/themes/mytheme && npm run dev | build
  ```

### Add landing_commader

  ```bash
  npm install @josedelrio85/landing_commander@x.x.x
  ```

## Notes

* Create `scss` and `js` resources into `code` folder. When webpack is running, `js` files are created under `js` folder.

* Add these files as a resource is needed. In the head of the document, add with the correct paths and names.

  ```js
  {% do assets.addJs('theme://js/josedelrio85.js') %}

  {% do assets.addCss('theme://assets/main.css') %}
  ```

* In development mode, when execute `npm run dev` no `css` files are created. Instead, these resources are injected directly to DOM with `styles-loader` library.

* In production mode, using Mini CSS Extract Plugin to externalise the CSS. This file is created into custom theme assets folder.

* To use `landing-commander` library, a `.npmrc` file is needed.

* In `eslintrc.json` file slint rules are setted.

* Don't forget to run `npm install` when the project is started. You need to execute it in the folder where the `package.json` file is located.

* Now there is a folder under `/user` called `/localhost`. Inside this folder there is configuration for development environment. You should use `http://localhost:port` as route to can use its parameters.

* Manage icomoon `css` file. This path project changes between dev (/) and prod environment (/blog). Because of this reason, the references to icomoon files are different between environments. 
  To handle this situation, in `webpack.config.js` use `prependData` property in `sass-loader` config array to join the file for dev environment needed to see the icons and the resources from icomoon in dev environment.
  
  IMPORTANT! In `webpack.config.js` => `sass-loader` section, if you use Windows system, use the `prependData` commented line.

## Steps after deploying in prod environment

There are some steps to consider after deploying the project in prod environment
  
* In admin panel, go to `Configuration > Security` and add to `Whitelist Permissions` the value `admin.pages`

* ADVISE: to allow correct function in `admin` plugin, do not change this entry in `system.yaml`:

  ```yaml
  session:
    enabled: true
    initialize: true
    timeout: 1800
    name: grav-site
    uniqueness: path
    secure: false
    httponly: true
    split: true
    path: null
  ```