<?php
require_once '../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use EVFramework\Container\BaseBuilder as ContainerBuilder;
use Pyrite\Routing\RouteCollectionBuilder as RouteCollectionBuilder;
use Pyrite\Routing\Director as RouterDirector;
use Pyrite\Routing\RouteConfigurationBuilderI18n;
use Pyrite\Routing\RouteConfigurationBuilderImpl;
use Pyrite\Kernel\PyriteKernel as PyriteKernel;

date_default_timezone_set('Europe/Paris');

define('ROOT_DIR', dirname(__DIR__));

// We use the compiled version of the configuration
// If you want to compile the configuration you should run compile.php
// In dev env you can use grunt to automate this. Run grunt and a compiled version of the configuration will be created.
// Grunt will also watch for changes in the configuration and will recompile if needed
$routingPath   = '../config/routing/route.yml';
$containerPath = '../config/container/container.yml';

$request  = Request::createFromGlobals();
$container = ContainerBuilder::build($request, $containerPath);

try {
    $routerDirector = new RouterDirector($request, $routingPath);
    $routerBuilder = new RouteConfigurationBuilderImpl();
    $routeConfiguration = $routerDirector->build($routerBuilder);
    $container->bind('UrlGenerator', $routeConfiguration->getUrlGenerator());
}
catch(\Exception $e) {
    var_dump($e);
    trigger_error($e->getMessage(), E_USER_ERROR);
    exit(1);
}

PyriteKernel::boot($request, $routeConfiguration->getRouteCollection(), $container);

