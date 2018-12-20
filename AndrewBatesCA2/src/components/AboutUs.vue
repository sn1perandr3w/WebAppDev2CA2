<template>
  <div class="hero">


    <b-card bg-variant="dark">
      <h3 class="vue-title"><i class="fa fa-info" style="padding: 3px"></i>{{messagetitle}}</h3>
      <p>What is this web app and why is it here?</p>
      <p>This web app was developed for Web App Development 2 Assignment 2, due on the 20th of December, 2018.<br>
      It was developed as a web app to facilitate the hosting of tournaments for various fighting games such as <br>
      Tekken, Soul Calibur, Street Fighter, whatever the user chooses. It is designed to work with a backend application <br>
      which sends and receives information on both Tournaments and Users to a MongoDB instance hosted on Mlab.
      <br><br>
      The application was developed by  <a href="https://github.com/sn1perandr3w">Andrew Bates (Student No: 20075908)</a> <br>
        Contact me at Sn1perandr3w@gmail.com or 20075908@mail.wit.ie <br> <br>
        Made using code provided by <a href="https://ddrohan.github.io/">David Drohan</a></p>
    </b-card>

  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data () {
    return {
      messagetitle: ' Information '
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
