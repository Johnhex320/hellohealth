<?php
/*
Template Name: About
*/
?>
<?php get_header(); ?>

 <!-- Start the Loop. -->
 <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php the_content(); ?>     

        <div class="clear"></div>
	
    	<div id="members">
    	<?php 
			$members = hh_get_page_children(98, "menu_order"); // 98 = Business card page 
			$i = 1;
			foreach ($members as $memberId => $member) {
				if ($i%3 == 1 && $i != 0) :
					$cssClass = "alpha";
					echo '<div class="clear"></div>';
				elseif ($i%3 == 0):
					$cssClass = "omega";
				else:
					$cssClass = "";
				endif;
		?>
            <div class="grid_2 team <?php echo $cssClass; ?>">
				<?php echo $member->post_content; ?>		
            </div>
      <?php 
	  			$i++;
			} 
		?>
		</div>
    
 <!-- REALLY stop The Loop. -->
 <?php endwhile;endif; ?>


<?php get_footer(); ?>