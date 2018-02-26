<template>
  <div class="container">
    <div class="left-fixed">
      <div data-ix="logo-display-none" data-spirit-id="logo" class="left-fixed-nav-logo">
        <v-link href="/" class="navigation-link---design w--current releases-btn"><img src="/dist/content/images/vwp_logo_banner.png" width="130" class="logo"></v-link>
      </div>
      <div data-ix="project-load-animation-nav" class="left-fixed-nav-top">
        <div data-ix="show-nav-strikethrough" class="nav-link-container">
          <v-link href="/forest-bees" class="navigation-link---design w--current releases-btn">Forest Bees.</v-link>
        </div>
        <div data-ix="show-nav-strikethrough-profile" class="nav-link-container">
          <v-link href="/events" class="navigation-link---design w--current releases-btn">Events.</v-link>
        </div>
      </div>
      <div data-ix="project-load-animation-nav" class="left-fixed-nav-bottom">
        <a href="mailto:helloforestbees@gmail.com?subject=Venerable%20Wax%20President" class="social-media-link-block w-inline-block">
          <img src="/dist/content/images/email.svg" width="18"></a>
        <a href="https://www.instagram.com/venerablewaxpresident" target="_blank" class="social-media-link-block w-inline-block">
          <img src="/dist/content/images/instagram.svg" width="18"></a>
        <a target="_blank" href="https://www.facebook.com/venerablewaxpresident" class="social-media-link-block w-inline-block">
            <img src="/dist/content/images/facebook.svg" width="20">
          </a>
        </div>
      </div>
    <!-- <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/about">About</v-link>
      </li>
    </ul> -->

    <slot></slot>
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'

  export default {
    components: {
      VLink
    }
  }
</script>
