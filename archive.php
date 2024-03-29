<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

<?php
	/* Queue the first post, that way we know
	 * what date we're dealing with (if that is the case).
	 *
	 * We reset this later so we can run the loop
	 * properly with a call to rewind_posts().
	 */
	if ( have_posts() )
		the_post();
?>
			<div class="grid_4 alpha">
                <h2 class="page-title hide">
    <?php if ( is_day() ) : ?>
                    <?php printf( __( 'Daily Archives: <span>%s</span>', 'twentyten' ), get_the_date() ); ?>
    <?php elseif ( is_month() ) : ?>
                    <?php printf( __( 'Monthly Archives: <span>%s</span>', 'twentyten' ), get_the_date('F Y') ); ?>
    <?php elseif ( is_year() ) : ?>
                    <?php printf( __( 'Yearly Archives: <span>%s</span>', 'twentyten' ), get_the_date('Y') ); ?>
    <?php else : ?>
                    <?php _e( 'Blog Archives', 'twentyten' ); ?>
    <?php endif; ?>
                </h2>

<?php
	/* Since we called the_post() above, we need to
	 * rewind the loop back to the beginning that way
	 * we can run the loop properly, in full.
	 */
	rewind_posts();

	/* Run the loop for the archives page to output the posts.
	 * If you want to overload this in a child theme then include a file
	 * called loop-archives.php and that will be used instead.
	 */
	 get_template_part( 'loop', 'archive' );
	 
?>

		</div><!-- #grid_4 -->
		<div class="grid_2 omega">
			<?php get_sidebar(); ?>
        </div>    
        <div class="clear"></div>

<script>
	$("body").removeClass("archive").removeClass("date");

	$(function() {
		var bannerText = "<?php printf( __( 'Archives: <span>%s</span>', 'twentyten' ), get_the_date('F Y') ); ?>";
		$("#banner").append('<div class="grid_6 alpha"><h1>'+bannerText+'</h1></div><div class="clear"></div>');
	});
</script>            
<?php get_footer(); ?>
