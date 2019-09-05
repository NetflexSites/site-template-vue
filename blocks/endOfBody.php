<?php

use Helpers\WebpackAssets;

?>
<?= WebpackAssets::getInstance()->getBodyAssets(); ?>

<?= get_codeinject_bodyclose(); ?>

<?= $GLOBALS['edit_tools'] ?? null; ?>
