class AddDataToThumbnails < ActiveRecord::Migration[5.2]
  def change
    add_column :thumbnails, :data, :string
  end
end
