<template>
  <div id="app1">
    <b-card bg-variant="dark">
    <v-client-table :columns="columns" :data="accounts" :options="options">
      <a slot="endorse" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="endorse(props.row._id)"></a>
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
    name: 'Accounts',
    data () {
      return {
        messagetitle: 'Account List ',
        accounts: [],
        props: ['_id'],
        errors: [],
        columns: ['name','username','nationality','email','team','endorsement','endorse'],
        options: {
          perPage: 10,
          filterable: ['name','username','nationality','email','team','endorsement'],
          sortable: ['name','username','nationality','email','team','endorsement'],
          headings: {
            _id: 'ID',
            game: 'Game',
            organizer: 'Organizer',
            time: 'Time'
          }
        }
      }

    },
    // Fetches Accounts when the component is created.
    created () {
      this.loadAccounts()
    },
    methods: {
      loadAccounts: function () {
        TournamentService.fetchAccounts()
          .then(response => {
            // JSON responses are automatically parsed.
            this.accounts = response.data
            console.log(this.accounts)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      // Increments Interest
      endorse: function (id) {
        TournamentService.endorseAccount(id)
          .then(response => {
            this.loadAccounts()
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
