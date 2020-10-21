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

m1 = Meditation.create(date: DateTime.now.strftime('%D'), name: 'Forest', user_id: u1.id)
m2 = Meditation.create(date: DateTime.now.strftime('%D'), name: 'Sunrise in the mountatins', user_id: u2.id)
m3 = Meditation.create(date: DateTime.now.strftime('%D'), name: 'City on Pause', user_id: u1.id)

n1 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m1.id, description: "thought about candy")
n2 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m1.id, description: "break break")
n3 = Note.create(date: DateTime.now.strftime('%D'), meditation_id: m2.id, description: "i am hungry")

quotes_array = ["The secret of getting ahead is getting started.", "The best time to plant a tree was 20 years ago. The second best time is now.", "If people are doubting how far you can go, go so far that you can’t hear them anymore.", 'Your limitation—it’s only your imagination.',  'Push yourself, because no one else is going to do it for you.', 'Sometimes later becomes never. Do it now.', ' Great things never come from comfort zones.', 'Dream it. Wish it. Do it.', 'Success doesn’t just find you. You have to go out and get it.', 'The harder you work for something, the greater you’ll feel when you achieve it.', 'Dream bigger. Do bigger.', 'Don’t stop when you’re tired. Stop when you’re done.', 'Wake up with determination. Go to bed with satisfaction.', 'Do something today that your future self will thank you for.', 'Little things make big days.', 'It’s going to be hard, but hard does not mean impossible.', ' Don’t wait for opportunity. Create it.', 'Sometimes we’re tested not to show our weaknesses, but to discover our strengths.', 'The key to success is to focus on goals, not obstacles.', 'Dream it. Believe it. Build it.']
  
q1 =Quote.create(quote: quotes_array.sample(), user_id: u1.id)
q2 =Quote.create(quote: quotes_array.sample(), user_id: u1.id)
q3 = Quote.create(quote: quotes_array.sample(), user_id: u2.id)


