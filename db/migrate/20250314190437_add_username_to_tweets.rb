class AddUsernameToTweets < ActiveRecord::Migration[6.1]
  def change
    add_column :tweets, :username, :string
  end
end
