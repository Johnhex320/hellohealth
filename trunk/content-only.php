<?php
/*
Template Name: Content only (without header and footer)
*/
?>
<!-- Start the Loop. -->
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php the_content(); ?>

<!-- REALLY stop The Loop. -->
<?php endwhile;endif; ?>