<div id="cover">
	<div class="shadow"></div>
    <div class="container_6">
        <div class="grid_6">
            <div id="login">
                <img src="<?php bloginfo('template_directory'); ?>/media/images/square.png" alt="" />
                <ul>
                    <li class="first"><a href="#sign-in" id="button-login">Login</a></li>
                    <li><a href="/support/" rel="external">Support</a></li>
                </ul>

                <div id="sign-in">
                   <iframe name="login" src="https://<?php echo PLATFORM_URL?>/LoginServlet/login.jsp" scrolling="no" allowtransparency="no" marginheight="0" marginwidth="0" frameborder="0" class="loginFrame"/></iframe>
                   <p>Not on Hello Health? <a href="/join">Join Today</a></p>
                   <p>Lost your password? <a href="/lostpassword">Lost Password</a></p>                       
                   <p class="last">Lost your username? <a href="/lostusername">Lost Username</a></p>                       
                </div>
<!-- 
                <form id="sign-in" action="">
                	<fieldset>
                    	<legend>Sign In form</legend>
                        <h2>Sign In</h2>
						<label for="username">Username</label>
                        <input type="text" name="username" id="username" class="text-field" /><br />
						<label for="password">Password</label>
                        <input type="password" name="password" id="password" class="text-field" />
                        <input type="submit" name="submit" id="submit" value="Login" />
                        <div class="action"><a href="#">Login</a></div>
                        <p>Not on Hello Health? <a href="/join">Join Today</a></p>
                        <p class="last">Lost your password? <a href="#">Reset Password</a></p>                       
                    </fieldset>
                </form>
-->
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
