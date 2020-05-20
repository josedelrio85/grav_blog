<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Grav\Common\Uri;
class MyTheme extends Theme
{

  public static function getSubscribedEvents()
  {
    return [
      'onThemeInitialized' => ['onThemeInitialized', 0]
    ];
  }

  public function onThemeInitialized() {
    $uri = new \Grav\Common\Uri();

    $ip = $uri->ip();
    // var_dump($ip);
    // var_dump($uri->base());
  }
}
