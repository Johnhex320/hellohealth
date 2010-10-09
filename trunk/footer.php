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
            <?php hh_page_menu('footer', 'navigation-secondary', '', 0); ?>
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
