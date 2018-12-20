<template>
  <div id="app1">
    <b-card bg-variant="dark">
    <v-client-table :columns="columns" :data="participants" :options="options">
      <a slot="removeParticipant" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteParticipant(props.row._id)"></a>
    </v-client-table>
    </b-card>


    <b-btn v-b-toggle.collapse1 variant="primary">Add A Player</b-btn>
    <b-collapse id="collapse1" class="mt-2">
      <b-card bg-variant="dark">
          <form @submit.prevent="addParticipant">


            <div class="form-group">
              <label class="form-control-label" name="name">Name</label>
              <input class="form__input" type="string" v-model.trim="name"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="username">Username</label>
              <input class="form__input" type="string" v-model.trim="username"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="nationality">Nationality</label>
              <input class="form__input" type="string" v-model.trim="nationality"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="team">Team</label>
              <input class="form__input" type="string" v-model.trim="team"/>
            </div>



            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Enter Tournament!</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Player Added!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
          </form>
      </b-card>
    </b-collapse>
  </div>

</template>

<script>
  import TournamentService from '@/services/tournamentservice'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'


  export default {
    data () {
      return {
        tournamentID: null,
        participants:[],
        columns: ['name','username','nationality','team','removeParticipant'],
        temp:{},
        messagetitle: 'Displaying Players ',
        options: {
          headings: {
            _id: 'ID',
            perPage: 10,
            filterable: ['game','organizer']
          }
        },

        name:'',
        username:'',
        nationality:'',
        team:''

      }
    },
    created () {
      this.loadParticipants()
    },
    methods: {
      loadParticipants: function () {
        TournamentService.fetchTournamentParticipants(this.$router.params)
          .then(response => {
            // JSON responses are automatically parsed.
            this.participants = response.data
            this.tournamentID = this.$router.params
            console.log(this.participants)
            console.log(this.tournamentID)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      deleteParticipant: function (pid) {
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
            TournamentService.deleteTournamentParticipant(this.tournamentID,pid)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data
                console.log(this.message)
                this.loadParticipants()
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this Participant ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error)
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'The fight goes on!', 'info')
          }
        })
      },
      addParticipant: function () {
        console.log('submitParticipant!')
        console.log('Submitting in addParticipant : ' + this.tournamentID)

        var participant = {

          name:this.name,
            username: this.username,
          nationality: this.nationality,
          team: this.team

        }

        TournamentService.postTournamentParticipant(this.tournamentID, participant)
          .then(response => {
            // JSON responses are automatically parsed.
            console.log(response)
            this.loadParticipants()
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
