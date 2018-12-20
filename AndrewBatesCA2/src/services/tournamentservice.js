import Api from '@/services/api'

export default {


  //TOURNAMENTS

  //Add Tournament
  postTournament (tournament) {
    return Api().post(`/tournaments`, tournament,
      { headers: {'Content-type': 'application/json'} })
  },

  //Delete Tournament
  deleteTournament (id) {
    return Api().delete(`/tournaments/${id}`)
  },

  //Increment Interest
  incrementTournamentInterest (id) {
    return Api().put(`/tournaments/${id}/interest`)
  },

  //Decrement Interest
  decrementTournamentInterest (id) {
    return Api().put(`/tournaments/${id}/uninterest`)
  },

  //Add Participant to tournament
  postTournamentParticipant (id, participant) {
    return Api().post(`/tournaments/${id}/participants`, participant,
      { headers: {'Content-type': 'application/json'} })
  },

  //Remove Participant from tournament
  deleteTournamentParticipant (id, pid) {
    return Api().delete(`/tournaments/${id}/participants/${pid}`)
  },

//Find All Tournaments
  fetchTournaments () {
    return Api().get(`/tournaments`)
  },

  fetchTournamentParticipants (id) {
    return Api().get(`/tournaments/${id}/participants`)
  },

  //THESE TWO CALLS ARE UNUSED AS OF THE SUBMITTED VERSION

  //Find One Tournament
  fetchTournament (id) {
    return Api().get(`/tournaments/${id}`)
  },

  fetchTournamentInterest (id) {
    return Api().put(`/tournaments/${id}/interest`)
  },






  //ACCOUNTS

  //Add Account
  postAccount (account) {
    return Api().post(`/accounts`, account,
      { headers: {'Content-type': 'application/json'} })
  },

  //Find One Account
  fetchAccount (username) {
    return Api().get(`/accounts/${username}`)
  },

  fetchAccounts () {
    return Api().get(`/accounts`)
  },

  //Delete Account
  deleteAccount (id) {
    return Api().delete(`/accounts/${id}`)
  },

  //Increment Endorsement
  endorseAccount (id) {
    return Api().put(`/accounts/${id}/endorsement`)
  },

  //Increment Endorsement

  addBalance (id, addition) {
    return Api().put(`/accounts/${id}/balance/${addition}`)
  },

  removeBalance (id, subtraction) {
    return Api().put(`/accounts/${id}/rmbalance/${subtraction}`)
  }
}
