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
			
			foreach ($members as $memberId => $member) {
		?>
            <div class="grid_2 team">
				<?php echo $member->post_content; ?>		
            </div>
      <?php } ?>
		</div>
        
        <script>
			$(function() {
				var $hhMembers = $("#members .grid_2");
				if ($hhMembers.length) {
					$.setClassToNthPosition($hhMembers,3,"omega");
					$.setClassToNthPosition($hhMembers,4,"alpha");
					$($hhMembers[0]).addClass("alpha");
				}
			});
		</script>
    
 <!-- REALLY stop The Loop. -->
 <?php endwhile;endif; ?>


<?php get_footer(); ?>