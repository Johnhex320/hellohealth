<div id="cover">
	<div class="shadow"></div>
    <div class="container_6">
        <div class="grid_6">
            <div id="login">
                <img src="<?php bloginfo('template_directory'); ?>/media/images/square.png" alt="" />
                <?php $rootPostName = hh_get_root_parent($post->ID,1); ?>
                <ul>
                    <li class="first"><a href="/<?php echo $rootPostName; ?>/login/">Login</a></li>
                   <?php
                   if ( strtoupper($rootPostName) == strtoupper("physicians") ) {
                   ?>
                    <li><a id="support-link" href="http://support.hellohealth.com/providers/" rel="external">Support</a></li>
                   <?php } else { ?>
                    <li><a id="support-link" href="http://support.hellohealth.com/patients/" rel="external">Support</a></li>
                   <?php } ?>
                </ul>
                <div class="shadow"></div>
            </div>
        </div>
	</div>
    <div id="banner" class="container_6">
    	<?php
        	$bannerHTML = get_post_meta($post->ID, "helloHealth_bannerHTML", true);
			echo $bannerHTML;
	
			if (strpos($bannerHTML,"<?php get_template_part('blocks/buzz-widget-".$rootPostName."'); ?>") > 0) :
				get_template_part('blocks/buzz-widget-'.$rootPostName);
			endif;
		?>
    </div><!-- end of #banner -->
</div><!-- end of #cover -->
