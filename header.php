<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;

	wp_title( '|', true, 'right' );

	// Add the blog name.
	bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );

	?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<!--<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />-->
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/reset.css" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/grid.css" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/base.css" />
<!--[if lt IE 9]<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/ie.css" /><![endif]-->
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<?php
	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>

<body <?php echo dynamicBodyID(); ?> <?php body_class(); ?>>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/init.js"></script>
<!--
<div id="wrapper" class="hfeed">
	<div id="header">
		<div id="masthead">
			<div id="branding" role="banner">
				<?php $heading_tag = ( is_home() || is_front_page() ) ? 'h1' : 'div'; ?>
				<<?php echo $heading_tag; ?> id="site-title">
					<span>
						<a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
					</span>
				</<?php echo $heading_tag; ?>>
				<div id="site-description"><?php bloginfo( 'description' ); ?></div>

				<?php
					// Check if this is a post or page, if it has a thumbnail, and if it's a big one
					if ( is_singular() &&
							has_post_thumbnail( $post->ID ) &&
							( /* $src, $width, $height */ $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'post-thumbnail' ) ) &&
							$image[1] >= HEADER_IMAGE_WIDTH ) :
						// Houston, we have a new header image!
						echo get_the_post_thumbnail( $post->ID, 'post-thumbnail' );
					else : ?>
						<img src="<?php header_image(); ?>" width="<?php echo HEADER_IMAGE_WIDTH; ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="" />
					<?php endif; ?>
			</div>
            -->
            <!-- #branding -->

<!--
			<div id="access" role="navigation">
			  <?php /*  Allow screen readers / text browsers to skip the navigation menu and get right to the good stuff */ ?>
				<div class="skip-link screen-reader-text"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'twentyten' ); ?>"><?php _e( 'Skip to content', 'twentyten' ); ?></a></div>
				<?php /* Our navigation menu.  If one isn't filled out, wp_nav_menu falls back to wp_page_menu.  The menu assiged to the primary position is the one used.  If none is assigned, the menu with the lowest ID is used.  */ ?>
				<?php wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) ); ?>
			</div>-->
            <!-- #access -->
		<!--</div>-->
        <!-- #masthead -->
	<!--</div>-->
    <!-- #header -->

<!--	<div id="main"> -->

<h1 class="seo">Hello Health</h1>
<div id="header">
    <div id="header-wrapper" class="container_6">
        <div class="grid_6">
            <img id="logo" src="media/images/logo-hello-health.png" alt="Hello Health logo" />
            <ul id="navigation-primary" class="menu">
            	<li class="first"><a href="index.html" rel="index" title="">Home</a><span></span></li>
                <li><a href="why.html" rel="section" title="">Why Hello Health</a></li>
                <li><a href="how.html" rel="section" title="">How Physicians use Hello Health?</a></li>
                <li><a href="technology.html" rel="section" title="">Technology</a></li>
                <li><a href="started.html" rel="section" title="">Get Started</a></li>
                <li class="last"><a href="university.html" rel="section" title="">Hello Health University</a></li>
            </ul>
		</div>
        <div class="clear"></div>
    </div>
</div>

<?php get_template_part('blocks/banner'); ?>

<div class="shadow"></div>
<div id="content">
    <div class="container_6">