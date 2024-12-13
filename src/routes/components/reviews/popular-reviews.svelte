<script>
    import { onMount } from "svelte";

    // Function to make horizontal scroll draggable
    // @ts-ignore
    function makeHorizontalDraggable(containers) {
        // @ts-ignore
        containers.forEach((container) => {
            let isDragging = false;
            // @ts-ignore
            let startX;
            // @ts-ignore
            let scrollLeft;

            // @ts-ignore
            container.addEventListener("mousedown", (e) => {
                isDragging = true;
                container.classList.add("active");
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                container.style.cursor = "grabbing";
            });

            container.addEventListener("mouseleave", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            container.addEventListener("mouseup", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            // @ts-ignore
            container.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                // @ts-ignore
                const walk = (x - startX) * 2;
                // @ts-ignore
                container.scrollLeft = scrollLeft - walk;
            });
        });
    }

    // Function to make vertical scroll draggable
    // @ts-ignore
    function makeVerticalDraggable(containers) {
        // @ts-ignore
        containers.forEach((container) => {
            let isDragging = false;
            // @ts-ignore
            let startY;
            // @ts-ignore
            let scrollTop;

            // @ts-ignore
            container.addEventListener("mousedown", (e) => {
                isDragging = true;
                container.classList.add("active");
                startY = e.pageY - container.offsetTop;
                scrollTop = container.scrollTop;
                container.style.cursor = "grabbing";
            });

            container.addEventListener("mouseleave", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            container.addEventListener("mouseup", () => {
                isDragging = false;
                container.classList.remove("active");
                container.style.cursor = "grab";
            });

            // @ts-ignore
            container.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const y = e.pageY - container.offsetTop;
                // @ts-ignore
                const walk = (y - startY) * 2;
                // @ts-ignore
                container.scrollTop = scrollTop - walk;
            });
        });
    }

    // Set initial scroll positions
    function setInitialScrollPositions() {
        const scrollContainers = document.querySelectorAll(".scroll-container");
        if (scrollContainers[0]) scrollContainers[0].scrollTop = 50;
        if (scrollContainers[1]) scrollContainers[1].scrollTop = 140;
    }

    // Use onMount lifecycle to initialize
    onMount(() => {
        const horizontalContainers = document.querySelectorAll(
            ".horizontal-scroll-container"
        );
        const verticalContainers = document.querySelectorAll(".scroll-container");

        makeHorizontalDraggable(horizontalContainers);
        makeVerticalDraggable(verticalContainers);
        setInitialScrollPositions();
    });
</script>



<!-- Review Section -->
<section class="section review-section pt-0 pb-0">
    <div class="container">

        <div class="columns is-gapless horizontal-reviews">
            <div class="column pt-6" style="width: 100%;">
                <h3 class="title is-3 has-text-left pt-6">Popular reviews</h3>
                <div class="horizontal-scroll-container">
                    <!-- Add your horizontal review cards here -->
                    <!-- Card 1 -->
                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>

                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>

                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>

                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>


                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>



                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>





                    <!-- Add more review cards as needed -->
                </div>
            </div>
        </div>

        <div class="columns is-gapless hide-mobile">
            <!-- First Column (Header Text Only) -->
            <div class="column">
                <div class="columns">
                    <div class="column pt-6">
                        <h3 class="title is-3 has-text-left pt-6">Popular reviews</h3>
                    </div>
                </div>
            </div>
            <!-- Second Column (Scroll Container 1) -->
            <div class="column">
                <div class="scroll-container custom-padding-right">
                    <!-- Card 1 -->
                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>
                    <!-- Add more cards as needed -->


                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>


                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>


                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>
                </div>
            </div>

            <!-- Third Column (Scroll Container 2) -->
            <div class="column">
                <div class="scroll-container custom-padding-left">
                    <!-- Card 1 -->
                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>
                    <!-- Add more cards as needed -->


                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>
                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>

                    <div class="card review-card">
                        <div class="card-content review-card-content">
                            <div class="review-header">
                                <div class="review-user">
                                    <!-- User Avatar -->
                                    <img class="avatar" src="/assets/avatar.png" alt="User Avatar" />
                                    <div class="user-info">
                                        <!-- User Name and Rating -->
                                        <h5 class="name">Alice Palmer</h5>
                                        <p class="rating">
                                            4.9 <span class="star">★</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="meta-info">
                                    <!-- Location Icon -->
                                    <i class="fa fa-map-marker-alt location-icon"></i>
                                    <span class="meta-location">USA</span>
                                    <!-- Date Below -->
                                    <p class="meta-date">1 day ago</p>
                                </div>
                            </div>
                            <div class="is-divider"></div>
                            <!-- Review Title -->
                            <h4 class="review-title">GoDaddy</h4>
                            <!-- Review Text -->
                            <p class="review-text">
                                Good service. Been looking for a similar one for a long time. Good service. Been looking for a similar one
                                for a long time. Good service.
                            </p>
                            <div class="review-footer">
                                <p class="likes">
                                    <i class="fas fa-heart"></i>
                                    <span>23</span>
                                </p>
                                <p class="share">
                                    <i class="fas fa-share-alt"></i>
                                </p>
                            </div>
                        </div>                            
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<style>

