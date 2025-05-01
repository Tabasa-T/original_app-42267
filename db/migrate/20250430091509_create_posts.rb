class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.integer :duration, null: false
      t.text :result, null: false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
