<?php

namespace Grav\Plugin;

use \Grav\Common\Plugin;

class ExamplePlugin extends Plugin {
  
  public static function getSuscribedEvents() {
    return [
      'onTwigExtensions' => ['onTwigExtensions', 0],
      'onThemeInitialized' => ['onThemeInitialized', 0]
    ];
  }

  /** 
   * Use it in twig file with {{example()}} 
   * Use it in md file with:
   * process:
   *   twig: true
  */
  public function onTwigExtensions(){
    require_once(__DIR__.'/twig/ExampleTwigExtension.php');
    $this->grav['twig']->twig->addExtension(new ExampleTwigExtension());
  }

  /** 
   * Use it in twig file with {{plugin_ip}}
   * Use it in md file with:
   * process:
   *   twig: true
  */
  public function onThemeInitialized() {
    $uri = new \Grav\Common\Uri();

    $ip = $uri->ip();
    $this->grav['twig']->twig_vars['plugin_ip'] = $uri->ip();
  }
}