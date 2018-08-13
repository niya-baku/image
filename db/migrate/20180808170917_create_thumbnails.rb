class CreateThumbnails < ActiveRecord::Migration[5.2]
  def change
    create_table :thumbnails do |t|
      t.string :image
      t.references :prototype, foreign_key: true

      t.timestamps
    end
  end
end
