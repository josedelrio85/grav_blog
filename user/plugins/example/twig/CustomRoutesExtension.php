<?php

namespace Grav\Plugin;

class CustomRoutesExtension extends \Twig_Extension {

  public function getName() {
    return 'CustomRoutesExtension';
  }

  public function getFunctions() {
    return [
      new \Twig_SimpleFunction('custom_routes', [$this, 'getCustomRoute'])
    ];
  }

  public function getCustomRoute(string $route) {
    $uri = new \Grav\Common\Uri();
    $query = $uri->query();
    if (!is_null($query) && $query != '') {
      $newroute = $route."?".$query;
    }else{
      $newroute = $route;
    }
    // var_dump($newroute);
    return "href=".$newroute;
  }
}