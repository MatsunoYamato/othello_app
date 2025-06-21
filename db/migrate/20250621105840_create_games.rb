class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.string :mode
      t.string :result
      t.datetime :played_at

      t.timestamps
    end
  end
end
