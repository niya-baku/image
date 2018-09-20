class RemovedatavalueFromThumbnail < ActiveRecord::Migration[5.2]
  def change
    remove_column :thumbnails, :datavalue, :integer
  end
end
