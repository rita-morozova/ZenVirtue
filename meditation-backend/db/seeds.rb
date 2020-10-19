# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Note.delete_all
Meditation.delete_all
User.delete_all


u1 = User.create(name: 'Dave', email: 'dave@gmail.com')
m1 = Meditation.create(name: 'Break', user_id: u1.id)
n1 = Note.create(date: DateTime.now(), meditation_id: m1.id, description: "thought about candy")
