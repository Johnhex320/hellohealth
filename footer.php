<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content
 * after.  Calls sidebar-footer.php for bottom widgets.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */
?>
	<!--</div>-->
    <!-- #main -->

<!--
	<div id="footer" role="contentinfo">
		<div id="colophon">

<?php
	/* A sidebar in the footer? Yep. You can can customize
	 * your footer with four columns of widgets.
	 */
	get_sidebar( 'footer' );
?>

			<div id="site-info">
				<a href="<?php echo home_url( '/' ) ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<?php bloginfo( 'name' ); ?>
				</a>
			</div>
            -->
            <!-- #site-info -->

<!--
			<div id="site-generator">
				<?php do_action( 'twentyten_credits' ); ?>
				<a href="<?php echo esc_url( __('http://wordpress.org/', 'twentyten') ); ?>"
						title="<?php esc_attr_e('Semantic Personal Publishing Platform', 'twentyten'); ?>" rel="generator">
					<?php printf( __('Proudly powered by %s.', 'twentyten'), 'WordPress' ); ?>
				</a>
			</div>
            -->
            <!-- #site-generator -->

		<!--</div>-->
        <!-- #colophon -->
	<!--</div>-->
    <!-- #footer -->

<!--</div>-->
<!-- #wrapper -->
		<div class="clear"></div>
	</div><!-- end container 6 of #content-->
</div><!-- end of #content-->

<div class="shadow shadow-up"></div>
<div id="footer">
    <div class="container_6 inner">
        <div class="grid_4 alpha">
        	<ul id="social">
            	<li><a href="http://www.facebook.com/hellohealthprofessionals" rel="external" class="facebook">Facebook</a></li>
                <li><a href="http://twitter.com/hellohealth" rel="external" class="twitter">Twitter</a></li>
            </ul>
            <div class="clear"></div>
            <?php hh_page_menu('patients_physicians', 'footer', 'navigation-secondary', '', 0); ?>
            <!--
            <ul id="navigation-secondary">
            	<li><a href="contact.html" rel="section" title="">Contact Us</a></li>
                <li><a href="about.html" rel="section" title="">About Hello Health</a></li>
                <li><a href="#" rel="section" title="">Careers</a></li>
                <li><a href="#" rel="section" title="">Privacy</a></li>
                <li><a href="#" rel="section" title="">Terms &amp; Conditions</a></li>
            </ul>
            -->
        </div>
        <div class="grid_2 alpha">
        	<span>Hello Health</span>
            <p>&copy; <?php echo date("Y"); ?> Hello Health.  All rights reserved</p>
        </div>
        <div class="clear"></div>
    </div>
</div>

<?php
	/* Always have wp_footer() just before the closing </body>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to reference JavaScript files.
	 */

	wp_footer();
?>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/cufon-yui.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/din_400.font.js?v=1"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/plugins.js?v=1"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/base.js?v=1"></script>
</body>
</html>
