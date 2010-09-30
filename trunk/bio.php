<?php
/*
Template Name: Biography
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
		<h2>Team Members</h2>        
		<div class="grid_2 alpha">
            <ul class="archive">	
				<?php hh_generate_archive(2, $post->ID); // 2 = about page id ?>
            </ul>
        </div>
        
        <div class="grid_4 omega">
        	<?php the_content(); ?>     
        </div>
        <div class="clear"></div>
	</div>
    
    <script>
		$("body").attr("id","about");
	</script>

 <!-- REALLY stop The Loop. -->
 <?php endwhile;endif; ?>


<?php get_footer(); ?>