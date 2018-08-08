class AddPrototypeRefToThumbnail < ActiveRecord::Migration[5.2]
  def change
    add_column :thumbnails, :prototype, :string
    add_column :thumbnails, :references, :string
  end
end
