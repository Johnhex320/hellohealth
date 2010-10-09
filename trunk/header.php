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
 
 	define("SUPPORT_POST_ID",374);
 
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
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/reset.css" />
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/grid.css" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<!--[if lt IE 9]<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/media/css/ie.css" /><![endif]-->
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<?php
	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>

<body <?php echo hh_body_ID(); ?> <?php body_class(); ?>>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/media/js/init.js"></script>

<h1 class="seo">Hello Health</h1>
<div id="header">
    <div id="header-wrapper" class="container_6">
        <div class="grid_6">
			<?php hh_page_menu('header','navigation-primary','menu',1); ?>
            <img id="logo" src="<?php bloginfo('template_directory'); ?>/media/images/logo-hello-health.png" alt="Hello Health logo" />

           	<?php if (hh_get_root_parent($post->ID) == SUPPORT_POST_ID) : ?>
			<form id="search-form" name="search-form" role="search" action=" action="<?php bloginfo('url'); ?>">
				<fieldset>
                	<legend>Search Site form</legend>
						<label class="screen-reader-text" for="search-primary">Search:</label>
        				<input type="text" value="" name="s" id="search-primary" />
        				<input type="submit" id="search-submit" value="Search" />
                </fieldset>
    		</form>
			<?php endif; ?>
        </div>
        <div class="clear"></div>
    </div>
</div>

<?php get_template_part('blocks/banner'); ?>

<div class="clear"></div>

<div id="content-shadow" class="shadow"></div>
<div id="content">
    <div class="container_6">