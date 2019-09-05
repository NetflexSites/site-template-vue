<?

namespace Helpers;

use NF;
use Tightenco\Collect\Support\Collection;

class WebpackAssets {
  /** @type WebpackAssets */
  static private $instance = null;

  static public function getInstance () {
    if (static::$instance === null) {
      static::$instance = new static();
    }

    return static::$instance;
  }

  private $isLocal = null;

  private function __construct () {
    // TODO: Somehow figure out if it's local or not
    $this->isLocal = false;
  }

  private function getBasePath () {
    if ($this->isLocal) {
      return 'http://localhost:8080';
    } else {
      $domain = $GLOBALS['_domain'] ?? '';

      return "{$domain}/assets";
    }
  }

  private function getHash () {
    $hash = null;

    if (isset(NF::$config['deploy']) && isset(NF::$config['deploy']['id'])) {
      $hash = NF::$config['deploy']['id'];
    }

    return $hash ?? time();
  }

  private function getStylePath () {
    $basePath = $this->getBasePath();
    $hash = $this->isLocal
      ? ''
      : '?' . $this->getHash();

    return $basePath . '/css/' . "app.css" . $hash;
  }

  private function getAppPath () {
    $basePath = $this->getBasePath();
    $hash = $this->isLocal
      ? ''
      : '?' . $this->getHash();
    $jsInfix = $this->isLocal ? '' : '/js';

    return $basePath . $jsInfix . '/app.js' . $hash;
  }

  private function getChunkVendorsPath () {
    $basePath = $this->getBasePath();
    $hash = $this->isLocal
      ? ''
      : '?' . $this->getHash();
    $jsInfix = $this->isLocal ? '' : '/js';

    return $basePath . $jsInfix . '/chunk-vendors.js' . $hash;
  }

  function getHeadAssets () {
    $stylePath = $this->getStylePath();
    $appPath = $this->getAppPath();
    $chunkVendorsPath = $this->getChunkVendorsPath();

    $tags = new Collection();

    $tags->push("<link href=\"{$appPath}\" rel=\"preload\" as=\"script\">");

    if (!$this->isLocal) {
      $tags->push("<link href=\"{$chunkVendorsPath}\" rel=\"preload\" as=\"script\">");

      $tags->push("<link href=\"{$stylePath}\" rel=\"stylesheet\">");
    }

    return $tags->join("\n");
  }

  function getBodyAssets () {
    $appPath = $this->getAppPath();
    $chunkVendorsPath = $this->getChunkVendorsPath();

    $tags = new Collection();

    $tags->push("<script src=\"{$appPath}\"></script>");

    if (!$this->isLocal) {
      $tags->push("<script src=\"{$chunkVendorsPath}\"></script>");
    }

    return $tags->join("\n");
  }
}
