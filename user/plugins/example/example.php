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
   * Use it in twig file with {{example()}} {{custom_routes(route)}}
   * Use it in md file with:
   * process:
   *   twig: true
  */
  public function onTwigExtensions(){
    require_once(__DIR__.'/twig/ExampleTwigExtension.php');
    require_once(__DIR__.'/twig/CustomRoutesExtension.php');
    $this->grav['twig']->twig->addExtension(new ExampleTwigExtension());
    $this->grav['twig']->twig->addExtension(new CustomRoutesExtension());
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
    $incorrect = ["UNKNOWN"];
    if (in_array($ip, $incorrect)) {
      $ip = "127.0.0.1";
    }
    $this->grav['twig']->twig_vars['plugin_ip'] = $ip;

    $path = $uri->path();
    $canonical = null;
    if(stripos($path, 'category:')){
      $canonical = '<link rel="canonical" href="https://www.ofertasvirgin.es/blog/" />';
    }
    $this->grav['twig']->twig_vars['canonical'] = $canonical;

  }
}