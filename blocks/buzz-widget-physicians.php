        <div id="buzz" class="grid_6">
            <div class="inner">
                <h2>Latest Buzz</h2>
				<?php 
					$rootPostName = hh_get_root_parent($post->ID, 1);
					$rootCatId = get_cat_ID($rootPostName);
					$firstPost = hh_get_posts_by_category($rootCatId, 1);
					
					foreach($firstPost as $thePost) {
						echo $thePost->post_title;	
					}
				?>
                <a href="#widget-buzz" title="" class="action-expand"><span>Open</span> Buzz dashboard</a>
            </div>
            <div class="clear"></div>
            <div class="shadow"></div>
        	<div id="widget-buzz" class="hide">
                <div class="content-outer">
                    <div class="shadow"></div>
                    <ul class="menu hide">
                        <li class="first"><a href="index.html" rel="index" title="">Home</a><span></span></li>
                        <li><a href="why.html" rel="section" title="">Why Hello Health</a></li>
                        <li><a href="how.html" rel="section" title="">How Physicians use Hello Health?</a></li>
                        <li class="last"><a href="university.html" rel="section" title="">Hello Health University</a></li>
                    </ul>
                    
                    <div class="content-inner"> 
                        <div class="shadow"></div>
                        <div class="content">
                            <div class="col first">
                                <h3>HelloHealth Blog</h3>
                                <span class="date hide">September 5, 2010</span>
                                <h4 class="hide">Meaningful Use</h4>
                                <span class="author hide">Dr. Gordon Moore MD</span> <span class="post-age hide">| 3 hours ago</span>
                                <p class="intro">
                                	To be announced
                                    <a href="#" class="more hide">Read more</a>.
                                </p>
                                <p class="comments hide">Comments <span>7</span></p>
                            </div>
                            <div id="buzz-content-secondary" class="col">
                            	<h3><a href="<?php echo get_permalink($thePost->ID); ?>" title="">What's New?</a></h3>
                                <span class="date"><?php echo mysql2date("F j, Y",$thePost->post_date); ?></span>
                            	<div class="figure">
									<?php echo $thePost->post_excerpt; ?>
                                    <div class="clear"></div>
                                    <a href="<?php echo get_permalink($thePost->ID); ?>" title="Read more for '<?php echo $thePost->post_title ?>'" class="more">Read more</a>
                                </div>
                            	<h3 class="pushUp">Events</h3>
                                <span class="date hide">September 5, 2010</span>
                                <p class="intro">
                                	To be announced.
                                </p>
                            </div>                            
                        	<div class="clear"></div>
                        </div>
                    </div>
        		</div>
                <div class="shadow shadow-bottom"></div>
            </div>
        </div>
        <div class="clear"></div>