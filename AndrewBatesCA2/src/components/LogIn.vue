<template>
  <div id="app1" class="hero">
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">


            <div class="form-group">
              <label class="form-control-label" name="Username">Username</label>
              <input class="form__input" type="string" v-model.trim="username"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="Password">Password</label>
              <input class="form__input" type="string" v-model.trim="password"/>
            </div>



            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Log In</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'"></p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">PError</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Logging in...</p>
          </form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueForm from 'vueform'
  import Vuelidate from 'vuelidate'
  import VueSweetalert from 'vue-sweetalert'
  import TournamentService from '@/services/TournamentService'
  import { required } from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  })

  Vue.use(Vuelidate)
  Vue.use(VueSweetalert)

  export default {
    name: 'Account',
    data () {
      return {
        username: '',
        password: '',
        account: {},
        submitStatus: null
      }
    },
    validations: {


      username: {
        required
      },
      password: {
        required
      }
    },
    methods: {
      submit () {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'

            TournamentService.fetchAccount(this.username)
              .then(response => {
                // JSON responses are automatically parsed.
                this.account = response.data
                console.log('ACCOUNT RESPONSE: ' + JSON.stringify(this.account, null, 5))
                console.log('TESTING1: ' + JSON.stringify(this.password, null, 5))
                console.log("TESTING 2" + JSON.stringify(this.account[0].username,null,5))

                if(this.username === this.account[0].username && this.password === this.account[0].password) {
                  console.log('MATCH FOR USERNAME AND PASSWORD : ' + JSON.stringify(this.account, null, 5))
                  this.login(this.username)
                }else{console.log('NO MATCH')}

              })


          }, 500)
        }
      },
      login: function (username) {
        this.$router.params = username
        this.$router.push('Account')
      },

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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .donate-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
