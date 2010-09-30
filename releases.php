<?php
/*
Template Name: Release
*/
?>
<?php get_header(); ?>

 <!-- Start the Loop. -->
 <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    	<?php
        	$intro = get_post_meta($post->ID, "hh_intro", true);
			echo $intro;
		?>
	<div class="release">
		<h2>Release Archive</h2>        
		<div class="grid_2 alpha">
            <ul class="archive">	
				<?php hh_generate_archive(52, $post->ID); // 52 = Technology page id ?>
            </ul>
        </div>
        
        <div class="grid_4 omega">
        	<?php the_content(); ?>     
        </div>
        <div class="clear"></div>
	</div>

 <!-- REALLY stop The Loop. -->
 <?php endwhile;endif; ?>


<?php get_footer(); ?>