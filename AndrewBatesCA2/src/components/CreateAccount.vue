<template>
  <div id="app1" class="hero">
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">


            <div class="form-group">
              <label class="form-control-label" name="Name">Name</label>
              <input class="form__input" type="string" v-model.trim="name"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="organizer">Email</label>
              <input class="form__input" type="string" v-model.trim="email"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="organizer">Password</label>
              <input class="form__input" type="string" v-model.trim="password"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="organizer">Username</label>
              <input class="form__input" type="string" v-model.trim="username"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="organizer">Nationality</label>
              <input class="form__input" type="string" v-model.trim="nationality"/>
            </div>


            <div class="form-group">
              <label class="form-control-label" name="organizer">Team</label>
              <input class="form__input" type="string" v-model.trim="team"/>
            </div>


            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Create Account</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Account Created!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Creating...</p>
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
        name: '',
        email: '',
        password: '',
        username: '',
        nationality: '',
        team: '',
        account: {},
        submitStatus: null
      }
    },
    validations: {
      name: {
        required
      },
      email: {
        required
      },
      password: {
        required
      },
      username: {
        required
      },
      nationality: {
        required
      },
      team: {
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
            var account = {
              name: this.name,
              email: this.email,
              password: this.password,
              username: this.username,
              nationality: this.nationality,
              team: this.team,
            }
            this.account = account
            console.log('Submitting in TournamentForm : ' + JSON.stringify(this.tournament, null, 5))
            this.submitAccount(this.account)
          }, 500)
        }
      },
      submitAccount: function (account) {
        console.log('submitAccount!')
        console.log('Submitting in submitAccount : ' + account)
        TournamentService.postAccount(account)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
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
