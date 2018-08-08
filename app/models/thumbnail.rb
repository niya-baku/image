class Thumbnail < ApplicationRecord
  belongs_to :prototype
  mount_uploader :image, ThumbnailUploader
end
