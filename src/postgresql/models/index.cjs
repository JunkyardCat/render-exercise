const Note = require('./note.cjs')
const User = require('./user.cjs')
const Team = require('./team.cjs')
const Membership = require('./membership.cjs')
const UserNotes = require('./usernote.cjs')

User.hasMany(Note)
Note.belongsTo(User)

User.belongsToMany(Team,{through:Membership})
Team.belongsToMany(User,{through:Membership})

User.belongsToMany(Note,{through:UserNotes,as:'marked_notes'})
Note.belongsToMany(User,{through:UserNotes,as:'users_marked'})

module.exports = {
  Note,
  User,
  Team,
  Membership,
  UserNotes,
}
