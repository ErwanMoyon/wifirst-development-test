class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.string :city
      t.integer :user_id, index: true
      t.timestamps
    end
  end
end
