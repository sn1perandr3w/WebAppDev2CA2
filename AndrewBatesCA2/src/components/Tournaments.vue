<template>
  <div id="app1">
    <b-card bg-variant="dark">
    <v-client-table :columns="columns" :data="tournaments" :options="options">
      <a slot="show interest" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="interest(props.row._id)"></a>
      <a slot="show uninterest" slot-scope="props" class="fa fa-thumbs-down fa-2x" @click="uninterest(props.row._id)"></a>
      <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteTournament(props.row._id)"></a>
      <a slot="showParticipants" slot-scope="props" class="fa fa-edit fa-2x" @click="showParticipants(props.row._id)"></a>
    </v-client-table>
    </b-card>
  </div>
</template>

<script>
  import TournamentService from '@/services/tournamentservice'

  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})
  export default {
    name: 'Tournaments',
    data () {
      return {

        messagetitle: ' Tournaments List ',
        tournaments: [],
        props: ['_id'],
        errors: [],
        columns: ['game', 'organizer', 'date', 'time', 'prize','playerCount' ,'interested', 'show interest','show uninterest', 'remove','showParticipants'],
        sortable: ['interest'],
        options: {
          perPage: 10,
          filterable: ['game','organizer', 'interested', 'date', 'time','prize','playerCount','interested'],
          sortable: ['game','organizer','date','time','prize','playerCount','interested'],
          headings: {
            _id: 'ID',
            game: 'Game',
            organizer: 'Organizer',
            time: 'Time'
          }
        }
      }


    },
    // Fetches Tournaments when the component is created.
    created () {
      this.loadTournaments()
    },
    methods: {
      loadTournaments: function () {
        TournamentService.fetchTournaments()
          .then(response => {
            // JSON responses are automatically parsed.
            this.tournaments = response.data
            console.log(this.tournaments)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      // Increments Interest
      interest: function (id) {
        TournamentService.incrementTournamentInterest(id)
          .then(response => {
            this.loadTournaments()
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      uninterest: function (id) {
        TournamentService.decrementTournamentInterest(id)
          .then(response => {
            this.loadTournaments()
            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },

      showParticipants: function (id) {
        this.$router.params = id
        this.$router.push('Participants')
      },

      deleteTournament: function (id) {
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
            TournamentService.deleteTournament(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data
                console.log(this.message)
                this.loadTournaments()
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this Tournament ' + JSON.stringify(response.data, null, 5), 'success')
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
      }
    }
  }
</script>

<style scoped>
  #app1 {
    width: 70%;
    margin: 0 auto;
  }

  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
