# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.first || User.create!(username: "testuser", email: "test@example.com", password: "password")

Tweet.create!(
  message: "Hello, this is a seeded tweet!",
  user_id: user.id 
)