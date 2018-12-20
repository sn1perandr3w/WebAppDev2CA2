<template>
  <div id="app1">
    <b-card bg-variant="dark">
    <v-client-table :columns="columns" :data="account" :options="options">

    </v-client-table>
    </b-card>

      <b-card bg-variant="dark">
        <form @submit.prevent="addToBalance">


          <div class="form-group">
            <label class="form-control-label" name="name">Addition</label>
            <input class="form__input" type="number" v-model.trim="addition"/>
          </div>
          <p>
            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add to Balance</button>
          </p>
          <p class="typo__p" v-if="submitStatus === 'OK'">Balance added to!</p>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
        </form>
      </b-card>

    <b-card bg-variant="dark">
      <form @submit.prevent="removeFromBalance">


        <div class="form-group">
          <label class="form-control-label" name="name">Subtraction</label>
          <input class="form__input" type="number" v-model.trim="subtraction"/>
        </div>
        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Remove from Balance</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Balance removed from!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
      </form>
    </b-card>

    <b-card bg-variant="dark">
      <form @submit.prevent="removeAccount">
        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Delete Account</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Balance removed from!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
      </form>
    </b-card>


  </div>

</template>

<script>
  import TournamentService from '@/services/tournamentservice'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'


  export default {
    data () {
      return {
        accountID: null,
        account:{},
        columns: ['name','username','nationality','team','balance'],
        temp:{},
        messagetitle: 'Displaying Account ',
        options: {
          headings: {
            _id: 'ID',

          },
          filterable: []
        },

        name:'',
        username:'',
        nationality:'',
        team:'',
        addition:0,
        subtraction:0

      }
    },
    created () {
      this.loadAccount()
    },
    methods: {
      loadAccount: function () {
        TournamentService.fetchAccount(this.$router.params)
          .then(response => {
            // JSON responses are automatically parsed.
            this.account = response.data
            this.accountID = this.account[0]._id
            this.accountName = this.$router.params
            console.log(this.account)
            console.log(this.accountID)
            console.log(this.accountName)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      addToBalance: function () {
        TournamentService.addBalance(this.accountID, this.addition)
          .then(response => {
            this.loadAccount()
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      removeFromBalance: function () {
        TournamentService.removeBalance(this.accountID, this.subtraction)
          .then(response => {
            this.loadAccount()
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      removeAccount: function () {
        this.$swal({
          title: 'Are you totally sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK Delete it',
          cancelButtonText: 'Cancel',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result: ' + result);
          if (result === true) {
            TournamentService.deleteAccount(this.accountID)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data
                console.log(this.message)
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this Account ' + JSON.stringify(response.data, null, 5), 'success')
                this.$router.push('../#')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error)
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'Your fight continues!', 'info')
          }
        })
      }
      }
    }

</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
