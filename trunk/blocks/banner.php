<div id="cover">
	<div class="shadow"></div>
    <div class="container_6">
        <div class="grid_6">
            <div id="login">
                <img src="<?php bloginfo('template_directory'); ?>/media/images/square.png" alt="" />
                <ul>
                    <li class="first"><a href="#sign-in" id="button-login">Login</a></li>
                    <li><a href="#" rel="external">Sign Up</a></li>
                </ul>
                <form id="sign-in" action="">
                	<fieldset>
                    	<legend>Sign In form</legend>
                        <h2>Sign In</h2>
						<label for="username">Username</label>
                        <input type="text" name="username" id="username" /><br />
						<label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                        <input type="submit" name="submit" id="submit" value="Login" />
                        <div class="action"><a href="#">Login</a></div>
                        <p>Not on Hello Health? <a href="#">Join Today</a></p>
                        <p class="last">Lost your password? <a href="#">Reset Password</a></p>                       
                    </fieldset>
                </form>
                <div class="shadow"></div>
            </div>
        </div>
	</div>
    <div id="banner" class="container_6">
    	<?php
        	$bannerHTML = get_post_meta($post->ID, "helloHealth_bannerHTML", true);
			echo $bannerHTML;
		?>
    </div><!-- end of #banner -->
</div><!-- end of #cover -->