/* ========================================
   Review Section Page Styling Starts Here
======================================== */

.custom-padding-left{
        padding-left:2.5%!important;
    }
    .custom-padding-right{
        padding-right:2.5%!important;
    }

    .review-card {
        flex: 0 0 calc(33.33% - 20px);
    }

    .horizontal-scroll-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        cursor: grab; /* Change cursor to indicate draggable */
        scroll-behavior: smooth; /* Optional: smooth scrolling */
        gap: 10px; /* Spacing between cards */
        -ms-overflow-style: none; /* Hides scrollbar in IE and Edge */
        scrollbar-width: none; /* Hides scrollbar in Firefox */
        user-select: none;
    }

    .horizontal-scroll-container.active {
        user-select: none; /* Disable text selection while dragging */
    }

    .horizontal-scroll-container::-webkit-scrollbar {
        display: none;
    }
  
    .horizontal-scroll-container .review-card {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        width: calc(33.33% - 20px);
    }


    .horizontal-reviews{
        display: none!important;
    }

    @media screen and (max-width: 980px) {
        .review-card {
            flex: 0 0 calc(70% - 20px);
        }

        .horizontal-reviews{
            display: flex!important;
        }

        .hide-mobile {
        display: none!important;
        }

    }

    @media screen and (max-width: 768px) {
        .review-card {
            flex: 0 0 calc(70% - 20px);
        }

        .horizontal-reviews{
            display: flex!important;
        }

        .hide-mobile {
        display: none!important;
        }

    }





/* Scroll Container */
.scroll-container {
    max-height: 700px; /* Adjust as needed */
    overflow-y: scroll; /* Enable vertical scrolling */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    cursor: grab; /* Change cursor to indicate draggable */
    user-select: none;
}

.scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

/* Card Styles for Reviews Start */
.review-card {
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.03);
    padding: 1rem;
    margin-bottom: 5%;
    background-color: #ffffff;
}

.review-card-content{
    padding:2%!important;
}

/* Header Section */
.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.review-user {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.8rem;
}

.user-info .name {
    font-size: 1rem;
    margin: 0;
}

.user-info .rating {
    font-size: 0.9rem;
    color: #ffd342;
    margin: 0;
}

.meta-info {
    text-align: right;
}

.location-icon {
    font-size: 0.9rem;
    color: #949494;
    margin-right: 5px;
}

.meta-location {
    font-size: 0.9rem;
    font-weight: normal;
    color: #949494;
}

.meta-date {
    font-size: 0.8rem;
    color: #999;
    margin-top: 2px;
}


.is-divider{
    margin:1rem 0!important;
}

.review-title {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    font-weight: 500!important;
    text-decoration: underline;
}

.review-text {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #8b8a8f;
    margin-bottom: 1rem;
}

.review-footer {
    display: flex;
    align-items: center; /* Vertically center the icons and text */
    font-size: 0.9rem;
    color: #555;
}

.likes, .share {
    display: flex;
    align-items: center;
    margin-right: 1rem; /* Space between the like and share sections */
}

.likes i, .share i {
    margin-right: 8px; /* Add space between the icon and text */
}

.likes span {
    margin-left: 5px; /* Add space between the icon and the number 23 */
}
.fa, .fas {
    color: unset!important;
}

.likes {
    color: #ff6b6b!important; /* Heart color */
}

.share {
    color: #4a90e2!important; /* Share icon color */
}
/* Card Styles for Reviews End */





/* Reviews about us Section Start */

.review-section {
    background-color: #ffffff;
}

.reviews-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;
  }
  
  /* Reviews about us Section End */



</style>