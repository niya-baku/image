class AddBackgroundToThumbnail < ActiveRecord::Migration[5.2]
  def change
    add_column :thumbnails, :background, :boolean
  end
end
