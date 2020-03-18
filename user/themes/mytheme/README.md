# Webpack instructions

## Execute webpack

  ```bash
  npm run dev | build
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

* Don't forget to run `npm install` when the project is started.

## Theme inherit and customization

* Under `/user/themes/` create a folder to store the new inherited and customized theme.

* From the parent theme, copy these files (clean-blog theme example), and rename it with the new theme name:

  * /user/themes/clean-blog/clean-blog.yaml => /user/themes/newtheme/newtheme.yaml
  
  * /user/themes/clean-blog/clean-blog.php  => /user/themes/newtheme/newtheme.php => change the class name

  * /user/themes/clean-blog/blueprints.yaml => /user/themes/newtheme/blueprints.yaml

* In `mytheme.yaml`, add the next code:

  ```yaml
  streams:
  schemes:
    theme:
      type: ReadOnlyStream
      prefixes:
        '':
          - user/themes/mytheme
          - user/themes/clean-blog
          - [other inherited themes]
  ```

* Finally, in `user/config/system.yaml`, modify the theme used.

  ```yaml
  pages:
    theme: mytheme
  ```

* To override a template from parent theme, just copy the file with the same folder structure and names.
