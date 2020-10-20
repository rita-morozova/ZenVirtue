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
u2 = User.create(name: 'Rita', email: 'rita@gmail.com')
u3 = User.create(name: 'Jasper', email: 'jasper@gmail.com')

m1 = Meditation.create(name: 'Break', user_id: u1.id)
m2 = Meditation.create(name: 'Luch Meditation', user_id: u2.id)
m3 = Meditation.create(name: 'Forest', user_id: u1.id)

n1 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m1.id, description: "thought about candy")
n2 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m1.id, description: "break break")
n3 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m2.id, description: "i am hungry")
