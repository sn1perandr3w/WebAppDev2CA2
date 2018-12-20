<template>
  <div id="app1" class="hero">
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">


            <div class="form-group">
              <label class="form-control-label" name="organizer">Organizer Name</label>
              <input class="form__input" type="string" v-model.trim="organizer"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="game">Game</label>
              <input class="form__input" type="string" v-model.trim="game"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="date">Date</label>
              <input class="form__input" type="string" v-model.trim="date"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="time">Time</label>
              <input class="form__input" type="string" v-model.trim="time"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="buyIn">Buy In Price</label>
              <input class="form__input" type="number" v-model.trim="buyIn"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="prize">Prize</label>
              <input class="form__input" type="number" v-model.trim="prize"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="location">Location</label>
              <input class="form__input" type="string" v-model.trim="location"/>
            </div>


            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Create Tournament</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Tournament Created!</p>
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
    name: 'Tournament',
    data () {
      return {
        organizer: '',
        game: '',
        date: '',
        time: '',
        buyIn: 0,
        prize: 0,
        tournament: {},
        submitStatus: null
      }
    },
    validations: {
      organizer: {
        required
      },
      game: {
        required
      },
      date: {
        required
      },
      time: {
        required
      },
      buyIn: {
        required
      },
      prize: {
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
            var tournament = {
              organizer: this.organizer,
              game: this.game,
              date: this.date,
              time: this.time,
              buyIn: this.buyIn,
              prize: this.prize,
            }
            this.tournament = tournament
            console.log('Submitting in TournamentForm : ' + JSON.stringify(this.tournament, null, 5))
            this.submitTournament(this.tournament)
          }, 500)
        }
      },
      submitTournament: function (tournament) {
        console.log('submitTournament!')
        console.log('Submitting in submitTournament : ' + tournament)
        TournamentService.postTournament(tournament)
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
