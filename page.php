<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

 <!-- Start the Loop. -->
 <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php the_content(); ?>

<?php
	/**************************************
	/* Put here pages sepcifics exceptions
	/**************************************/
?>	

<?php // Exception: Technology
	if ($post->ID == 52) : // 52 = technology page
	?>
		<script>$(function() { $("#dynamic-link").attr("href", "<?php hh_release_latest_link($post->ID); ?>"); });</script>
  	<?php
	endif;
?>

 <!-- REALLY stop The Loop. -->
 <?php endwhile;endif; ?>


<?php get_footer(); ?>